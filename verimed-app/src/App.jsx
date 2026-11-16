import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Medicamentos from './pages/Medicamentos';
import Administracion from './pages/Administracion';
import Reportes from './pages/Reportes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="medicamentos" element={<Medicamentos />} />
            <Route
              path="administracion"
              element={
                <ProtectedRoute allowedRoles={['ENFERMERO', 'DOCTOR']}>
                  <Administracion />
                </ProtectedRoute>
              }
            />
            <Route
              path="reportes"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR', 'DOCTOR']}>
                  <Reportes />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
