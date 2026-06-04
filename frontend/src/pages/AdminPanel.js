import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllUsers, getAllMaps, updateUserRole, deactivateUser, deleteMap } from '../services/api';
import '../styles/admin.css';

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

  useEffect(() => {
    if (activeTab === 'maps') {
      fetchMaps();
    } else if (activeTab === 'users') {
      fetchUsers();
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

  const handleDeleteMap = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mapa?')) {
      try {
        await deleteMap(id);
        setMaps(maps.filter(m => m._id !== id));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      await updateUserRole(userId, 'admin');
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeactivateUser = async (userId) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await deactivateUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error:', error);
      }
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
        <p>Gestiona mapas, usuarios y permisos del sistema</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'maps' ? 'active' : ''}`}
          onClick={() => setActiveTab('maps')}
        >
          📦 Gestionar Mapas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Gestionar Usuarios
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'maps' && (
          <div className="maps-management">
            <h2>Gestión de Mapas</h2>
            
            <div className="upload-section">
              <h3>Subir Nuevo Mapa</h3>
              <form className="upload-form">
                <input 
                  type="text" 
                  placeholder="Nombre del mapa" 
                  value={newMap.name}
                  onChange={(e) => setNewMap({...newMap, name: e.target.value})}
                />
                <textarea 
                  placeholder="Descripción" 
                  value={newMap.description}
                  onChange={(e) => setNewMap({...newMap, description: e.target.value})}
                />
                <select 
                  value={newMap.category}
                  onChange={(e) => setNewMap({...newMap, category: e.target.value})}
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
                  onChange={(e) => setNewMap({...newMap, fileUrl: e.target.value})}
                />
                <button type="button" className="btn-upload">Subir Mapa</button>
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
                      <tr key={map._id}>
                        <td><strong>{map.name}</strong></td>
                        <td>{map.category}</td>
                        <td>{map.uploader?.username}</td>
                        <td>{map.downloadCount}</td>
                        <td>
                          <button 
                            className="btn-action-delete"
                            onClick={() => handleDeleteMap(map._id)}
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
                    <tr key={u._id}>
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
                        {u.role !== 'admin' && (
                          <button 
                            className="btn-action-promote"
                            onClick={() => handlePromoteUser(u._id)}
                          >
                            Promover
                          </button>
                        )}
                        <button 
                          className="btn-action-deactivate"
                          onClick={() => handleDeactivateUser(u._id)}
                        >
                          {u.isActive ? 'Desactivar' : 'Activar'}
                        </button>
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
      </div>
    </div>
  );
};

export default AdminPanel;
