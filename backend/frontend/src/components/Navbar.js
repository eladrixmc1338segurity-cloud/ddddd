import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.username || 'U'
    )}&background=4f46e5&color=fff`;

  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1>⚡ Setups Platform</h1>
        </div>
        <div className="navbar-links">
          <button onClick={() => navigate('/admin')} className="btn-nav-admin">
            Panel Admin
          </button>
          <button onClick={() => navigate('/login')} className="btn-nav-login">
            Iniciar Sesión
          </button>
          <button onClick={() => navigate('/register')} className="btn-nav-register">
            Registrarse
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <h1>⚡ Setups Platform</h1>
      </div>
      <div className="navbar-content">
        <div
          className="navbar-user"
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
          title="Editar mi perfil"
        >
          <img
            src={avatarUrl}
            alt={user.username}
            className="user-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.username || 'U'
              )}&background=4f46e5&color=fff`;
            }}
          />
          <span>{user.username}</span>
          {(user.role === 'admin' || user.role === 'owner') && (
            <span className="admin-badge">{user.role === 'owner' ? 'OWNER' : 'ADMIN'}</span>
          )}
        </div>
        <div className="navbar-links">
          <button onClick={() => navigate('/')} className="btn-nav-login">
            Inicio
          </button>
          <button onClick={() => navigate('/profile')} className="btn-nav-register">
            Mi Perfil
          </button>
          {(user.role === 'admin' || user.role === 'owner') && (
            <button onClick={() => navigate('/admin')} className="btn-nav-admin">
              Panel Admin
            </button>
          )}
          <button onClick={handleLogout} className="btn-nav-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
