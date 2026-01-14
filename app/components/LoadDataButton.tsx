'use client';

import { useCompetitors } from './CompetitorsContext';

export default function LoadDataButton() {
  const { loadCompetitors, isLoading } = useCompetitors();

  return (
    <button
      onClick={loadCompetitors}
      disabled={isLoading}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
    >
      {isLoading ? 'Loading...' : 'Load Data'}
    </button>
  );
}
