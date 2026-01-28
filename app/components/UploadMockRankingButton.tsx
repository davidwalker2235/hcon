'use client';

import { useCallback, useState } from 'react';
import { useFirebaseRealtime } from '../../lib/hooks/useFirebaseRealtime';
import { mockCompetitors, Competitor } from '../../lib/mockData';

const statuses = {
  idle: 'Cargar leaderboard mock',
  saving: 'Subiendo datos...',
  success: 'Leaderboard actualizado',
  error: 'Error al subir'
} as const;

type StatusKey = keyof typeof statuses;

export default function UploadMockRankingButton() {
  const [status, setStatus] = useState<StatusKey>('idle');
  const { write } = useFirebaseRealtime<Competitor[]>({
    path: 'leaderboard',
    subscribe: false,
  });

  const handleUpload = useCallback(async () => {
    try {
      setStatus('saving');
      await write(mockCompetitors);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      console.error('Error subiendo leaderboard mock', err);
      setStatus('error');
    }
  }, [write]);

  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleUpload}
        disabled={status === 'saving'}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/70 text-white font-semibold px-6 py-3 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-wait"
      >
        {statuses[status]}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-500">No se pudo actualizar el leaderboard.</p>
      )}
    </div>
  );
}
