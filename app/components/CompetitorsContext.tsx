'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useFirebaseRealtime } from '../../lib/hooks/useFirebaseRealtime';
import { Competitor } from '../../lib/mockData';

interface CompetitorsContextType {
  competitors: Competitor[];
  isLoading: boolean;
  loadCompetitors: () => Promise<void>;
}

const CompetitorsContext = createContext<CompetitorsContextType | undefined>(undefined);

export function CompetitorsProvider({ children }: { children: ReactNode }) {
  const { data, loading, read } = useFirebaseRealtime<Record<string, any>>({
    path: 'ranking',
    subscribe: false, // Solo leer cuando se pulse el botón
    transform: (firebaseData) => {
      // Convertir el objeto de Firebase a un array
      if (!firebaseData) return {};
      if (Array.isArray(firebaseData)) {
        // Si ya es un array, convertirlo a objeto con índices
        return firebaseData.reduce((acc, item, index) => {
          if (item !== null) {
            acc[index] = item;
          }
          return acc;
        }, {} as Record<string, any>);
      }
      return firebaseData;
    },
  });

  // Convertir el objeto a array y normalizar los datos (memoizado)
  const competitorsArray: Competitor[] = useMemo(() => {
    if (!data) return [];
    
    // La estructura de Firebase es: { "AcidBurn": { "email": "", "nickname": "Acidburn" }, ... }
    // Convertir a array: [{ nickname: "AcidBurn" }, ...]
    return Object.values(data)
      .filter((item) => item !== null && item !== undefined)
      .map((item: any) => {
        // Extraer solo el nickname de cada objeto
        return {
          nickname: item.nickname || '',
        } as Competitor;
      });
  }, [data]);

  // Memoizar la función loadCompetitors
  const loadCompetitors = useCallback(async () => {
    try {
      console.log('Loading competitors from Firebase...');
      const result = await read();
      console.log('Data loaded from Firebase:', result);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data. Please try again.');
    }
  }, [read]);

  // Memoizar el valor del contexto
  const contextValue = useMemo(() => ({
    competitors: competitorsArray,
    isLoading: loading,
    loadCompetitors,
  }), [competitorsArray, loading, loadCompetitors]);

  return (
    <CompetitorsContext.Provider value={contextValue}>
      {children}
    </CompetitorsContext.Provider>
  );
}

export function useCompetitors() {
  const context = useContext(CompetitorsContext);
  if (context === undefined) {
    throw new Error('useCompetitors must be used within a CompetitorsProvider');
  }
  return context;
}
