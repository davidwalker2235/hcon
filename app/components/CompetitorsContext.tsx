'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { database, Competitor } from '../../lib/database';

interface CompetitorsContextType {
  competitors: Competitor[];
  isLoading: boolean;
  loadCompetitors: () => Promise<void>;
}

const CompetitorsContext = createContext<CompetitorsContextType | undefined>(undefined);

export function CompetitorsProvider({ children }: { children: ReactNode }) {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCompetitors = async () => {
    setIsLoading(true);
    try {
      const data = await database.getCompetitors();
      setCompetitors(data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CompetitorsContext.Provider value={{ competitors, isLoading, loadCompetitors }}>
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
