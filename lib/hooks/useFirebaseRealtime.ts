'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ref, get, set, update, remove, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase';

interface UseFirebaseRealtimeOptions<T> {
  /**
   * Ruta del nodo en Firebase Realtime Database (ej: 'competitors', 'users/123')
   */
  path: string;
  
  /**
   * Si es true, se suscribe a cambios en tiempo real
   * @default true
   */
  subscribe?: boolean;
  
  /**
   * Función para transformar los datos antes de devolverlos
   */
  transform?: (data: any) => T;
}

interface UseFirebaseRealtimeReturn<T> {
  /**
   * Datos del nodo
   */
  data: T | null;
  
  /**
   * Estado de carga
   */
  loading: boolean;
  
  /**
   * Error si ocurre alguno
   */
  error: Error | null;
  
  /**
   * Lee los datos del nodo una vez
   */
  read: () => Promise<T | null>;
  
  /**
   * Escribe/reescribe datos en el nodo
   */
  write: (value: T) => Promise<void>;
  
  /**
   * Actualiza parcialmente los datos del nodo
   */
  update: (updates: Partial<T> | Record<string, any>) => Promise<void>;
  
  /**
   * Elimina el nodo
   */
  remove: () => Promise<void>;
  
  /**
   * Refresca los datos manualmente
   */
  refresh: () => Promise<void>;
}

/**
 * Hook personalizado para interactuar con Firebase Realtime Database
 * 
 * @example
 * // Suscripción en tiempo real
 * const { data, loading, error, write, update, remove } = useFirebaseRealtime({
 *   path: 'competitors',
 *   subscribe: true
 * });
 * 
 * @example
 * // Solo lectura sin suscripción
 * const { data, read } = useFirebaseRealtime({
 *   path: 'competitors',
 *   subscribe: false
 * });
 */
export function useFirebaseRealtime<T = any>(
  options: UseFirebaseRealtimeOptions<T>
): UseFirebaseRealtimeReturn<T> {
  const { path, subscribe = true, transform } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const nodeRef = ref(database, path);

  /**
   * Transforma los datos de Firebase según la función proporcionada
   */
  const transformData = useCallback((snapshot: DataSnapshot): T | null => {
    if (!snapshot.exists()) {
      return null;
    }
    
    const value = snapshot.val();
    
    if (transform) {
      return transform(value);
    }
    
    return value as T;
  }, [transform]);

  /**
   * Lee los datos del nodo una vez
   */
  const read = useCallback(async (): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const snapshot = await get(nodeRef);
      const transformedData = transformData(snapshot);
      
      setData(transformedData);
      setLoading(false);
      
      return transformedData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al leer los datos');
      setError(error);
      setLoading(false);
      throw error;
    }
  }, [nodeRef, transformData]);

  /**
   * Escribe/reescribe datos en el nodo
   */
  const write = useCallback(async (value: T): Promise<void> => {
    try {
      setError(null);
      await set(nodeRef, value);
      // Los datos se actualizarán automáticamente si hay suscripción activa
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al escribir los datos');
      setError(error);
      throw error;
    }
  }, [nodeRef]);

  /**
   * Actualiza parcialmente los datos del nodo
   */
  const updateData = useCallback(async (updates: Partial<T> | Record<string, any>): Promise<void> => {
    try {
      setError(null);
      await update(nodeRef, updates);
      // Los datos se actualizarán automáticamente si hay suscripción activa
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al actualizar los datos');
      setError(error);
      throw error;
    }
  }, [nodeRef]);

  /**
   * Elimina el nodo
   */
  const removeData = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await remove(nodeRef);
      // Los datos se actualizarán automáticamente si hay suscripción activa
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al eliminar los datos');
      setError(error);
      throw error;
    }
  }, [nodeRef]);

  /**
   * Refresca los datos manualmente
   */
  const refresh = useCallback(async (): Promise<void> => {
    await read();
  }, [read]);

  /**
   * Efecto para suscribirse a cambios en tiempo real
   */
  useEffect(() => {
    if (!subscribe) {
      // Si no hay suscripción, solo leer una vez
      read().catch(console.error);
      return;
    }

    setLoading(true);
    setError(null);

    // Suscribirse a cambios en tiempo real
    const unsubscribe = onValue(
      nodeRef,
      (snapshot) => {
        try {
          const transformedData = transformData(snapshot);
          setData(transformedData);
          setLoading(false);
          setError(null);
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Error al procesar los datos');
          setError(error);
          setLoading(false);
        }
      },
      (err) => {
        const error = err instanceof Error ? err : new Error('Error en la suscripción');
        setError(error);
        setLoading(false);
      }
    );

    unsubscribeRef.current = unsubscribe;

    // Limpiar suscripción al desmontar o cambiar de path
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [path, subscribe, nodeRef, transformData]);

  return {
    data,
    loading,
    error,
    read,
    write,
    update: updateData,
    remove: removeData,
    refresh,
  };
}
