
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface AdminTeamData {
  id: number;
  team_name: string;
  project_title: string;
  progress: number;
  leader_username: string;
  leader_rating?: number;
  members: Array<{
    id: string;
    name: string;
    rating: number;
  }>;
}

// Update team progress in Supabase
export const updateTeamProgressInDB = async (teamId: number, progress: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('teams')
      .update({ progress })
      .eq('id', teamId);

    if (error) {
      console.error('Error updating team progress:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating team progress:', error);
    return false;
  }
};

// Update member rating in Supabase database
export const updateMemberRatingInDB = async (memberId: string, rating: number): Promise<boolean> => {
  try {
    console.log(`updateMemberRatingInDB: Updating ${memberId} to ${rating} stars`);
    
    // Check if memberId is a UUID (actual database record) or generated ID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(memberId);
    
    if (isUUID) {
      // Direct update using UUID
      const { error } = await supabase
        .from('team_members')
        .update({ rating })
        .eq('id', memberId);

      if (error) {
        console.error('Error updating member rating:', error);
        return false;
      }
    } else {
      // Handle generated ID format: team_X_member_Y
      const memberIdParts = memberId.split('_');
      if (memberIdParts.length >= 4) {
        const teamId = parseInt(memberIdParts[1]);
        const memberIndex = parseInt(memberIdParts[3]) - 1;
        
        // Get member name from static data
        const { teamsData } = await import('@/data/teamsData');
        const team = teamsData.find(t => t.id === teamId);
        if (team && team.members[memberIndex]) {
          const memberName = team.members[memberIndex].name;
          
          // First, try to find existing member by name and team_id
          const { data: existingMember, error: fetchError } = await supabase
            .from('team_members')
            .select('id')
            .eq('team_id', teamId)
            .eq('name', memberName)
            .single();

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching member:', fetchError);
            return false;
          }

          if (existingMember) {
            // Update existing member
            const { error } = await supabase
              .from('team_members')
              .update({ rating })
              .eq('id', existingMember.id);

            if (error) {
              console.error('Error updating member rating:', error);
              return false;
            }
          } else {
            // Create new member record
            const { error } = await supabase
              .from('team_members')
              .insert({
                team_id: teamId,
                name: memberName,
                rating: rating
              });

            if (error) {
              console.error('Error creating member rating:', error);
              return false;
            }
          }
        } else {
          console.error(`Could not find member data for ${memberId}`);
          return false;
        }
      } else {
        console.error(`Invalid member ID format: ${memberId}`);
        return false;
      }
    }

    console.log(`Member rating updated in DB: ${memberId} = ${rating} stars`);
    return true;
  } catch (error) {
    console.error('Error updating member rating:', error);
    return false;
  }
};

// Update team leader rating in Supabase database
export const updateLeaderRatingInDB = async (teamId: number, rating: number): Promise<boolean> => {
  try {
    console.log(`updateLeaderRatingInDB: Updating team ${teamId} leader to ${rating} stars`);
    
    const { error } = await supabase
      .from('teams')
      .update({ leader_rating: rating })
      .eq('id', teamId);

    if (error) {
      console.error('Error updating leader rating:', error);
      return false;
    }

    console.log(`Leader rating updated in DB: team ${teamId} = ${rating} stars`);
    return true;
  } catch (error) {
    console.error('Error updating leader rating:', error);
    return false;
  }
};

// Fetch teams with members for admin dashboard
export const fetchTeamsForAdmin = async (): Promise<AdminTeamData[]> => {
  try {
    console.log('Fetching teams for admin...');
    
    // Import the actual team data
    const { teamsData } = await import('@/data/teamsData');
    
    // Fetch team data from database including ratings
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id, progress, leader_rating')
      .order('id');

    if (teamsError) {
      console.error('Error fetching teams:', teamsError);
      return [];
    }

    // Fetch all team members from database
    const { data: teamMembers, error: membersError } = await supabase
      .from('team_members')
      .select('*')
      .order('team_id');

    if (membersError) {
      console.error('Error fetching team members:', membersError);
    }

    console.log('Fetched teams from DB:', teams);
    console.log('Fetched members from DB:', teamMembers);

    // Create a map of team data from database
    const teamsMap = new Map<number, any>();
    teams?.forEach(team => {
      teamsMap.set(team.id, team);
    });

    // Create a map of member ratings from database
    const memberRatingsMap = new Map<string, number>();
    teamMembers?.forEach(member => {
      memberRatingsMap.set(member.id, member.rating || 0);
    });

    // Map static team data to admin format
    const result = teamsData.map(team => {
      const dbTeam = teamsMap.get(team.id);
      
      // Get actual database members for this team
      const dbMembersForTeam = teamMembers?.filter(member => member.team_id === team.id) || [];
      
      // Map actual database members to display format with strict name matching
      const membersWithRatings = team.members.map((member, index) => {
        // Find corresponding database member by EXACT name matching only
        const dbMember = dbMembersForTeam.find(dbM => 
          dbM.name.trim().toLowerCase() === member.name.trim().toLowerCase()
        );
        
        // Generate consistent ID based on position for new members
        const consistentId = `team_${team.id}_member_${index + 1}`;
        
        return {
          id: dbMember?.id || consistentId,
          name: member.name, // Use display name from teamsData
          rating: dbMember?.rating || 0
        };
      });

      return {
        id: team.id,
        team_name: team.name,
        project_title: team.description,
        progress: dbTeam?.progress || team.progress || 0,
        leader_username: team.leader.name,
        leader_rating: dbTeam?.leader_rating || 0,
        members: membersWithRatings
      };
    });

    console.log('Final admin teams data:', result);
    console.log('Total teams:', result.length);
    
    result.forEach(team => {
      console.log(`Team ${team.id}: ${team.members.length} members + 1 leader = ${team.members.length + 1} total`);
    });
    
    return result;
  } catch (error) {
    console.error('Error fetching teams for admin:', error);
    return [];
  }
};

// Subscribe to real-time updates
export const subscribeToAdminUpdates = (
  onTeamUpdate: (teamId: number, progress: number) => void,
  onMemberUpdate: (memberId: string, rating: number) => void
): RealtimeChannel => {
  const channel = supabase
    .channel('admin-updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'teams'
      },
      (payload: any) => {
        console.log('Team update received:', payload);
        if (payload.new && payload.new.id) {
          if (payload.new.progress !== undefined) {
            onTeamUpdate(payload.new.id, payload.new.progress);
          }
          // Handle leader rating updates
          if (payload.new.leader_rating !== undefined) {
            // Trigger a custom event for leader rating updates
            window.dispatchEvent(new CustomEvent('leaderRatingUpdated', {
              detail: { teamId: payload.new.id, rating: payload.new.leader_rating }
            }));
          }
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'team_members'
      },
      (payload: any) => {
        console.log('Member update received:', payload);
        if (payload.new && payload.new.id && payload.new.rating !== undefined) {
          onMemberUpdate(payload.new.id, payload.new.rating);
        }
      }
    )
    .subscribe();

  return channel;
};
