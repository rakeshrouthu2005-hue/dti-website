import { Team, teamsData as initialTeamsData } from '@/data/teamsData';
import { fetchAllTeams, type TeamData } from './supabaseTeamService';
import { supabase } from '@/integrations/supabase/client';

// Custom event for team data updates
const TEAMS_UPDATED_EVENT = 'teamsDataUpdated';

// Cache for teams data
let teamsCache: Team[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds

// Get teams data from Supabase with caching
export const getTeams = async (): Promise<Team[]> => {
  try {
    const now = Date.now();
    
    // Return cached data if still fresh
    if (teamsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return teamsCache;
    }
    
    const supabaseTeams = await fetchAllTeams();
    
    let result: Team[];
    if (supabaseTeams.length === 0) {
      // Fallback to initial data if no teams in database
      result = initialTeamsData;
    } else {
      // Force exactly initialTeamsData layout but merge Supabase data 
      result = initialTeamsData.map(legacyTeam => {
        const supabaseTeam = supabaseTeams.find(st => st.id === legacyTeam.id);
        if (supabaseTeam) {
          return {
            ...legacyTeam,
            id: supabaseTeam.id,
            name: supabaseTeam.team_name,
            description: supabaseTeam.project_title,
            longDescription: supabaseTeam.abstract || legacyTeam.longDescription,
            progress: ((supabaseTeam as unknown) as { progress?: number }).progress || legacyTeam.progress || 0
          };
        }
        return legacyTeam;
      });
    }
    
    // Update cache
    teamsCache = result;
    cacheTimestamp = now;
    
    return result;
  } catch (error) {
    console.error('Error loading teams data:', error);
    return initialTeamsData;
  }
};

// Update a team's progress using Supabase
export const updateTeamProgress = async (teamId: number, newProgress: number): Promise<Team[]> => {
  try {
    const { error } = await supabase
      .from('teams')
      .update({ progress: newProgress })
      .eq('id', teamId);

    if (error) {
      console.error('Error updating team progress:', error);
      return initialTeamsData;
    }

    // Clear cache to force refresh
    teamsCache = null;
    
    // Trigger update event
    window.dispatchEvent(new CustomEvent(TEAMS_UPDATED_EVENT));
    
    return await getTeams();
  } catch (error) {
    console.error('Error updating team progress:', error);
    return initialTeamsData;
  }
};

// Update a team member's rating using Supabase
export const updateMemberRating = async (teamId: number, memberId: string, rating: number): Promise<Team[]> => {
  try {
    const { error } = await supabase
      .from('team_members')
      .update({ rating })
      .eq('id', memberId);

    if (error) {
      console.error('Error updating member rating:', error);
      return initialTeamsData;
    }

    // Clear cache to force refresh
    teamsCache = null;
    
    // Trigger update event
    window.dispatchEvent(new CustomEvent(TEAMS_UPDATED_EVENT));
    
    return await getTeams();
  } catch (error) {
    console.error('Error updating member rating:', error);
    return initialTeamsData;
  }
};

// Get a single team by ID from cache or fetch
export const getTeamById = async (id: number | string): Promise<Team | undefined> => {
  try {
    const teams = await getTeams();
    return teams.find(team => team.id.toString() === id.toString());
  } catch (error) {
    console.error('Error getting team by ID:', error);
    return initialTeamsData.find(team => team.id.toString() === id.toString());
  }
};

// Subscribe to teams data updates
export const subscribeToTeamsUpdates = (callback: () => void): () => void => {
  const handler = () => {
    // Clear cache when updates happen
    teamsCache = null;
    callback();
  };
  
  window.addEventListener(TEAMS_UPDATED_EVENT, handler);
  
  return () => window.removeEventListener(TEAMS_UPDATED_EVENT, handler);
};

// Subscribe to real-time Supabase updates
export const subscribeToSupabaseUpdates = (callback: () => void): () => void => {
  const channel = supabase
    .channel('teams-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'teams'
      },
      () => {
        // Clear cache when database changes
        teamsCache = null;
        callback();
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'team_members'
      },
      () => {
        // Clear cache when database changes
        teamsCache = null;
        callback();
      }
    )
    .subscribe();
  
  return () => {
    channel.unsubscribe();
  };
};

// Trigger updates when dashboard data changes
window.addEventListener('dashboardDataUpdated', () => {
  // Clear cache when dashboard updates
  teamsCache = null;
  window.dispatchEvent(new CustomEvent(TEAMS_UPDATED_EVENT));
});
