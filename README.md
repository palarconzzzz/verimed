# VeriMed

Sistema de verificación y administración de medicamentos en entorno hospitalario.

## Estructura

- `verimed-app/` → Frontend (React + Vite)
- `verimed-backend/` → Backend (Node.js + Express + JWT + Refresh Tokens)

## Usuarios de prueba

| Correo | Contraseña | Rol |
|--------|------------|-----|
| enfermero@verimed.cl | 123456 | ENFERMERO |
| doctor@verimed.cl | 123456 | DOCTOR |
| farmacia@verimed.cl | 123456 | FARMACEUTICO |
| director@verimed.cl | 123456 | DIRECTOR |

## Cómo ejecutarlo

### Frontend
```bash
cd verimed-app
npm install
npm run dev
```

### Backend
```bash
cd verimed-backend
npm install
npm start
```
