# Variables de entorno - VeriMed

## Backend (obligatorias en Railway)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------| 
| `JWT_SECRET` | Clave secreta para firmar los JWT. **Obligatoria en producción.** | `a1b2c3d4e5f6...` (mínimo 32 caracteres) |
| `NODE_ENV` | Entorno de ejecución | `production` |
| `PORT` | Puerto (Railway lo asigna automáticamente) | `3001` |

## Frontend

| Variable | Descripción | Cuándo usarla |
|----------|-------------|----------------|
| `VITE_API_URL` | URL base de la API | Solo en desarrollo local. En producción dejar vacía (usa rutas relativas). |

## Cómo generar un JWT_SECRET seguro

```bash
openssl rand -hex 32
```

## En Railway

1. Abre tu servicio.
2. Ve a **Variables**.
3. Agrega:
   - `JWT_SECRET` = el valor generado
   - `NODE_ENV` = `production`
4. Guarda y redeploy.

## En local

Copia `.env.example` a `.env` y ajusta los valores.
