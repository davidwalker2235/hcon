'use client';

import { createContext, useContext, ReactNode, useMemo, useRef, useState, useEffect } from 'react';
import { useFirebaseRealtime } from '../../lib/hooks/useFirebaseRealtime';
import { signInAsReader } from '../../lib/firebase';
import { Competitor } from '../../lib/mockData';

interface RankedCompetitor {
  id: string;
  nickname?: string;
  highestLevel?: number;
  completedAt?: string;
  totalAttempts?: number;
  movementDirection: 'up' | 'down' | null;
}

interface CompetitorsContextType {
  competitors: RankedCompetitor[];
  isLoading: boolean;
}

const CompetitorsContext = createContext<CompetitorsContextType | undefined>(undefined);

export function CompetitorsProvider({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    signInAsReader()
      .then(() => setAuthReady(true))
      .catch((err) => {
        console.error('Firebase auth failed:', err);
        setAuthReady(true);
      });
  }, []);

  if (!authReady) {
    return (
      <CompetitorsContext.Provider value={{ competitors: [], isLoading: true }}>
        {children}
      </CompetitorsContext.Provider>
    );
  }

  return <CompetitorsProviderInner>{children}</CompetitorsProviderInner>;
}

function CompetitorsProviderInner({ children }: { children: ReactNode }) {
  const { data, loading } = useFirebaseRealtime<any>({
    path: 'leaderboard',
    subscribe: true,
  });

  const normalizeEntries = useMemo(() => {
    if (!data) {
      return [];
    }

    if (Array.isArray(data)) {
      return data
        .filter((item) => item !== null && item !== undefined)
        .map((item, index) => ({
          id: item?.nickname ?? `index-${index}`,
          payload: item as Competitor,
        }));
    }

    return Object.entries(data)
      .map(([key, value]) => ({
        id: key,
        payload: (value ?? {}) as Competitor,
      }));
  }, [data]);

  const previousOrderRef = useRef<string[]>([]);

  const competitorsArray = useMemo<RankedCompetitor[]>(() => {
    if (normalizeEntries.length === 0) {
      previousOrderRef.current = [];
      return [];
    }

    const previousOrder = previousOrderRef.current;
    const ranked = normalizeEntries.map(({ id, payload }, index) => {
      const prevIndex = previousOrder.indexOf(id);
      let movementDirection: RankedCompetitor['movementDirection'] = null;

      if (prevIndex !== -1) {
        if (index < prevIndex) {
          movementDirection = 'up';
        } else if (index > prevIndex) {
          movementDirection = 'down';
        }
      }

      return {
        id,
        nickname: payload?.nickname,
        highestLevel: payload?.highest_level ?? payload?.highestLevel,
        completedAt: payload?.completed_at ?? payload?.completedAt,
        totalAttempts: payload?.total_attempts ?? payload?.totalAttempts,
        movementDirection,
      };
    });

    const topNine = ranked.slice(0, 9);
    previousOrderRef.current = topNine.map(({ id }) => id);
    return topNine;
  }, [normalizeEntries]);

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
