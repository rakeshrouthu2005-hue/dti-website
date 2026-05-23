
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Award } from 'lucide-react';
import PageSEO from '@/components/SEO/PageSEO';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getTeamById } from '@/services/teamService';
import { fetchTeamData } from '@/services/supabaseTeamService';
import StarRating from '@/components/ui/StarRating';
import PresentationViewer from '@/components/presentations/PresentationViewer';
import { supabase } from '@/integrations/supabase/client';

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [supabaseTeamData, setSupabaseTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableImages, setAvailableImages] = useState([]);
  
  const loadTeamData = async () => {
    if (id) {
      try {
        // Load legacy team data for display compatibility
        const teamData = await getTeamById(id);
        
        // Fetch ratings from database
        const { data: dbTeam } = await supabase
          .from('teams')
          .select('leader_rating')
          .eq('id', parseInt(id))
          .single();

        const { data: dbMembers } = await supabase
          .from('team_members')
          .select('*')
          .eq('team_id', parseInt(id));

        // Create member ratings map
        const memberRatingsMap = new Map<string, number>();
        dbMembers?.forEach(member => {
          memberRatingsMap.set(member.id, member.rating || 0);
        });
        
        // Update team data with ratings from database
        const updatedTeam = {
          ...teamData,
          leader: {
            ...teamData.leader,
            rating: dbTeam?.leader_rating || 0
          },
          members: teamData.members.map((member, index) => {
            // Find corresponding database member by EXACT name matching only
            const dbMember = dbMembers?.find(dbM => 
              dbM.team_id === parseInt(id) && 
              dbM.name.trim().toLowerCase() === member.name.trim().toLowerCase()
            );
            
            // Generate consistent ID based on position
            const consistentId = `team_${id}_member_${index + 1}`;
            
            return {
              ...member,
              id: dbMember?.id || consistentId,
              rating: dbMember?.rating || 0
            };
          })
        };
        
        setTeam(updatedTeam);
        
        // Load Supabase data for updated content
        const supabaseData = await fetchTeamData(parseInt(id));
        setSupabaseTeamData(supabaseData);
        
        // Check for available project images
        await checkAvailableImages(id);
      } catch (error) {
        console.error('Error loading team data:', error);
        navigate('/teams');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const checkAvailableImages = async (teamId) => {
    const imageUrls = [];
    
    // Check for up to 3 project images
    for (let i = 1; i <= 3; i++) {
      const imageUrl = `/project-images/team${teamId}/project${i}.jpg`;
      
      try {
        // Create a promise to check if image exists
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageUrl;
        });
        
        imageUrls.push(imageUrl);
      } catch (error) {
        // Image doesn't exist, skip it
        console.log(`Image ${imageUrl} not found`);
      }
    }
    
    setAvailableImages(imageUrls);
  };
  
  useEffect(() => {
    loadTeamData();
  }, [id, navigate]);

  // Listen for dashboard updates
  useEffect(() => {
    const handleDashboardUpdate = (event) => {
      if (event.detail?.teamId === `team${id}`) {
        console.log('Dashboard updated, refreshing team data...');
        loadTeamData();
      }
    };

    const handleRatingUpdate = () => {
      loadTeamData();
    };

    const handleLeaderRatingUpdate = (event: CustomEvent) => {
      if (event.detail?.teamId === parseInt(id)) {
        loadTeamData();
      }
    };

    window.addEventListener('dashboardDataUpdated', handleDashboardUpdate);
    window.addEventListener('adminRatingUpdated', handleRatingUpdate);
    window.addEventListener('leaderRatingUpdated', handleLeaderRatingUpdate as EventListener);
    
    return () => {
      window.removeEventListener('dashboardDataUpdated', handleDashboardUpdate);
      window.removeEventListener('adminRatingUpdated', handleRatingUpdate);
      window.removeEventListener('leaderRatingUpdated', handleLeaderRatingUpdate as EventListener);
    };
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Team not found</h1>
          <Button onClick={() => navigate('/teams')}>Back to Teams</Button>
        </div>
      </div>
    );
  }
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Use Supabase data if available, otherwise fallback to legacy data
  const displayTeam = supabaseTeamData ? {
    ...team,
    name: supabaseTeamData.team_name,
    description: supabaseTeamData.project_title,
    longDescription: supabaseTeamData.abstract || team.longDescription
  } : team;

  // Get project media from Supabase data
  const projectImages = supabaseTeamData?.media
    .filter(m => m.media_type === 'project_photo')
    .map(m => m.file_url) || [];
  
  const projectVideos = supabaseTeamData?.media
    .filter(m => m.media_type === 'video')
    .map(m => m.file_url) || [];

  // Use uploaded images first, then fall back to static images if they exist
  const displayImages = projectImages.length > 0 ? projectImages.slice(0, 3) : availableImages;
  const videoUrl = projectVideos.length > 0 ? projectVideos[0] : `/team_videos/team_${team.id}.mp4`;
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageSEO
        title={`Team ${displayTeam.name}`} 
        description={`Learn about Team ${displayTeam.name} and their innovative project: ${displayTeam.description}. See team members and project progress.`}
        keywords={`${displayTeam.name}, design thinking project, engineering innovation, student team, Lendi Institute, ${team.leader.name}`}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <section className="relative px-6 py-20 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/teams')}
            >
              <ArrowLeft size={16} />
              Back to Teams
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <span className="inline-block py-1 px-3 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium mb-2">
                    Team {team.id}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold">{displayTeam.name}</h1>
                </div>
                
                <p className="text-xl text-muted-foreground">{displayTeam.description}</p>
                
                <div className="pt-4">
                  <ProgressBar 
                    progress={team.progress} 
                    label="Project Completion" 
                    size="lg" 
                    color={team.progress > 75 ? 'success' : team.progress > 25 ? 'default' : 'warning'} 
                  />
                </div>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Avatar className="w-full h-auto object-cover aspect-[4/3]">
                    <AvatarImage 
                      src={team.leader.image} 
                      alt={team.leader.name}
                      className="w-full h-auto aspect-[4/3] object-cover"
                      loading="eager"
                    />
                    <AvatarFallback className="w-full h-auto aspect-[4/3] text-5xl bg-gradient-to-r from-blue-100 to-indigo-100">
                      {getInitials(team.leader.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="text-yellow-400" size={18} />
                      <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-600 border-yellow-400/30">
                        Team Leader
                      </Badge>
                    </div>
                    <h3 className="text-white font-bold text-xl">{team.leader.name}</h3>
                    <p className="text-white/80">{team.leader.role}</p>
                    {team.leader.rating > 0 && (
                      <div className="mt-1">
                        <StarRating rating={team.leader.rating} size="md" interactive={false} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Project Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-muted-foreground">{displayTeam.longDescription}</p>
            </div>
            
            {/* Project Video Section */}
            <div className="mt-12">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Project Presentation</h3>
              <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-black aspect-video">
                <video 
                  controls
                  className="w-full h-full object-contain"
                  poster={displayImages[0]}
                  preload="metadata"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null; 
                    el.parentElement.innerHTML = `
                      <div class="flex flex-col items-center justify-center w-full h-full text-white p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4 opacity-60"><path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/><path d="m10 9 5 3-5 3z"/></svg>
                        <p class="text-lg font-medium opacity-80">Video presentation coming soon</p>
                        <p class="text-sm opacity-60 mt-2">The team is currently preparing their video presentation</p>
                      </div>
                    `;
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Presentation Section */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <PresentationViewer teamId={team.id} teamName={displayTeam.name} />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
              <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium mb-2">
                Our Team
              </span>
              <br />
              Meet the Members
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl border-2 border-yellow-400">
                <div className="aspect-square overflow-hidden relative">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={team.leader.image} 
                      alt={team.leader.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <AvatarFallback className="w-full h-full text-3xl bg-gradient-to-r from-yellow-100 to-amber-100">
                      {getInitials(team.leader.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-yellow-400 text-yellow-900">
                      <Award className="mr-1 h-3 w-3" /> Leader
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{team.leader.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.leader.role}</p>
                  {team.leader.rating > 0 && (
                    <div className="mt-2">
                      <StarRating rating={team.leader.rating} size="sm" interactive={false} />
                    </div>
                  )}
                </div>
              </div>
              
              {team.members.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <Avatar className="w-full h-full">
                      <AvatarImage 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <AvatarFallback className="w-full h-full text-3xl bg-gradient-to-r from-blue-100 to-indigo-100">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    {member.rating > 0 && (
                      <div className="mt-2">
                        <StarRating rating={member.rating} size="sm" interactive={false} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {displayImages.length > 0 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
                <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium mb-2">
                  Gallery
                </span>
                <br />
                Project Showcase
              </h2>
              
              <div className={`grid gap-8 ${
                displayImages.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
                displayImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-3'
              }`}>
                {displayImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl"
                  >
                    <img 
                      src={image} 
                      alt={`Project image ${index + 1} for Team ${team.id}`} 
                      className="w-full h-auto aspect-video object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Project images from Team {team.id}'s development process ({displayImages.length} image{displayImages.length !== 1 ? 's' : ''})
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamDetail;
