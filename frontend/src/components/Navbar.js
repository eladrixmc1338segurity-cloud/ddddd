import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>⚡ Setups Platform</h1>
        </div>
        <div className="navbar-links">
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
      <div className="navbar-brand">
        <h1>⚡ Setups Platform</h1>
      </div>
      <div className="navbar-content">
        <div className="navbar-user">
          <img src={user.avatar} alt={user.username} className="user-avatar" />
          <span>{user.username}</span>
          {user.role === 'admin' && <span className="admin-badge">ADMIN</span>}
        </div>
        <div className="navbar-links">
          {user.role === 'admin' && (
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
