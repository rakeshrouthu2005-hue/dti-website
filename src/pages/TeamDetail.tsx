
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
import { getTeamBySectionAndId } from '@/services/teamService';
import { fetchTeamData } from '@/services/supabaseTeamService';
import StarRating from '@/components/ui/StarRating';
import PresentationViewer from '@/components/presentations/PresentationViewer';
import { supabase } from '@/integrations/supabase/client';

const TeamDetail = () => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [supabaseTeamData, setSupabaseTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableImages, setAvailableImages] = useState([]);
  
  const loadTeamData = async () => {
    if (section && id) {
      try {
        // Load legacy team data for display compatibility
        const teamData = await getTeamBySectionAndId(section, id);
        
        if (!teamData) {
          navigate(`/teams/${section}`);
          return;
        }
        
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
        navigate(`/teams/${section}`);
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
  }, [section, id, navigate]);

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
          <Button onClick={() => navigate(`/teams/${section || 'eee-a'}`)}>Back to Teams</Button>
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
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <PageSEO
        title={`Team ${displayTeam.name}`} 
        description={`Learn about Team ${displayTeam.name} and their innovative project: ${displayTeam.description}. See team members and project progress.`}
        keywords={`${displayTeam.name}, design thinking project, engineering innovation, student team, Lendi Institute, ${team.leader.name}`}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        {/* Page Hero - Modern and High-Fidelity */}
        <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-slate-950 text-white mt-16 glow-mesh-combo">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Button
              variant="ghost"
              className="mb-8 flex items-center gap-2 text-slate-450 hover:text-white hover:bg-white/5 rounded-xl border border-slate-900 transition-all font-semibold"
              onClick={() => navigate(`/teams/${section}`)}
            >
              <ArrowLeft size={15} />
              Back to Teams
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Heading and Details */}
              <div className="space-y-6 lg:col-span-7">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest">
                    Team Portfolio {team.id}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">{displayTeam.description || displayTeam.name}</h1>
                </div>
                
                {displayTeam.name !== displayTeam.description && !displayTeam.name.toLowerCase().startsWith('team') && (
                  <p className="text-sm md:text-lg text-slate-300 leading-relaxed font-semibold">{displayTeam.name}</p>
                )}
                
                {/* Progress bar metrics */}
                <div className="pt-6 space-y-3 max-w-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-400 uppercase tracking-widest">Project Maturity</span>
                    <span className="font-black text-amber-400 text-lg">{team.progress}%</span>
                  </div>
                  <ProgressBar 
                    progress={team.progress} 
                    label="" 
                    size="lg" 
                    color={team.progress > 75 ? 'success' : team.progress > 25 ? 'default' : 'warning'} 
                  />
                </div>
              </div>
              
              {/* Right Column: Dynamic Leader Profile Shield */}
              <div className="relative lg:col-span-5 w-full max-w-md mx-auto animate-scale-in">
                <div className="absolute -inset-1.5 bg-gradient-to-br from-amber-500 to-indigo-600 rounded-3xl blur opacity-20"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-slate-900/95 backdrop-blur-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage 
                        src={team.leader.image} 
                        alt={team.leader.name}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <AvatarFallback className="w-full h-full text-5xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex items-center justify-center font-black">
                        {getInitials(team.leader.name)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  </div>
                  
                  {/* Leader details footer */}
                  <div className="p-6 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="text-amber-500 flex-shrink-0" size={16} />
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[10px] uppercase tracking-widest">
                        Team Leader
                      </Badge>
                    </div>
                    <h3 className="text-white font-black text-2xl tracking-tight">{team.leader.name}</h3>
                    {team.leader.role && <p className="text-slate-400 text-xs mt-1 font-semibold">{team.leader.role}</p>}
                    {team.leader.rating > 0 && (
                      <div className="mt-4 border-t border-slate-850 pt-3 flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mr-1">Rating:</span>
                        <StarRating rating={team.leader.rating} size="sm" interactive={false} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core content area - Asymmetrical 2-Column Desktop Grid Layout */}
        <section className="py-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column (2/3 width on desktop) - Project Technicalities */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Project Overview Card */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6 animate-fade-in">
                  <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Abstract</span>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Project Overview</h2>
                    </div>
                  </div>
                  <div className="prose prose-slate max-w-none text-slate-600 font-semibold leading-relaxed text-base md:text-lg">
                    <p>{displayTeam.longDescription}</p>
                  </div>
                </div>
                
                {/* 2. Video Presentation Section */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
                  <div className="pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Presentation Video</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Demo & Walkthrough</h3>
                  </div>
                  
                  {/* Premium mock-video framed screen wrapper */}
                  <div className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-slate-950 aspect-video border border-slate-200/50">
                    <video 
                      controls
                      className="w-full h-full object-contain"
                      poster={displayImages[0]}
                      preload="metadata"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.onerror = null; 
                        el.parentElement.innerHTML = `
                          <div class="flex flex-col items-center justify-center w-full h-full text-white p-8 text-center bg-slate-950 relative">
                            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent_75%)] opacity-35"></div>
                            <svg xmlns="http://www.w3.org/2050/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mb-4 text-amber-500 opacity-80 animate-pulse"><path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/><path d="m10 9 5 3-5 3z"/></svg>
                            <p class="text-lg font-black tracking-tight text-white z-10">Video Presentation Available Soon</p>
                            <p class="text-xs text-slate-400 max-w-sm mt-2 font-semibold z-10">The team is currently finalizing their digital engineering demonstration video.</p>
                          </div>
                        `;
                      }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                
                {/* 3. Presentation Slides Section */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] animate-fade-in">
                  <PresentationViewer teamId={team.id} teamName={displayTeam.name} section={section} />
                </div>
 
                {/* 4. Showcase Gallery Section */}
                {displayImages.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
                    <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Showcase</span>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Development Gallery</h2>
                      </div>
                      <div className="text-[10px] text-slate-550 font-bold bg-slate-50 border border-slate-100 rounded-full px-3 py-1 uppercase tracking-widest inline-block self-start sm:self-center">
                        {displayImages.length} image{displayImages.length !== 1 ? 's' : ''} available
                      </div>
                    </div>
                    
                    <div className={`grid gap-6 ${
                      displayImages.length === 1 ? 'grid-cols-1 max-w-xl mx-auto' :
                      displayImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                      'grid-cols-1 md:grid-cols-3'
                    }`}>
                      {displayImages.map((image, index) => (
                        <div 
                          key={index} 
                          className="overflow-hidden rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 group cursor-pointer relative"
                        >
                          <img 
                            src={image} 
                            alt={`Project image ${index + 1} for Team ${team.id}`} 
                            className="w-full h-auto aspect-video object-cover group-hover:scale-[1.03] transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column (1/3 width on desktop) - Team Members Panel & Stats */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Academic Credentials/Meta Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 animate-fade-in">
                  <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Academic credentials</h4>
                  <div className="space-y-3 font-semibold">
                    <div className="flex justify-between items-center text-sm py-1 border-b border-slate-800">
                      <span className="text-slate-450">Cohort Section</span>
                      <span className="font-black">EEE Section {team.id > 9 ? 'B' : 'A'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1 border-b border-slate-800">
                      <span className="text-slate-450">Institution</span>
                      <span className="font-black text-right">Lendi Institute</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="text-slate-450">Program</span>
                      <span className="font-black text-amber-400">Design Thinking</span>
                    </div>
                  </div>
                </div>

                {/* Team Members List */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-6">
                  <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Members</span>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">Meet the Cohort</h3>
                    </div>
                    <span className="text-xs font-bold bg-slate-50 border border-slate-100 rounded-full px-3 py-1 text-slate-500">
                      {team.members.length + 1} total
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Leader Profile item in List */}
                    <div className="flex items-center gap-4 p-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                      <Avatar className="w-11 h-11 border-2 border-amber-300 shadow-sm">
                        <AvatarImage src={team.leader.image} alt={team.leader.name} className="object-cover" />
                        <AvatarFallback className="text-sm bg-gradient-to-br from-amber-400 to-orange-500 text-white font-extrabold flex items-center justify-center">
                          {getInitials(team.leader.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-extrabold text-slate-900 truncate leading-tight">{team.leader.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge className="bg-amber-500/15 text-amber-600 border-0 text-[8px] px-1 py-0 uppercase font-black tracking-widest">Leader</Badge>
                          {team.leader.rating > 0 && <StarRating rating={team.leader.rating} size="xs" interactive={false} />}
                        </div>
                      </div>
                    </div>

                    {/* Member Profile items */}
                    {team.members.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex items-center gap-4 p-3 bg-slate-50/50 border border-slate-100/50 hover:border-slate-200 rounded-2xl transition-all duration-300"
                      >
                        <Avatar className="w-11 h-11 border border-slate-200">
                          <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                          <AvatarFallback className="text-sm bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-extrabold flex items-center justify-center">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-extrabold text-slate-900 truncate leading-tight">{member.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{member.role || "Research Cohort"}</p>
                          {member.rating > 0 && (
                            <div className="mt-1">
                              <StarRating rating={member.rating} size="xs" interactive={false} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamDetail;
