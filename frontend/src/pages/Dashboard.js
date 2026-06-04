import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAllMaps } from '../services/api';
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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState('mapas');
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
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
            maps.map(map => (
              <div key={map.id} className="map-card float">
                <div className="map-card-header">
                  <h3>{map.name}</h3>
                  <span className="map-category">{map.category}</span>
                </div>
                <p className="map-description">{map.description}</p>
                <div className="map-footer">
                  <span className="uploader">Por: {map.uploaderName || 'Admin'}</span>
                  <a href={map.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-download">
                    Descargar
                  </a>
                </div>
              </div>
            ))
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
