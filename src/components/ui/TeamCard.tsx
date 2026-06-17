
import React, { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ProgressBar from './ProgressBar';
import { Button } from '@/components/ui/button';
import { getTeamById, subscribeToSupabaseUpdates } from '@/services/teamService';
import { Award, Users } from 'lucide-react';
import StarRating from './StarRating';
import { supabase } from '@/integrations/supabase/client';

interface TeamCardProps {
  id: number;
  name: string;
  progress: number;
  className?: string;
  placeholder?: boolean;
  displayId?: number;
}

// Memoize the TeamCard component to prevent unnecessary re-renders
const TeamCard: React.FC<TeamCardProps> = memo(({ id, name, progress: initialProgress, className, placeholder, displayId }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(initialProgress);
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Subscribe to team updates and load team data
  useEffect(() => {
    let isMounted = true;
    
    const loadTeamData = async () => {
      try {
        const teamData = await getTeamById(id);
        if (teamData && isMounted) {
          // Fetch ratings from database
          const { data: dbTeam } = await supabase
            .from('teams')
            .select('leader_rating')
            .eq('id', id)
            .single();

          const { data: dbMembers } = await supabase
            .from('team_members')
            .select('*')
            .eq('team_id', id);

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
              dbM.team_id === id && 
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
          setProgress(teamData.progress);
        }
      } catch (error) {
        console.error('Error loading team data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const updateTeam = async () => {
      if (!isMounted) return;
      try {
        const updatedTeam = await getTeamById(id);
        if (updatedTeam && isMounted) {
          // Fetch updated ratings from database
          const { data: dbTeam } = await supabase
            .from('teams')
            .select('leader_rating')
            .eq('id', id)
            .single();

          const { data: dbMembers } = await supabase
            .from('team_members')
            .select('*')
            .eq('team_id', id);

          // Create member ratings map
          const memberRatingsMap = new Map<string, number>();
          dbMembers?.forEach(member => {
            memberRatingsMap.set(member.id, member.rating || 0);
          });
          
          // Update team data with ratings from database
          const teamWithRatings = {
            ...updatedTeam,
            leader: {
              ...updatedTeam.leader,
              rating: dbTeam?.leader_rating || 0
            },
            members: updatedTeam.members.map((member, index) => {
              // Find corresponding database member by EXACT name matching only
              const dbMember = dbMembers?.find(dbM => 
                dbM.team_id === id && 
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
          
          setTeam(teamWithRatings);
          setProgress(updatedTeam.progress);
        }
      } catch (error) {
        console.error('Error updating team data:', error);
      }
    };
    
    // Load initial team data
    loadTeamData();
    
    // Subscribe to real-time updates from Supabase
    const unsubscribe = subscribeToSupabaseUpdates(updateTeam);
    
    // Listen for rating updates from admin dashboard
    const handleRatingUpdate = () => {
      updateTeam();
    };
    
    const handleLeaderRatingUpdate = (event: CustomEvent) => {
      if (event.detail?.teamId === id) {
        updateTeam();
      }
    };
    
    window.addEventListener('adminRatingUpdated', handleRatingUpdate);
    window.addEventListener('leaderRatingUpdated', handleLeaderRatingUpdate as EventListener);
    
    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('adminRatingUpdated', handleRatingUpdate);
      window.removeEventListener('leaderRatingUpdated', handleLeaderRatingUpdate as EventListener);
    };
  }, [id]);

  // Optimize click handler to prevent unnecessary re-renders
  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Save current scroll position before navigation
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    sessionStorage.setItem('scroll-teams-page', scrollPosition.toString());
    navigate(`/team/${id}`);
  }, [navigate, id]);

  // Render placeholder card when slot is empty
  if (placeholder) {
    return (
      <div className={cn('bg-slate-50/20 p-8 rounded-2xl border border-dashed border-slate-200/80 flex flex-col items-center justify-center opacity-50 hover:opacity-80 transition-all duration-300 min-h-[440px]', className)}>
        <div className="text-center space-y-3">
          <div className="h-12 w-12 bg-white border border-slate-100 rounded-2xl mb-2 mx-auto flex items-center justify-center text-slate-350 shadow-sm">
            <Users size={20} />
          </div>
          <h4 className="font-bold text-slate-500 tracking-tight text-sm">Vacant Slot</h4>
          <p className="text-[11px] text-slate-400 font-semibold">No team portfolio assigned yet</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className={cn(
          'bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse min-h-[440px]',
          className
        )}
      >
        <div className="space-y-4">
          <div className="min-h-[40px] space-y-2">
            <div className="h-3 bg-slate-100 rounded w-1/4"></div>
            <div className="h-5 bg-slate-100 rounded w-3/4"></div>
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-16 bg-slate-50 rounded-xl"></div>
            <div className="h-20 bg-slate-50 rounded-xl"></div>
          </div>
          <div className="h-2 bg-slate-100 rounded w-full pt-1"></div>
          <div className="h-9 bg-slate-100 rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100/80 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-amber-300 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 overflow-hidden group flex flex-col justify-between min-h-[440px]',
        className
      )}
      onClick={handleCardClick}
    >
      <div className="p-6 space-y-5 flex-grow">
        {/* Team Header */}
        <div className="min-h-[50px] flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1.5">Team {displayId || id}</p>
            <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-amber-600 transition-colors tracking-tight">{name}</h3>
          </div>
        </div>
        
        {team && (
          <div className="space-y-4 text-sm">
            {/* Leader Section */}
            <div className="bg-gradient-to-r from-amber-500/5 to-amber-500/0 rounded-xl p-3.5 border border-amber-500/10 shadow-inner">
              <div className="flex items-center gap-2 mb-1.5">
                <Award size={15} className="text-amber-500 flex-shrink-0" />
                <span className="font-extrabold text-slate-800 tracking-tight">{team.leader.name}</span>
              </div>
              {team.leader.role && <p className="text-[11px] text-slate-400 font-semibold ml-5">{team.leader.role}</p>}
              {team.leader.rating && team.leader.rating > 0 && (
                <div className="ml-5 mt-2 flex items-center">
                  <StarRating rating={team.leader.rating} size="sm" interactive={false} />
                </div>
              )}
            </div>

            {/* Team Members Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-1">
                <Users size={14} className="text-slate-400 flex-shrink-0" />
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Team Cohort</span>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {Array.from({ length: 8 }).map((_, i) => {
                  const member = team.members && team.members[i];
                  return (
                    <li 
                      key={member?.id || `vacant-${i}`} 
                      className={cn(
                        'truncate rounded-xl px-3 py-2 text-xs flex items-center justify-between border transition-all',
                        member 
                          ? 'bg-slate-50/50 border-slate-100 text-slate-700 font-semibold hover:bg-slate-50' 
                          : 'border-dashed border-slate-100 text-slate-350 bg-transparent'
                      )}
                    >
                      <span className="truncate capitalize">{member ? String(member.name).toLowerCase() : 'vacant'}</span>
                      {member?.rating && member.rating > 0 && (
                        <span className="ml-1 flex-shrink-0">
                          <StarRating rating={member.rating} size="xs" interactive={false} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Progress & CTA Area at Card Bottom */}
      <div className="p-6 pt-0 border-t border-slate-50 mt-auto space-y-4">
        {/* Progress Section */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Maturity</span>
            <span className="text-xs font-extrabold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{progress}%</span>
          </div>
          <ProgressBar 
            progress={progress} 
            size="sm" 
            color={progress > 75 ? 'success' : progress > 25 ? 'default' : 'warning'} 
          />
        </div>
        
        {/* CTA Button */}
        <Button 
          variant="outline"
          className="w-full font-bold rounded-xl border border-slate-200 text-slate-800 bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300 shadow-sm"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            sessionStorage.setItem('scroll-teams-page', scrollPosition.toString());
            navigate(`/team/${id}`);
          }}
        >
          View Project Portfolio →
        </Button>
      </div>
    </div>
  );
});

TeamCard.displayName = 'TeamCard';

export default TeamCard;
