# Debug de despliegue en Railway - VeriMed

## Errores comunes y soluciones

### 1. \"Cannot find module\" o falla el start
**Causa**: Dependencias no instaladas en el momento correcto.  
**Solución**: El `package.json` de la raíz ahora instala backend y frontend durante el build.

### 2. La página carga en blanco o 404
**Causa**: El frontend no se construyó o la ruta de `dist` es incorrecta.  
**Solución**: Verifica en los logs de Railway que aparezca el build de Vite.  
La ruta esperada es `verimed-app/dist`.

### 3. Error de JWT o \"Token inválido\" inmediato
**Causa**: Falta la variable `JWT_SECRET`.  
**Solución**: En Railway → Variables agrega:
- `JWT_SECRET` = clave larga
- `NODE_ENV` = `production`

### 4. Healthcheck falla
**Causa**: El servidor no escucha en `0.0.0.0` o no responde en `/api/health`.  
**Solución**: Ya está configurado. Revisa los logs.

### 5. \"Application failed to respond\"
**Causa**: El proceso se cae al iniciar.  
**Solución**: Mira los logs en Railway.

## Cómo ver los logs en Railway

1. Entra a tu proyecto.
2. Haz clic en el servicio.
3. Ve a **Deployments**.
4. Haz clic en el último deploy → **View Logs**.

Busca líneas en rojo o mensajes de error.
