'use client';

import { LayoutGroup, motion } from 'framer-motion';
import ListRow from './ListRow';
import { useCompetitors } from './CompetitorsContext';

export default function CompetitorsList() {
  const { competitors } = useCompetitors();

  if (competitors.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-600 text-lg font-medium">No Competitors</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div className="flex flex-col gap-1.5">
        {competitors.map((competitor, index) => (
          <ListRow
            key={competitor.id}
            id={competitor.id}
            title={competitor.nickname || ''}
            iconColor={'#000000'}
            arrow={competitor.movementDirection ?? undefined}
            arrowSize={60}
            index={index}
          />
        ))}
      </motion.div>
    </LayoutGroup>
  );
}
