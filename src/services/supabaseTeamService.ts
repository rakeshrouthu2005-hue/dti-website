
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Team = Database['public']['Tables']['teams']['Row'];
type TeamMember = Database['public']['Tables']['team_members']['Row'];
type TeamMedia = Database['public']['Tables']['team_media']['Row'];

export interface TeamData {
  id: number;
  team_name: string;
  project_title: string;
  abstract: string | null;
  leader_username: string;
  members: TeamMember[];
  media: TeamMedia[];
}

// Fetch team data from Supabase
export const fetchTeamData = async (teamId: number): Promise<TeamData | null> => {
  try {
    // Get team basic info
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single();

    if (teamError) {
      console.error('Error fetching team:', teamError);
      return null;
    }

    // Get team members
    const { data: members, error: membersError } = await supabase
      .from('team_members')
      .select('*')
      .eq('team_id', teamId);

    if (membersError) {
      console.error('Error fetching team members:', membersError);
    }

    // Get team media
    const { data: media, error: mediaError } = await supabase
      .from('team_media')
      .select('*')
      .eq('team_id', teamId);

    if (mediaError) {
      console.error('Error fetching team media:', mediaError);
    }

    return {
      ...team,
      members: members || [],
      media: media || []
    };
  } catch (error) {
    console.error('Error in fetchTeamData:', error);
    return null;
  }
};

// Update team basic info
export const updateTeamData = async (teamId: number, updates: {
  team_name?: string;
  project_title?: string;
  abstract?: string;
}): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('teams')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', teamId);

    if (error) {
      console.error('Error updating team:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateTeamData:', error);
    return false;
  }
};

// Update team member
export const updateTeamMember = async (memberId: string, updates: {
  name?: string;
  photo_url?: string;
}): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', memberId);

    if (error) {
      console.error('Error updating team member:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateTeamMember:', error);
    return false;
  }
};

// Upload file to Supabase Storage with specific filename option
export const uploadFile = async (
  file: File,
  bucket: 'team-media' | 'team-videos' | 'team-presentations',
  teamId: number,
  specificFilename?: string
): Promise<string | null> => {
  try {
    let fileName: string;
    
    if (specificFilename) {
      // Use the specific filename provided (to replace existing files)
      fileName = specificFilename;
    } else {
      // Generate new filename
      const fileExt = file.name.split('.').pop();
      fileName = `team_${teamId}_${Date.now()}.${fileExt}`;
    }
    
    const filePath = `${teamId}/${fileName}`;

    // If we're replacing an existing file, remove the old one first
    if (specificFilename) {
      await supabase.storage
        .from(bucket)
        .remove([filePath]);
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        upsert: true // This will overwrite existing files
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return null;
  }
};

// Add or update team media
export const addOrUpdateTeamMedia = async (
  teamId: number,
  mediaType: 'project_photo' | 'video' | 'presentation',
  fileUrl: string,
  fileName?: string
): Promise<boolean> => {
  try {
    // Check if media of this type already exists
    const { data: existingMedia } = await supabase
      .from('team_media')
      .select('id')
      .eq('team_id', teamId)
      .eq('media_type', mediaType)
      .limit(1);

    if (existingMedia && existingMedia.length > 0) {
      // Update existing media
      const { error } = await supabase
        .from('team_media')
        .update({
          file_url: fileUrl,
          file_name: fileName
        })
        .eq('id', existingMedia[0].id);

      if (error) {
        console.error('Error updating team media:', error);
        return false;
      }
    } else {
      // Insert new media
      const { error } = await supabase
        .from('team_media')
        .insert({
          team_id: teamId,
          media_type: mediaType,
          file_url: fileUrl,
          file_name: fileName
        });

      if (error) {
        console.error('Error inserting team media:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in addOrUpdateTeamMedia:', error);
    return false;
  }
};

// Fetch all teams for listings
export const fetchAllTeams = async (): Promise<TeamData[]> => {
  try {
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .order('id');

    if (teamsError) {
      console.error('Error fetching teams:', teamsError);
      return [];
    }

    // Get all members and media for all teams
    const { data: allMembers } = await supabase
      .from('team_members')
      .select('*');

    const { data: allMedia } = await supabase
      .from('team_media')
      .select('*');

    // Group members and media by team_id
    const membersMap = new Map<number, TeamMember[]>();
    const mediaMap = new Map<number, TeamMedia[]>();

    allMembers?.forEach(member => {
      if (!membersMap.has(member.team_id!)) {
        membersMap.set(member.team_id!, []);
      }
      membersMap.get(member.team_id!)!.push(member);
    });

    allMedia?.forEach(media => {
      if (!mediaMap.has(media.team_id!)) {
        mediaMap.set(media.team_id!, []);
      }
      mediaMap.get(media.team_id!)!.push(media);
    });

    return teams.map(team => ({
      ...team,
      members: membersMap.get(team.id) || [],
      media: mediaMap.get(team.id) || []
    }));
  } catch (error) {
    console.error('Error in fetchAllTeams:', error);
    return [];
  }
};
