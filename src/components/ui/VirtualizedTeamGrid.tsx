
import React, { memo, useMemo } from 'react';
import TeamCard from './TeamCard';

interface VirtualizedTeamGridProps {
  teams: any[];
  className?: string;
}

const VirtualizedTeamGrid: React.FC<VirtualizedTeamGridProps> = memo(({ teams, className }) => {
  const memoizedTeams = useMemo(() => teams, [teams]);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className || ''}`}>
      {memoizedTeams.map(team => (
        <TeamCard
          key={`team-${team.id}`}
          id={team.id}
          name={team.name}
          progress={team.progress}
        />
      ))}
    </div>
  );
});

VirtualizedTeamGrid.displayName = 'VirtualizedTeamGrid';

export default VirtualizedTeamGrid;
