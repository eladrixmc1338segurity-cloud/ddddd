import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getStats, getMonetization } from '../services/api';
import '../styles/landing.css';

const PRODUCTS = [
  {
    id: 'setups',
    icon: '🎮',
    name: 'Setups',
    description: 'Setups completos y optimizados para tu gameplay: sensibilidad, teclas, rendimiento y todo listo para competir.'
  },
  {
    id: 'configuraciones',
    icon: '⚙️',
    name: 'Configuraciones',
    description: 'Configuraciones del cliente y del servidor afinadas para sacar el máximo FPS y la mejor experiencia.'
  },
  {
    id: 'plantillas',
    icon: '📐',
    name: 'Plantillas',
    description: 'Plantillas y schematics listos para usar: construcciones, esquemas y recursos para tus proyectos.'
  },
  {
    id: 'mapas',
    icon: '🗺️',
    name: 'Mapas de Minecraft',
    description: 'Mapas de Minecraft personalizados y descargables: parkour, PvP, aventura, minijuegos y mucho más.'
  }
];

const Landing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalMaps: 0, totalDownloads: 0, totalUsers: 0 });
  const [monetization, setMonetization] = useState(null);

  useEffect(() => {
    getStats()
      .then(res => setStats(res.data.stats))
      .catch(() => {});

    getMonetization()
      .then(res => setMonetization(res.data.monetization))
      .catch(() => {});
  }, []);

  const donationLinks = [];
  if (monetization) {
    if (monetization.paypalUrl) donationLinks.push({ label: '💙 PayPal', url: monetization.paypalUrl });
    if (monetization.kofiUrl) donationLinks.push({ label: '☕ Ko-fi', url: monetization.kofiUrl });
    if (monetization.patreonUrl) donationLinks.push({ label: '🅿️ Patreon', url: monetization.patreonUrl });
    if (monetization.discordUrl) donationLinks.push({ label: '💬 Discord', url: monetization.discordUrl });
    (monetization.customLinks || []).forEach(link => {
      if (link && link.url && link.label) donationLinks.push(link);
    });
  }

  return (
    <div className="landing fade-in">
      {/* Banner promocional configurable */}
      {monetization && monetization.bannerEnabled && monetization.bannerText && (
        <a
          className="promo-banner"
          href={monetization.bannerLink || '#'}
          target={monetization.bannerLink ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {monetization.bannerImage && (
            <img src={monetization.bannerImage} alt="Promo" className="promo-banner-img" />
          )}
          <span>{monetization.bannerText}</span>
        </a>
      )}

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">⚡ Setups Platform</h1>
        <p className="hero-subtitle">
          Setups, configuraciones, plantillas y mapas de Minecraft. Todo lo que necesitas
          para llevar tu juego al siguiente nivel, en un solo lugar.
        </p>
        <div className="hero-actions">
          {user ? (
            <>
              <button className="btn-primary" onClick={() => navigate('/dashboard')}>
                Explorar contenido
              </button>
              <button className="btn-secondary" onClick={() => navigate('/profile')}>
                Editar mi perfil
              </button>
            </>
          ) : (
            <>
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Crear cuenta gratis
              </button>
              <button className="btn-secondary" onClick={() => navigate('/login')}>
                Iniciar sesión
              </button>
            </>
          )}
        </div>
      </section>

      {/* Estadísticas */}
      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{stats.totalMaps}</span>
          <span className="stat-label">Recursos disponibles</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalDownloads}</span>
          <span className="stat-label">Descargas totales</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalUsers}</span>
          <span className="stat-label">Usuarios registrados</span>
        </div>
      </section>

      {/* Productos */}
      <section className="products-section">
        <h2 className="section-title">Nuestros productos</h2>
        <p className="section-subtitle">Descubre todo lo que ofrecemos para tu servidor y tu juego</p>
        <div className="products-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-icon">{product.icon}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <button
                className="product-link"
                onClick={() => navigate(user ? '/dashboard' : '/register')}
              >
                Ver más →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Apoya el proyecto (monetización) */}
      {donationLinks.length > 0 && (
        <section className="support-section">
          <h2 className="section-title">Apoya el proyecto</h2>
          <p className="section-subtitle">
            Si te gusta lo que hacemos, puedes apoyarnos o conseguir contenido a través de estos enlaces
          </p>
          <div className="support-links">
            {donationLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="support-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Setups Platform. Hecho para la comunidad de Minecraft.</p>
      </footer>
    </div>
  );
};

export default Landing;
