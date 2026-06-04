import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getAllUsers,
  getAllMaps,
  updateUserRole,
  deactivateUser,
  activateUser,
  getUserPermissions,
  updateUserPermissions,
  deleteMap,
  createMap,
  getMonetization,
  updateMonetization
} from '../services/api';
import '../styles/admin.css';

const PERMISSION_LABELS = {
  canUploadMaps: 'Subir recursos',
  canDeleteMaps: 'Eliminar recursos',
  canEditUsers: 'Editar usuarios',
  canManageChannels: 'Gestionar canales'
};

const emptyPermissions = {
  canUploadMaps: false,
  canDeleteMaps: false,
  canEditUsers: false,
  canManageChannels: false
};

const emptyMonetization = {
  paypalUrl: '',
  kofiUrl: '',
  patreonUrl: '',
  discordUrl: '',
  customLinks: [],
  bannerEnabled: false,
  bannerText: '',
  bannerLink: '',
  bannerImage: ''
};

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('maps');
  const [maps, setMaps] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMap, setNewMap] = useState({
    name: '',
    description: '',
    category: 'Mapas',
    fileUrl: '',
    fileName: ''
  });

  const [monetization, setMonetization] = useState(emptyMonetization);
  const [monetizationMsg, setMonetizationMsg] = useState('');
  const [savingMonetization, setSavingMonetization] = useState(false);

  const [permsUserId, setPermsUserId] = useState(null);
  const [permsData, setPermsData] = useState(emptyPermissions);
  const [permsMsg, setPermsMsg] = useState('');
  const [savingPerms, setSavingPerms] = useState(false);
  const latestPermsRequest = useRef(null);

  useEffect(() => {
    if (activeTab === 'maps') {
      fetchMaps();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'monetization') {
      fetchMonetization();
    }
  }, [activeTab]);

  const fetchMaps = async () => {
    setLoading(true);
    try {
      const response = await getAllMaps();
      setMaps(response.data.maps || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonetization = async () => {
    setLoading(true);
    try {
      const response = await getMonetization();
      setMonetization({ ...emptyMonetization, ...response.data.monetization });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMap = async (e) => {
    e.preventDefault();
    if (!newMap.name || !newMap.description || !newMap.fileUrl) {
      alert('Completa nombre, descripción y URL del archivo');
      return;
    }
    try {
      await createMap(newMap);
      setNewMap({ name: '', description: '', category: 'Mapas', fileUrl: '', fileName: '' });
      fetchMaps();
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Error al crear el mapa');
    }
  };

  const handleDeleteMap = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mapa?')) {
      try {
        await deleteMap(id);
        setMaps(maps.filter(m => m.id !== id));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChangeRole = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al cambiar el rol');
    }
  };

  const handleToggleActive = async (u) => {
    try {
      if (u.isActive) {
        await deactivateUser(u.id);
      } else {
        await activateUser(u.id);
      }
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al cambiar el estado');
    }
  };

  const openPermissions = async (userId) => {
    if (permsUserId === userId) {
      setPermsUserId(null);
      latestPermsRequest.current = null;
      return;
    }
    setPermsMsg('');
    setPermsUserId(userId);
    setPermsData(emptyPermissions);
    latestPermsRequest.current = userId;
    try {
      const response = await getUserPermissions(userId);
      // Ignorar respuestas obsoletas si el admin abrió otro usuario mientras tanto
      if (latestPermsRequest.current !== userId) return;
      setPermsData({ ...emptyPermissions, ...response.data.permissions });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePermChange = (field) => {
    setPermsData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSavePermissions = async () => {
    setSavingPerms(true);
    setPermsMsg('');
    try {
      await updateUserPermissions(permsUserId, permsData);
      setPermsMsg('✅ Permisos guardados');
    } catch (error) {
      setPermsMsg('❌ ' + (error.response?.data?.message || 'Error al guardar'));
    } finally {
      setSavingPerms(false);
    }
  };

  const handleMonetizationChange = (field, value) => {
    setMonetization(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomLinkChange = (index, key, value) => {
    setMonetization(prev => {
      const customLinks = [...(prev.customLinks || [])];
      customLinks[index] = { ...customLinks[index], [key]: value };
      return { ...prev, customLinks };
    });
  };

  const addCustomLink = () => {
    setMonetization(prev => ({
      ...prev,
      customLinks: [...(prev.customLinks || []), { label: '', url: '' }]
    }));
  };

  const removeCustomLink = (index) => {
    setMonetization(prev => ({
      ...prev,
      customLinks: (prev.customLinks || []).filter((_, i) => i !== index)
    }));
  };

  const handleSaveMonetization = async (e) => {
    e.preventDefault();
    setSavingMonetization(true);
    setMonetizationMsg('');
    try {
      await updateMonetization(monetization);
      setMonetizationMsg('✅ Configuración guardada correctamente');
    } catch (error) {
      setMonetizationMsg('❌ ' + (error.response?.data?.message || 'Error al guardar'));
    } finally {
      setSavingMonetization(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="admin-access-denied">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder al panel de administrador</p>
      </div>
    );
  }

  return (
    <div className="admin-panel fade-in">
      <div className="admin-header">
        <h1>🔐 Panel de Administrador</h1>
        <p>Gestiona mapas, usuarios, monetización y permisos del sistema</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'maps' ? 'active' : ''}`}
          onClick={() => setActiveTab('maps')}
        >
          📦 Gestión
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Gestionar Usuarios
        </button>
        <button
          className={`tab-btn ${activeTab === 'monetization' ? 'active' : ''}`}
          onClick={() => setActiveTab('monetization')}
        >
          💰 Monetización
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'maps' && (
          <div className="maps-management">
            <h2>Gestión de Mapas</h2>

            <div className="upload-section">
              <h3>Subir Nuevo Mapa</h3>
              <form className="upload-form" onSubmit={handleCreateMap}>
                <input
                  type="text"
                  placeholder="Nombre del mapa"
                  value={newMap.name}
                  onChange={(e) => setNewMap({ ...newMap, name: e.target.value })}
                />
                <textarea
                  placeholder="Descripción"
                  value={newMap.description}
                  onChange={(e) => setNewMap({ ...newMap, description: e.target.value })}
                />
                <select
                  value={newMap.category}
                  onChange={(e) => setNewMap({ ...newMap, category: e.target.value })}
                >
                  <option>Configuraciones</option>
                  <option>Setups</option>
                  <option>Mapas</option>
                  <option>Schematics</option>
                  <option>Otros</option>
                </select>
                <input
                  type="text"
                  placeholder="URL del archivo"
                  value={newMap.fileUrl}
                  onChange={(e) => setNewMap({ ...newMap, fileUrl: e.target.value })}
                />
                <button type="submit" className="btn-upload">Subir Mapa</button>
              </form>
            </div>

            <div className="maps-list">
              <h3>Mapas Actuales ({maps.length})</h3>
              {loading ? (
                <p>Cargando...</p>
              ) : maps.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Uploader</th>
                      <th>Descargas</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maps.map(map => (
                      <tr key={map.id}>
                        <td><strong>{map.name}</strong></td>
                        <td>{map.category}</td>
                        <td>{map.uploaderName || 'N/A'}</td>
                        <td>{map.downloadCount}</td>
                        <td>
                          <button
                            className="btn-action-delete"
                            onClick={() => handleDeleteMap(map.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay mapas</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-management">
            <h2>Gestión de Usuarios</h2>

            {loading ? (
              <p>Cargando...</p>
            ) : users.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Último Login</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.username}</strong></td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${u.isActive ? 'active' : 'inactive'}`}>
                          {u.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <div className="user-actions">
                          {u.role === 'admin' ? (
                            u.id !== user.id && (
                              <button
                                className="btn-action-demote"
                                onClick={() => handleChangeRole(u.id, 'user')}
                              >
                                Quitar admin
                              </button>
                            )
                          ) : (
                            <button
                              className="btn-action-promote"
                              onClick={() => handleChangeRole(u.id, 'admin')}
                            >
                              Promover a admin
                            </button>
                          )}
                          {u.id !== user.id && (
                            <button
                              className={u.isActive ? 'btn-action-deactivate' : 'btn-action-activate'}
                              onClick={() => handleToggleActive(u)}
                            >
                              {u.isActive ? 'Desactivar' : 'Activar'}
                            </button>
                          )}
                          <button
                            className="btn-action-perms"
                            onClick={() => openPermissions(u.id)}
                          >
                            {permsUserId === u.id ? 'Cerrar permisos' : 'Permisos'}
                          </button>
                        </div>

                        {permsUserId === u.id && (
                          <div className="perms-panel">
                            <h4>Permisos de {u.username}</h4>
                            <div className="perms-grid">
                              {Object.keys(PERMISSION_LABELS).map(field => (
                                <label key={field} className="checkbox-label">
                                  <input
                                    type="checkbox"
                                    checked={!!permsData[field]}
                                    onChange={() => handlePermChange(field)}
                                  />
                                  {PERMISSION_LABELS[field]}
                                </label>
                              ))}
                            </div>
                            {permsMsg && <div className="perms-msg">{permsMsg}</div>}
                            <button
                              className="btn-upload"
                              onClick={handleSavePermissions}
                              disabled={savingPerms}
                            >
                              {savingPerms ? 'Guardando...' : 'Guardar permisos'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay usuarios</p>
            )}
          </div>
        )}

        {activeTab === 'monetization' && (
          <div className="monetization-management">
            <h2>Monetización</h2>
            <p className="monetization-intro">
              Configura los enlaces de donación/compra y el banner promocional que se mostrarán
              en la página de inicio.
            </p>

            {monetizationMsg && <div className="monetization-msg">{monetizationMsg}</div>}

            <form className="monetization-form" onSubmit={handleSaveMonetization}>
              <fieldset className="monetization-fieldset">
                <legend>Enlaces de donación / compra</legend>

                <label>PayPal</label>
                <input
                  type="text"
                  placeholder="https://paypal.me/tuusuario"
                  value={monetization.paypalUrl}
                  onChange={(e) => handleMonetizationChange('paypalUrl', e.target.value)}
                />

                <label>Ko-fi</label>
                <input
                  type="text"
                  placeholder="https://ko-fi.com/tuusuario"
                  value={monetization.kofiUrl}
                  onChange={(e) => handleMonetizationChange('kofiUrl', e.target.value)}
                />

                <label>Patreon</label>
                <input
                  type="text"
                  placeholder="https://patreon.com/tuusuario"
                  value={monetization.patreonUrl}
                  onChange={(e) => handleMonetizationChange('patreonUrl', e.target.value)}
                />

                <label>Discord</label>
                <input
                  type="text"
                  placeholder="https://discord.gg/tuservidor"
                  value={monetization.discordUrl}
                  onChange={(e) => handleMonetizationChange('discordUrl', e.target.value)}
                />
              </fieldset>

              <fieldset className="monetization-fieldset">
                <legend>Enlaces personalizados</legend>
                {(monetization.customLinks || []).map((link, index) => (
                  <div key={index} className="custom-link-row">
                    <input
                      type="text"
                      placeholder="Texto (ej: 🛒 Tienda)"
                      value={link.label || ''}
                      onChange={(e) => handleCustomLinkChange(index, 'label', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="https://..."
                      value={link.url || ''}
                      onChange={(e) => handleCustomLinkChange(index, 'url', e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-action-delete"
                      onClick={() => removeCustomLink(index)}
                    >
                      Quitar
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-add-link" onClick={addCustomLink}>
                  + Añadir enlace
                </button>
              </fieldset>

              <fieldset className="monetization-fieldset">
                <legend>Banner promocional</legend>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={monetization.bannerEnabled}
                    onChange={(e) => handleMonetizationChange('bannerEnabled', e.target.checked)}
                  />
                  Mostrar banner en la página de inicio
                </label>

                <label>Texto del banner</label>
                <input
                  type="text"
                  placeholder="🔥 ¡Oferta especial! Consigue tu setup premium"
                  value={monetization.bannerText}
                  onChange={(e) => handleMonetizationChange('bannerText', e.target.value)}
                />

                <label>Enlace del banner</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={monetization.bannerLink}
                  onChange={(e) => handleMonetizationChange('bannerLink', e.target.value)}
                />

                <label>Imagen del banner (URL, opcional)</label>
                <input
                  type="text"
                  placeholder="https://.../imagen.png"
                  value={monetization.bannerImage}
                  onChange={(e) => handleMonetizationChange('bannerImage', e.target.value)}
                />
              </fieldset>

              <button type="submit" className="btn-upload" disabled={savingMonetization}>
                {savingMonetization ? 'Guardando...' : 'Guardar configuración'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
