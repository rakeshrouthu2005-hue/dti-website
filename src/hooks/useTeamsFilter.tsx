
import { useMemo } from 'react';

interface UseTeamsFilterProps {
  teams: any[];
  searchQuery: string;
  selectedProgress: string;
}

export const useTeamsFilter = ({ teams, searchQuery, selectedProgress }: UseTeamsFilterProps) => {
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            team.leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            team.members.some(member => member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            team.leader.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            team.members.some(member => member.role.toLowerCase().includes(searchQuery.toLowerCase()));
      
      let matchesProgress = true;
      if (selectedProgress === 'low') {
        matchesProgress = team.progress <= 30;
      } else if (selectedProgress === 'medium') {
        matchesProgress = team.progress > 30 && team.progress <= 70;
      } else if (selectedProgress === 'high') {
        matchesProgress = team.progress > 70;
      }
      
      return matchesSearch && matchesProgress;
    });
  }, [teams, searchQuery, selectedProgress]);

  return filteredTeams;
};
