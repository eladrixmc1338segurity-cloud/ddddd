import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllMaps, getReviews, createReview } from '../services/api';
import '../styles/dashboard.css';

const CHANNELS = [
  {
    id: 'configuraciones',
    name: 'Configuraciones',
    icon: '⚙️',
    description: 'Configuraciones del servidor y sistema',
    color: '#0055CC'
  },
  {
    id: 'setups',
    name: 'Setups',
    icon: '🎮',
    description: 'Configuraciones de gameplay y mecánicas',
    color: '#2E5090'
  },
  {
    id: 'mapas',
    name: 'Mapas',
    icon: '🗺️',
    description: 'Descargar e instalar mapas personalizados',
    color: '#005AB5'
  },
  {
    id: 'schematics',
    name: 'Schematics',
    icon: '📐',
    description: 'Esquemas y plantillas',
    color: '#003399'
  },
  {
    id: 'otros',
    name: 'Otros',
    icon: '📦',
    description: 'Otros recursos y utilidades',
    color: '#1a73e8'
  }
];

const Dashboard = () => {
  const [selectedChannel, setSelectedChannel] = useState('mapas');
  const { user } = useContext(AuthContext);
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReviewMap, setSelectedReviewMap] = useState(null);
  const [reviewsByMap, setReviewsByMap] = useState({});
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewStatus, setReviewStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => {
    fetchMaps(selectedChannel);
  }, [selectedChannel]);

  const fetchMaps = async (channelId) => {
    setLoading(true);
    try {
      const channel = CHANNELS.find(c => c.id === channelId);
      const category = channel ? channel.name : undefined;
      const response = await getAllMaps(category);
      setMaps(response.data.maps || []);
    } catch (error) {
      console.error('Error fetching maps:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseImages = (map) => {
    if (!map?.images) return [];
    if (Array.isArray(map.images)) return map.images;

    try {
      return JSON.parse(map.images || '[]');
    } catch {
      return [];
    }
  };

  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
  };

  const fetchReviewsForMap = async (mapId) => {
    try {
      const response = await getReviews(mapId);
      setReviewsByMap(prev => ({ ...prev, [mapId]: response.data.reviews || [] }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleToggleReviews = async (mapId) => {
    if (selectedReviewMap === mapId) {
      setSelectedReviewMap(null);
      return;
    }
    if (!reviewsByMap[mapId]) {
      await fetchReviewsForMap(mapId);
    }
    setSelectedReviewMap(mapId);
  };

  const handleSubmitReview = async (mapId) => {
    if (!mapId) {
      setReviewStatus({ loading: false, error: 'No se encontró el mapa para enviar la reseña.', success: '' });
      return;
    }
    if (!user) {
      setReviewStatus({ loading: false, error: 'Debes iniciar sesión para dejar una reseña.', success: '' });
      return;
    }
    if (!reviewForm.comment || reviewForm.comment.trim().length < 5) {
      setReviewStatus({ loading: false, error: 'El comentario debe tener al menos 5 caracteres.', success: '' });
      return;
    }

    setReviewStatus({ loading: true, error: '', success: '' });
    try {
      await createReview(mapId, reviewForm);
      setReviewForm({ rating: 5, comment: '' });
      await fetchReviewsForMap(mapId);
      setReviewStatus({ loading: false, error: '', success: 'Reseña enviada correctamente.' });
    } catch (error) {
      setReviewStatus({
        loading: false,
        error: error.response?.data?.message || 'No se pudo enviar la reseña.',
        success: ''
      });
      console.error('Review submission failed:', error.response?.data || error.message || error);
    }
  };

  const selectedChannelData = CHANNELS.find(ch => ch.id === selectedChannel);

  return (
    <div className="dashboard fade-in">
      <div className="channels-sidebar">
        <h3>Canales</h3>
        <div className="channels-list">
          {CHANNELS.map(channel => (
            <button
              key={channel.id}
              className={`channel-btn ${selectedChannel === channel.id ? 'active' : ''}`}
              onClick={() => handleChannelClick(channel.id)}
              style={{
                borderColor: channel.color,
                backgroundColor: selectedChannel === channel.id ? channel.color : 'transparent'
              }}
            >
              <span className="channel-icon">{channel.icon}</span>
              <span className="channel-name">{channel.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-main">
        <div className="channel-header">
          <h2>{selectedChannelData?.icon} {selectedChannelData?.name}</h2>
          <p>{selectedChannelData?.description}</p>
        </div>

        <div className="maps-grid">
          {loading ? (
            <div className="loading">Cargando contenido...</div>
          ) : maps.length > 0 ? (
            maps.map(map => {
              const images = parseImages(map);
              const coverImage = map.thumbnail || images[0] || '';
              return (
                <div key={map.id} className="map-card float">
                  {coverImage && (
                    <div className="map-card-image">
                      <img src={coverImage} alt={map.name} />
                      <div className="map-card-overlay">
                        <span className="map-badge">{map.category}</span>
                        <span className="map-image-count">{images.length || 0} fotos</span>
                      </div>
                    </div>
                  )}

                  <div className="map-card-body">
                    <div className="map-card-top">
                      <h3>{map.name}</h3>
                      <span className="map-date">{map.createdAt ? new Date(map.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                    <p className="map-description">{map.description}</p>

                    <div className="map-card-meta">
                      <span className="uploader">Por {map.uploaderName || 'Admin'}</span>
                      <button className="btn-secondary" onClick={() => handleToggleReviews(map.id)}>
                        {selectedReviewMap === map.id ? 'Ocultar reseñas' : 'Ver reseñas'}
                      </button>
                    </div>

                    {selectedReviewMap === map.id && (
                      <div className="reviews-panel">
                        <div className="reviews-summary">
                          <strong>Reseñas</strong>
                          <span>{(reviewsByMap[map.id]?.length || 0)} comentarios</span>
                        </div>

                        {reviewsByMap[map.id]?.length > 0 ? (
                          reviewsByMap[map.id].map(review => (
                            <div className="review-item" key={review.id}>
                              <div className="review-header">
                                <span>{review.username}</span>
                                <span>{'⭐'.repeat(review.rating)}</span>
                              </div>
                              <p>{review.comment}</p>
                            </div>
                          ))
                        ) : (
                          <p className="review-empty">Aún no hay reseñas para este mapa.</p>
                        )}

                        <div className="review-form">
                          <h4>Dejar reseña</h4>
                          <div className="review-input-row">
                            <label>Calificación</label>
                            <select
                              value={reviewForm.rating}
                              onChange={(e) => setReviewForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                            >
                              {[5, 4, 3, 2, 1].map(value => (
                                <option key={value} value={value}>{value} estrellas</option>
                              ))}
                            </select>
                          </div>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                            placeholder="Escribe tu opinión"
                            rows={3}
                          />
                          {reviewStatus.error && <p className="review-error">{reviewStatus.error}</p>}
                          {reviewStatus.success && <p className="review-success">{reviewStatus.success}</p>}
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => handleSubmitReview(map.id)}
                            disabled={reviewStatus.loading}
                          >
                            {reviewStatus.loading ? 'Enviando...' : 'Enviar reseña'}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="map-card-actions">
                      <a href={map.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Descargar
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <p>No hay contenido disponible en este canal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
