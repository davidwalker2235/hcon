# Firebase no conecta en Vercel (sí en local)

Sigue estos pasos en orden.

---

## 1. Redeploy después de añadir variables

En Vercel, las variables `NEXT_PUBLIC_*` se **inyectan en el build**. Si añadiste las variables **después** del último deploy, ese build se hizo **sin** ellas.

- Ve a **Vercel** → tu proyecto → **Deployments**
- En el último deployment, menú (⋯) → **Redeploy**
- Marca **Use existing Build Cache** si quieres, pero mejor **Redeploy** sin cache la primera vez

Vuelve a probar la URL de producción.

---

## 2. Comprobar ámbito de las variables

- **Vercel** → **Settings** → **Environment Variables**
- Cada variable debe estar asignada al entorno que usas:
  - Si abres `tu-app.vercel.app` → tiene que estar en **Production**
  - Si abres un deployment de preview → **Preview**
- Asegúrate de que las 8 de Firebase (y si usas login, las 2 de reader) estén en **Production** (y en **Preview** si usas previews).

---

## 3. Dominio autorizado en Firebase

Firebase solo acepta peticiones desde dominios autorizados.

- **Firebase Console** → tu proyecto → **Authentication** → **Settings** → pestaña **Authorized domains**
- Añade:
  - `tu-proyecto.vercel.app`
  - Y si usas dominio propio: `tudominio.com`
- Guarda.

Sin esto, la conexión desde Vercel puede fallar aunque las variables estén bien.

---

## 4. Nombre exacto de las variables

En Vercel deben llamarse **exactamente** así (sensible a mayúsculas):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

Si usas login con usuario lector:

- `NEXT_PUBLIC_FIREBASE_READER_EMAIL`
- `NEXT_PUBLIC_FIREBASE_READER_PASSWORD`

Sin espacios ni caracteres de más.

---

## 5. Ver el error real en producción

- Abre la **URL de Vercel** (producción o preview)
- Abre **DevTools** (F12) → pestaña **Console**
- Recarga la página

Ahí puede salir:

- **"Missing Firebase env: ..."** → faltan variables o no se aplicaron en el build → pasos 1 y 2
- **Error de red / CORS** → suele ser dominio no autorizado → paso 3
- **Error de Auth** → revisa reader email/password en Vercel y reglas de la base de datos

Copia el mensaje exacto del error para afinar más.

---

## Resumen rápido

| Comprobación | Acción |
|--------------|--------|
| Variables añadidas después del deploy | **Redeploy** (y si puede ser, sin cache) |
| Variables solo en Preview | Añadirlas también a **Production** |
| Dominio Vercel no en Firebase | Añadir `*.vercel.app` o tu dominio en **Authorized domains** |
| Nombre distinto en Vercel | Usar exactamente los nombres de `VERCEL_ENV.md` |

Si tras esto sigue sin conectar, el mensaje exacto de la consola del navegador en la URL de Vercel es lo que más ayuda para el siguiente paso.
