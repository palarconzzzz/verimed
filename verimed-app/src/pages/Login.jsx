import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('enfermero@verimed.cl');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>VeriMed</h1>
        <p>Sistema de Verificación de Medicamentos</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@verimed.cl"
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary">Ingresar</button>
        </form>
        <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#666' }}>
          <strong>Usuarios de prueba:</strong><br />
          enfermero@verimed.cl / 123456<br />
          doctor@verimed.cl / 123456<br />
          farmacia@verimed.cl / 123456<br />
          director@verimed.cl / 123456
        </div>
      </div>
    </div>
  );
}
