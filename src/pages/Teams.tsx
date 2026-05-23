
import React, { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import TeamCard from '@/components/ui/TeamCard';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTeamsData } from '@/hooks/useTeamsData';
import { useTeamsFilter } from '@/hooks/useTeamsFilter';

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgress, setSelectedProgress] = useState<string>('all');
  
  // Use custom hooks for data management and scroll restoration
  const { teams, isLoading, error } = useTeamsData();
  const filteredTeams = useTeamsFilter({ teams, searchQuery, selectedProgress });
  useScrollPosition({ key: 'teams-page', delay: 50 });
  
  const progressOptions = [
    { value: 'all', label: 'All Progress' },
    { value: 'low', label: 'Early Stage (0-30%)' },
    { value: 'medium', label: 'Developing (31-70%)' },
    { value: 'high', label: 'Advanced (71-100%)' },
  ];

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgress(e.target.value);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-4">Error loading teams</p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageSEO 
        title="Teams"
        description="Explore innovative teams and their projects from the Design Thinking & Innovation program at Lendi Institute of Engineering and Technology."
        keywords="engineering teams, student projects, design thinking, innovation projects, EEE department, Lendi Institute"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              Projects
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">Design Thinking & Innovation Teams</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the diverse projects which our teams are developing, from concept to implementation.
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search teams, members, or roll numbers..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="min-w-[200px]">
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  value={selectedProgress}
                  onChange={handleProgressChange}
                >
                  {progressOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Teams Grid split into two sections: EEE A and EEE B */}
          {filteredTeams.length > 0 ? (
            <div className="space-y-12">
              {/* Section A */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">EEE A</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, idx) => {
                    const team = filteredTeams[idx];
                    return team ? (
                      <TeamCard
                        key={`eee-a-team-${team.id}`}
                        id={team.id}
                        name={team.name}
                        progress={team.progress}
                      />
                    ) : (
                      <TeamCard key={`eee-a-empty-${idx}`} placeholder />
                    );
                  })}
                </div>
              </section>

              {/* Section B */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">EEE B</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, idx) => {
                    const team = filteredTeams[idx + 9];
                    return team ? (
                      <TeamCard
                        key={`eee-b-team-${team.id}`}
                        id={team.id}
                        name={team.name}
                        progress={team.progress}
                      />
                    ) : (
                      <TeamCard key={`eee-b-empty-${idx}`} placeholder />
                    );
                  })}
                </div>
              </section>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No teams match your search criteria.
              </p>
            </div>
          )}
          
          {/* Team Count */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {filteredTeams.length} of {teams.length} teams
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Teams;
