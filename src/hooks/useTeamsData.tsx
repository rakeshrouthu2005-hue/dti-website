
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getTeams, subscribeToTeamsUpdates } from '@/services/teamService';

export const useTeamsData = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTeams = useCallback(async () => {
    try {
      setError(null);
      const teamsData = await getTeams();
      setTeams(teamsData);
    } catch (err) {
      console.error('Error loading teams:', err);
      setError('Failed to load teams');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTeams = useCallback(async () => {
    try {
      const teamsData = await getTeams();
      setTeams(teamsData);
    } catch (err) {
      console.error('Error refreshing teams:', err);
    }
  }, []);

  useEffect(() => {
    loadTeams();
    
    // Subscribe to teams data updates
    const unsubscribe = subscribeToTeamsUpdates(refreshTeams);
    
    return () => unsubscribe();
  }, [loadTeams, refreshTeams]);

  const memoizedTeams = useMemo(() => teams, [teams]);

  return {
    teams: memoizedTeams,
    isLoading,
    error,
    refreshTeams
  };
};
