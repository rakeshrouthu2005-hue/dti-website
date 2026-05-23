
import { useState, useEffect, useCallback } from 'react';
import { 
  AdminTeamData, 
  fetchTeamsForAdmin, 
  subscribeToAdminUpdates, 
  updateTeamProgressInDB, 
  updateMemberRatingInDB,
  updateLeaderRatingInDB
} from '@/services/adminRealtimeService';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useAdminRealtime = () => {
  const [teams, setTeams] = useState<AdminTeamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  const loadTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const teamsData = await fetchTeamsForAdmin();
      setTeams(teamsData);
    } catch (err) {
      console.error('Error loading teams:', err);
      setError('Failed to load teams');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle real-time team progress updates
  const handleTeamUpdate = useCallback((teamId: number, progress: number) => {
    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.id === teamId ? { ...team, progress } : team
      )
    );
  }, []);

  // Handle real-time member rating updates
  const handleMemberUpdate = useCallback((memberId: string, rating: number) => {
    setTeams(prevTeams => 
      prevTeams.map(team => ({
        ...team,
        members: team.members.map(member => 
          member.id === memberId ? { ...member, rating } : member
        )
      }))
    );
  }, []);

  // Handle leader rating updates
  const handleLeaderRatingUpdate = useCallback((event: CustomEvent) => {
    const { teamId, rating } = event.detail;
    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.id === teamId ? { ...team, leader_rating: rating } : team
      )
    );
  }, []);

  // Update team progress
  const updateTeamProgress = useCallback(async (teamId: number, progress: number): Promise<boolean> => {
    const success = await updateTeamProgressInDB(teamId, progress);
    if (!success) {
      setError('Failed to update team progress');
    }
    return success;
  }, []);

  // Update member rating
  const updateMemberRating = useCallback(async (memberId: string, rating: number): Promise<boolean> => {
    console.log(`useAdminRealtime: Updating member ${memberId} rating to ${rating}`);
    const success = await updateMemberRatingInDB(memberId, rating);
    if (!success) {
      console.error(`Failed to update member rating for ${memberId}`);
      setError('Failed to update member rating');
    } else {
      console.log(`Successfully updated member ${memberId} rating to ${rating}`);
    }
    return success;
  }, []);

  // Update leader rating
  const updateLeaderRating = useCallback(async (teamId: number, rating: number): Promise<boolean> => {
    console.log(`useAdminRealtime: Updating team ${teamId} leader rating to ${rating}`);
    const success = await updateLeaderRatingInDB(teamId, rating);
    if (!success) {
      console.error(`Failed to update leader rating for team ${teamId}`);
      setError('Failed to update leader rating');
    } else {
      console.log(`Successfully updated team ${teamId} leader rating to ${rating}`);
    }
    return success;
  }, []);

  useEffect(() => {
    loadTeams();

    // Set up real-time subscription
    const channel: RealtimeChannel = subscribeToAdminUpdates(
      handleTeamUpdate,
      handleMemberUpdate
    );

    // Listen for leader rating updates
    window.addEventListener('leaderRatingUpdated', handleLeaderRatingUpdate as EventListener);

    return () => {
      channel.unsubscribe();
      window.removeEventListener('leaderRatingUpdated', handleLeaderRatingUpdate as EventListener);
    };
  }, [loadTeams, handleTeamUpdate, handleMemberUpdate, handleLeaderRatingUpdate]);

  return {
    teams,
    isLoading,
    error,
    updateTeamProgress,
    updateMemberRating,
    updateLeaderRating,
    refreshTeams: loadTeams
  };
};
