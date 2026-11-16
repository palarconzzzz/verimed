# VeriMed Backend - JWT + Refresh Tokens

## Cómo ejecutarlo

```bash
cd verimed-backend
npm install
npm start
```

Servidor en `http://localhost:3001`.

## Endpoints de autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Login. Devuelve `accessToken` + `refreshToken` |
| POST | `/api/auth/refresh` | Renueva el access token usando el refresh token |
| POST | `/api/auth/logout` | Invalida el refresh token |
| GET | `/api/me` | Datos del usuario (requiere access token) |

## Flujo

1. Login → recibes `accessToken` (15 min) y `refreshToken` (7 días)
2. Usas el `accessToken` en el header `Authorization: Bearer ...`
3. Cuando expira, llamas a `/api/auth/refresh` con el `refreshToken`
4. Recibes un nuevo par de tokens (rotación)
5. Al hacer logout se invalida el refresh token
