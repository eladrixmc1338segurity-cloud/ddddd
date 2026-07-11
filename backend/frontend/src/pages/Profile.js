import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import '../styles/profile.css';

const Profile = () => {
  const { user, updateUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    avatar: user?.avatar || '',
    currentPassword: '',
    newPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const payload = {
      username: formData.username,
      avatar: formData.avatar
    };

    if (formData.newPassword) {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
    }

    try {
      const res = await updateProfile(payload);
      updateUserData(res.data.user);
      setMessage('Perfil actualizado correctamente');
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container fade-in">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={formData.avatar || 'https://via.placeholder.com/150?text=Avatar'}
            alt={user?.username}
            className="profile-avatar"
          />
          <div>
            <h2>{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
            {user?.role === 'admin' && <span className="profile-role">ADMIN</span>}
          </div>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>

          <div className="form-group">
            <label>URL del avatar</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <hr className="profile-divider" />
          <p className="profile-section-label">Cambiar contraseña (opcional)</p>

          <div className="form-group">
            <label>Contraseña actual</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
