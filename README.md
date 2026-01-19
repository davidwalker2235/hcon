# HCON - Hackers Competitors

Aplicación Next.js para gestionar un listado de competidores hackers con Firebase Realtime Database.

## Configuración del Proyecto

### Variables de Entorno

Este proyecto requiere variables de entorno de Firebase. Sigue estos pasos:

1. **Crea un archivo `.env.local`** en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=tu_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

2. **Para Vercel**: Consulta `VERCEL_SETUP.md` para instrucciones detalladas sobre cómo configurar las variables de entorno en Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel

1. Configura las variables de entorno en Vercel (ver `VERCEL_SETUP.md`)
2. Conecta tu repositorio a Vercel
3. Vercel desplegará automáticamente tu aplicación

## Estructura del Proyecto

- `app/` - Componentes y páginas de Next.js
- `lib/` - Módulos de utilidad y configuración
  - `firebase.ts` - Configuración de Firebase
  - `database.ts` - Adaptador de base de datos
  - `hooks/` - Hooks personalizados de React
    - `useFirebaseRealtime.ts` - Hook para Firebase Realtime Database