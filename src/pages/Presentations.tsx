
import React, { useState, useEffect } from 'react';
import { getTeams, subscribeToTeamsUpdates } from '@/services/teamService';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Presentation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Presentations = () => {
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error loading teams:', error);
      }
    };

    // Set initial teams data
    loadTeams();
    
    // Subscribe to teams data updates
    const unsubscribe = subscribeToTeamsUpdates(() => {
      loadTeams();
    });
    
    return () => unsubscribe();
  }, []);
  
  // Filter teams based on search query
  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.leader.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Sort teams by name alphabetically
  const sortedTeams = [...filteredTeams].sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40">
      <PageSEO 
        title="Team Presentations"
        description="Access and download presentations from all Design Thinking & Innovation teams at Lendi Institute of Engineering and Technology."
        keywords="team presentations, project presentations, design thinking, innovation projects, EEE department, Lendi Institute"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center space-y-4">
            <div className="inline-block">
              <span className="inline-block py-1.5 px-3 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Academic Resources
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Project Presentations</h1>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Access and download presentations from all active Design Thinking & Innovation teams.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mx-auto mt-4"></div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-16 max-w-3xl mx-auto p-2 bg-white rounded-2xl shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)] border border-slate-100">
            <input
              type="text"
              placeholder="Search presentations by team name, project, or team leader..."
              className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400 font-semibold text-sm shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Presentations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTeams.length > 0 ? (
              sortedTeams.map((team) => {
                const presentationUrl = `/team_presentations/team_${team.id}_presentation.pptx`;
                
                return (
                  <div 
                    key={team.id} 
                    className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-amber-300/80 hover:scale-[1.01] hover:-translate-y-0.5 border border-slate-100/80 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-5 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl shadow-md">
                          <Presentation size={18} className="flex-shrink-0" />
                        </div>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 uppercase tracking-widest">
                          Team {team.id}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-white hover:bg-slate-50 text-slate-950 flex items-center gap-1 rounded-xl transition-all duration-200 hover:shadow-md font-extrabold text-[11px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(presentationUrl, '_blank');
                        }}
                      >
                        <Download size={14} className="text-amber-500 flex-shrink-0" />
                        <span>Download</span>
                      </Button>
                    </div>
                    
                    <div className="p-6 cursor-pointer group-hover:bg-slate-50/50 transition-colors duration-200 space-y-4 flex-grow" onClick={() => navigate(`/team/${team.id}`)}>
                      <h3 className="font-black text-lg text-slate-900 leading-snug group-hover:text-amber-600 transition-colors tracking-tight">{team.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-semibold">
                        {team.description}
                      </p>
                      
                      <div className="flex items-center text-xs text-slate-400 font-semibold pt-2 border-t border-slate-100/85">
                        <span>Team Leader:</span>
                        <span className="ml-1.5 text-slate-800 font-bold">{team.leader.name}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-100 px-6 py-4 flex justify-between items-center bg-slate-50/50">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-full uppercase tracking-widest">
                        {team.members.length + 1} members
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/team/${team.id}`)}
                        className="text-slate-950 hover:text-slate-950 hover:bg-slate-100 font-extrabold text-xs transition-all duration-200 rounded-xl"
                      >
                        View Team →
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-24 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-xl mx-auto p-12">
                <Presentation className="mx-auto text-slate-300 mb-4" size={60} />
                <p className="text-xl font-bold text-slate-800 tracking-tight">
                  No presentations match your search criteria
                </p>
                <p className="text-slate-400 mt-2 font-medium text-sm">Try adjusting your search terms</p>
              </div>
            )}
          </div>
          
          {/* Team Count */}
          <div className="mt-16 text-center text-sm text-slate-400 font-semibold border-t border-slate-200/50 pt-8">
            Showing <span className="text-slate-950 font-bold">{sortedTeams.length}</span> of <span className="text-slate-950 font-bold">{teams.length}</span> active student teams
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Presentations;
