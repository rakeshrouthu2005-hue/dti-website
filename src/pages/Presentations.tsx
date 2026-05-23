
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
    <div className="flex flex-col min-h-screen">
      <PageSEO 
        title="Team Presentations"
        description="Access and download presentations from all Design Thinking & Innovation teams at Lendi Institute of Engineering and Technology."
        keywords="team presentations, project presentations, design thinking, innovation projects, EEE department, Lendi Institute"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">Project Presentations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access and download presentations from all Design Thinking & Innovation teams.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-10 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search presentations by team name, project, or team leader..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Presentations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTeams.length > 0 ? (
              sortedTeams.map((team) => {
                const presentationUrl = `/team_presentations/team_${team.id}_presentation.pptx`;
                
                return (
                  <div 
                    key={team.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl"
                  >
                    <div className="bg-blue-50 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Presentation className="text-blue-600" size={20} />
                        <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">
                          Team {team.id}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(presentationUrl, '_blank');
                        }}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </Button>
                    </div>
                    
                    <div className="p-4 cursor-pointer" onClick={() => navigate(`/team/${team.id}`)}>
                      <h3 className="font-medium text-lg mb-2">{team.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {team.description}
                      </p>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Team Leader:</span>
                        <span className="ml-1">{team.leader.name}</span>
                      </div>
                    </div>
                    
                    <div className="border-t p-3 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {team.members.length + 1} team members
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/team/${team.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Team
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No presentations match your search criteria.
                </p>
              </div>
            )}
          </div>
          
          {/* Team Count */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {sortedTeams.length} of {teams.length} teams
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Presentations;
