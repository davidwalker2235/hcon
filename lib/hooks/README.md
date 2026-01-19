# useFirebaseRealtime Hook

Hook personalizado para interactuar con Firebase Realtime Database que proporciona funciones CRUD y suscripción en tiempo real.

## Características

- ✅ **Lectura de datos**: Lee datos de un nodo específico
- ✅ **Escritura de datos**: Escribe/reescribe datos en un nodo
- ✅ **Actualización de datos**: Actualiza parcialmente los datos de un nodo
- ✅ **Eliminación de datos**: Elimina un nodo completo
- ✅ **Suscripción en tiempo real**: Detecta cambios automáticamente
- ✅ **Manejo de estados**: Loading, error y data
- ✅ **Transformación de datos**: Función opcional para transformar los datos

## Uso Básico

### Suscripción en tiempo real (recomendado)

```typescript
import { useFirebaseRealtime } from '@/lib/hooks/useFirebaseRealtime';

function CompetitorsList() {
  const { data, loading, error, write, update, remove } = useFirebaseRealtime({
    path: 'competitors',
    subscribe: true, // Por defecto es true
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && (
        <ul>
          {Object.values(data).map((competitor: any) => (
            <li key={competitor.id}>{competitor.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Solo lectura sin suscripción

```typescript
const { data, read, refresh } = useFirebaseRealtime({
  path: 'competitors',
  subscribe: false,
});

// Leer manualmente
await read();

// Refrescar datos
await refresh();
```

### Con transformación de datos

```typescript
const { data } = useFirebaseRealtime({
  path: 'competitors',
  transform: (firebaseData) => {
    // Convertir objeto de Firebase a array
    if (typeof firebaseData === 'object' && !Array.isArray(firebaseData)) {
      return Object.values(firebaseData);
    }
    return firebaseData;
  },
});
```

## Operaciones CRUD

### Escribir datos

```typescript
const { write } = useFirebaseRealtime({ path: 'competitors' });

// Escribir un objeto completo
await write({
  id: '1',
  title: 'ZeroCool',
  iconColor: '#4ade80',
});
```

### Actualizar datos parcialmente

```typescript
const { update } = useFirebaseRealtime({ path: 'competitors/1' });

// Actualizar solo algunos campos
await update({
  title: 'NewTitle',
  iconColor: '#ff0000',
});
```

### Eliminar datos

```typescript
const { remove } = useFirebaseRealtime({ path: 'competitors/1' });

// Eliminar el nodo
await remove();
```

## API

### Parámetros

- `path` (string, requerido): Ruta del nodo en Firebase (ej: 'competitors', 'users/123')
- `subscribe` (boolean, opcional): Si es true, se suscribe a cambios en tiempo real (default: true)
- `transform` (función, opcional): Función para transformar los datos antes de devolverlos

### Retorno

- `data` (T | null): Datos del nodo
- `loading` (boolean): Estado de carga
- `error` (Error | null): Error si ocurre alguno
- `read()`: Función para leer los datos una vez
- `write(value)`: Función para escribir/reescribir datos
- `update(updates)`: Función para actualizar parcialmente los datos
- `remove()`: Función para eliminar el nodo
- `refresh()`: Función para refrescar los datos manualmente

## Notas

- El hook se limpia automáticamente al desmontar el componente
- Si `subscribe` es false, los datos solo se cargan una vez al montar
- Si `subscribe` es true, los datos se actualizan automáticamente cuando cambian en Firebase
- Las funciones `write`, `update` y `remove` actualizan automáticamente el estado si hay suscripción activa
