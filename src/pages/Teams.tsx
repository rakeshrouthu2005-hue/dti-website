
import React, { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import TeamCard from '@/components/ui/TeamCard';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTeamsData } from '@/hooks/useTeamsData';
import { useTeamsFilter } from '@/hooks/useTeamsFilter';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';

const Teams = () => {
  const { section } = useParams();
  const currentSection = section || 'eee-a';
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

      <main className="flex-grow pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <span className="inline-block py-1.5 px-3 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Student Projects Showcase
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Design Thinking & Innovation Teams
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Explore the diverse and innovative project portfolios that our talented teams are developing, tracking their progress from initial human-centered empathy stages to advanced functional prototyping.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Filters Section */}
          <div className="mb-16 max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search teams, members, or roll numbers..."
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent text-slate-900 placeholder:text-slate-400 font-semibold text-sm transition-all shadow-sm"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="min-w-[260px]">
                <select
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent bg-white text-slate-800 font-semibold text-sm transition-all cursor-pointer shadow-sm"
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

          {/* Teams Grid */}
          {filteredTeams.length > 0 ? (
            <div className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/60">
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl font-black text-lg ${currentSection === 'eee-a' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' : 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20'}`}>
                    {currentSection === 'eee-a' ? 'A' : 'B'}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      Electrical & Electronics Engineering — Section {currentSection === 'eee-a' ? 'A' : 'B'}
                    </h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Section {currentSection === 'eee-a' ? 'A' : 'B'} Projects Showcase</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: currentSection === 'eee-a' ? 10 : 12 }).map((_, idx) => {
                  const sectionTeams = filteredTeams.filter(t => t.section === currentSection);
                  const team = sectionTeams.find(t => t.id === idx + 1);
                  return team ? (
                    <TeamCard
                      key={`${currentSection}-team-${team.id}`}
                      id={team.id}
                      displayId={idx + 1}
                      name={team.description || team.name}
                      progress={team.progress}
                      section={currentSection}
                    />
                  ) : (
                    <TeamCard key={`${currentSection}-empty-${idx}`} placeholder />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-28 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-xl mx-auto p-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-800 font-bold tracking-tight">
                No teams match your search criteria
              </p>
              <p className="text-slate-400 mt-2 font-medium text-sm">Try adjusting your progress filter or changing your search terms.</p>
            </div>
          )}

          {/* Team Count */}
          <div className="mt-16 text-center text-sm text-slate-400 font-semibold border-t border-slate-200/50 pt-8">
            Displaying <span className="text-slate-900 font-bold">{filteredTeams.length}</span> of <span className="text-slate-900 font-bold">{teams.length}</span> active student teams
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Teams;
