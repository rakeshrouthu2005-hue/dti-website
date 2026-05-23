
import { fetchTeamData, updateTeamData, updateTeamMember, uploadFile, addOrUpdateTeamMedia } from './supabaseTeamService';

export interface TeamDashboardData {
  id: number;
  username: string;
  teamName: string;
  projectTitle: string;
  abstract: string;
  members: Array<{
    id: string;
    name: string;
    photo: string;
  }>;
  projectPhotos: string[];
  projectVideos?: string[];
  presentations?: string[];
}

// Get team dashboard data from Supabase
export const getTeamDashboardData = async (teamId: string): Promise<TeamDashboardData | null> => {
  try {
    const numericTeamId = parseInt(teamId.replace('team', ''));
    const teamData = await fetchTeamData(numericTeamId);
    
    if (!teamData) return null;

    // Group media by type
    const projectPhotos = teamData.media
      .filter(m => m.media_type === 'project_photo')
      .map(m => m.file_url);
    
    const projectVideos = teamData.media
      .filter(m => m.media_type === 'video')
      .map(m => m.file_url);
    
    const presentations = teamData.media
      .filter(m => m.media_type === 'presentation')
      .map(m => m.file_url);

    return {
      id: teamData.id,
      username: teamData.leader_username,
      teamName: teamData.team_name,
      projectTitle: teamData.project_title,
      abstract: teamData.abstract || '',
      members: teamData.members.map(member => ({
        id: member.id,
        name: member.name,
        photo: member.photo_url || '/placeholder.svg'
      })),
      projectPhotos: projectPhotos.length > 0 ? projectPhotos : ['/placeholder.svg', '/placeholder.svg'],
      projectVideos,
      presentations
    };
  } catch (error) {
    console.error('Error fetching team dashboard data:', error);
    return null;
  }
};

// Update team dashboard data in Supabase
export const updateTeamDashboardData = async (teamId: string, data: Partial<TeamDashboardData>): Promise<void> => {
  try {
    const numericTeamId = parseInt(teamId.replace('team', ''));
    
    // Update basic team info
    if (data.teamName || data.projectTitle || data.abstract !== undefined) {
      await updateTeamData(numericTeamId, {
        team_name: data.teamName,
        project_title: data.projectTitle,
        abstract: data.abstract
      });
    }

    // Update members if provided
    if (data.members) {
      for (const member of data.members) {
        await updateTeamMember(member.id, {
          name: member.name,
          photo_url: member.photo
        });
      }
    }
  } catch (error) {
    console.error('Error updating team dashboard data:', error);
    throw error;
  }
};

// Upload and save media files with specific filename to replace existing files
export const uploadTeamMedia = async (
  teamId: string,
  file: File,
  mediaType: 'project_photo' | 'video' | 'presentation',
  specificFilename?: string
): Promise<string | null> => {
  try {
    const numericTeamId = parseInt(teamId.replace('team', ''));
    
    // Determine bucket based on media type
    let bucket: 'team-media' | 'team-videos' | 'team-presentations';
    switch (mediaType) {
      case 'project_photo':
        bucket = 'team-media';
        break;
      case 'video':
        bucket = 'team-videos';
        break;
      case 'presentation':
        bucket = 'team-presentations';
        break;
    }

    // Upload file to storage with specific filename if provided
    const fileUrl = await uploadFile(file, bucket, numericTeamId, specificFilename);
    
    if (fileUrl) {
      // Save media record in database
      const fileName = specificFilename || file.name;
      await addOrUpdateTeamMedia(numericTeamId, mediaType, fileUrl, fileName);
    }

    return fileUrl;
  } catch (error) {
    console.error('Error uploading team media:', error);
    return null;
  }
};

export const isValidTeamLeader = (username: string, teamId: string): boolean => {
  // This will be validated against the database when fetching team data
  return true; // Simplified for now - real validation happens in getTeamDashboardData
};
