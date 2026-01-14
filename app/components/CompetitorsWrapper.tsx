'use client';

import CompetitorsList from './CompetitorsList';
import LoadDataButton from './LoadDataButton';

interface CompetitorsWrapperProps {
  showList?: boolean;
}

export default function CompetitorsWrapper({ showList = false }: CompetitorsWrapperProps) {
  if (showList) {
    return (
      <div className="bg-white/40 backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-1xl mx-[30px] sm:mx-4 md:mx-8 lg:mx-[30px] my-4">
        <CompetitorsList />
      </div>
    );
  }

  return <LoadDataButton />;
}
