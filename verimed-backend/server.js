import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'verimed-secret-key-cambia-en-produccion';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

app.use(cors());
app.use(express.json());

const frontendDist = path.join(__dirname, '..', 'verimed-app', 'dist');
app.use(express.static(frontendDist));

const refreshTokens = new Map();

const users = [
  { id: 1, email: 'enfermero@verimed.cl', passwordHash: bcrypt.hashSync('123456', 10), name: 'Diego Soto', role: 'ENFERMERO' },
  { id: 2, email: 'doctor@verimed.cl', passwordHash: bcrypt.hashSync('123456', 10), name: 'Camila Rojas', role: 'DOCTOR' },
  { id: 3, email: 'farmacia@verimed.cl', passwordHash: bcrypt.hashSync('123456', 10), name: 'Valentina Pérez', role: 'FARMACEUTICO' },
  { id: 4, email: 'director@verimed.cl', passwordHash: bcrypt.hashSync('123456', 10), name: 'Andrés Fuentes', role: 'DIRECTOR' },
];

function generateAccessToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

function generateRefreshToken(userId) {
  const token = crypto.randomBytes(40).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  refreshTokens.set(token, { userId, expiresAt });
  return token;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Token inválido o expirado', code: 'TOKEN_EXPIRED' });
    req.user = payload;
    next();
  });
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'No tienes permisos' });
    next();
  };
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' });
  const user = users.find(u => u.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Credenciales inválidas' });
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id);
  res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token requerido' });
  const stored = refreshTokens.get(refreshToken);
  if (!stored || stored.expiresAt < Date.now()) {
    refreshTokens.delete(refreshToken);
    return res.status(401).json({ error: 'Refresh token inválido o expirado' });
  }
  const user = users.find(u => u.id === stored.userId);
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
  refreshTokens.delete(refreshToken);
  res.json({ accessToken: generateAccessToken(user), refreshToken: generateRefreshToken(user.id) });
});

app.post('/api/auth/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) refreshTokens.delete(refreshToken);
  res.json({ message: 'Sesión cerrada' });
});

app.get('/api/me', authenticateToken, (req, res) => res.json({ message: 'Token válido', user: req.user }));

app.get('/api/reportes', authenticateToken, requireRole('DIRECTOR', 'DOCTOR'), (req, res) => {
  res.json({ message: 'Acceso permitido', data: [{ tipo: 'Administraciones hoy', valor: 48 }, { tipo: 'Alertas activas', valor: 3 }] });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`VeriMed corriendo en http://0.0.0.0:${PORT}`);
});
