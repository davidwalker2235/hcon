'use client';

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
    <div className="flex flex-col gap-1.5">
      {competitors.map((competitor, index) => (
        <ListRow
          key={index}
          title={competitor.title}
          iconColor={competitor.iconColor}
          arrow={index === 0 ? "up" : index === 1 ? "down" : undefined}
          arrowSize={60}
          index={index}
        />
      ))}
    </div>
  );
}
