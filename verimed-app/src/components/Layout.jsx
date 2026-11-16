import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">VeriMed</div>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/pacientes">Pacientes</NavLink>
          <NavLink to="/medicamentos">Medicamentos</NavLink>
          {(user?.role === 'ENFERMERO' || user?.role === 'DOCTOR') && (
            <NavLink to="/administracion">Administración</NavLink>
          )}
          {(user?.role === 'DIRECTOR' || user?.role === 'DOCTOR') && (
            <NavLink to="/reportes">Reportes</NavLink>
          )}
        </nav>
        <div className="user-info">
          <div>{user?.name}</div>
          <small>{user?.role}</small>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '0.75rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
