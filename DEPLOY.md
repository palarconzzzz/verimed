# Despliegue en Railway

## Backend (Node.js + Express)

1. Entra a [railway.com](https://railway.com) e inicia sesión con GitHub.
2. Haz clic en **New Project** → **Deploy from GitHub repo**.
3. Selecciona el repositorio `palarconzzzz/verimed`.
4. En la configuración del servicio:
   - **Root Directory**: `verimed-backend`
   - Railway detectará automáticamente Node.js.
5. Ve a **Variables** y agrega:
   - `JWT_SECRET` = una clave larga y aleatoria (ej. `openssl rand -hex 32`)
   - `NODE_ENV` = `production`
6. En **Settings** → **Networking** → **Generate Domain**.

El backend quedará disponible en una URL tipo:
`https://verimed-backend-production.up.railway.app`

## Variables importantes

| Variable | Valor recomendado |
|----------|-------------------|
| `JWT_SECRET` | Clave secreta larga (obligatoria en producción) |
| `PORT` | Railway la asigna automáticamente |

## Después del despliegue

Actualiza el frontend (`.env` o variable de entorno) con:

```
VITE_API_URL=https://tu-dominio.up.railway.app
```

## Frontend

Para el frontend (React + Vite) se recomienda **Vercel** o **Netlify**:
- Conecta el mismo repo
- Root directory: `verimed-app`
- Build command: `npm run build`
- Output directory: `dist`
