# Despliegue completo en Railway (una sola URL)

El proyecto está preparado para que **un solo servicio en Railway** sirva tanto la página web como la API.

## Pasos

1. Entra a [railway.com](https://railway.com) e inicia sesión con tu cuenta de GitHub.
2. Clic en **New Project** → **Deploy from GitHub repo**.
3. Selecciona el repositorio **palarconzzzz/verimed**.
4. Railway detectará el `railway.toml` y el monorepo.
5. En **Variables** agrega:
   - `JWT_SECRET` = una clave larga y secreta
   - `NODE_ENV` = `production`
6. En **Settings** → **Networking** → **Generate Domain**.

Obtendrás una URL pública (ej. `https://verimed-production.up.railway.app`) donde puedes abrir la página completa.

## Desarrollo local

```bash
# Backend
npm run dev:backend

# Frontend (otra terminal)
npm run dev:frontend
```
