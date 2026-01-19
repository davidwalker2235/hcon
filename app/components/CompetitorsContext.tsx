'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useFirebaseRealtime } from '../../lib/hooks/useFirebaseRealtime';
import { Competitor } from '../../lib/mockData';

interface CompetitorsContextType {
  competitors: Competitor[];
  isLoading: boolean;
}

const CompetitorsContext = createContext<CompetitorsContextType | undefined>(undefined);

export function CompetitorsProvider({ children }: { children: ReactNode }) {
  const { data, loading } = useFirebaseRealtime<Record<string, any>>({
    path: 'ranking',
    subscribe: true, // Suscribirse a cambios en tiempo real
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

  // Memoizar el valor del contexto
  const contextValue = useMemo(() => ({
    competitors: competitorsArray,
    isLoading: loading,
  }), [competitorsArray, loading]);

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
