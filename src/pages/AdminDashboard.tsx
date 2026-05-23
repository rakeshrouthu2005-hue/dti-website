
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useAdminRealtime } from '@/hooks/useAdminRealtime';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Save, Percent, Star, ChevronDown, ChevronUp, Users, Crown } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

const AdminDashboard = () => {
  const [progressValues, setProgressValues] = useState<Record<number, number>>({});
  const [expandedTeams, setExpandedTeams] = useState<Record<number, boolean>>({});
  const [savingProgress, setSavingProgress] = useState<Record<number, boolean>>({});
  const [savingRating, setSavingRating] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    teams, 
    isLoading, 
    error, 
    updateTeamProgress, 
    updateMemberRating,
    updateLeaderRating
  } = useAdminRealtime();

  // Check if admin is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast({
        title: 'Access denied',
        description: 'You need to login to access this page',
        variant: 'destructive',
      });
      navigate('/admin');
    }
  }, [navigate, toast]);

  // Initialize progress values when teams data loads
  useEffect(() => {
    if (teams.length > 0) {
      const initialValues: Record<number, number> = {};
      teams.forEach(team => {
        initialValues[team.id] = team.progress;
      });
      setProgressValues(initialValues);
      
      console.log('Teams loaded:', teams);
      console.log('Total teams:', teams.length);
      teams.forEach(team => {
        console.log(`Team ${team.id}: ${team.members.length} members + 1 leader = ${team.members.length + 1} total`);
      });
    }
  }, [teams]);

  const handleProgressChange = (teamId: number, newValue: number[]) => {
    setProgressValues(prev => ({
      ...prev,
      [teamId]: newValue[0]
    }));
  };

  const handleSave = async (teamId: number) => {
    setSavingProgress(prev => ({ ...prev, [teamId]: true }));
    
    try {
      const success = await updateTeamProgress(teamId, progressValues[teamId]);
      
      if (success) {
        toast({
          title: 'Progress updated',
          description: `Team ${teamId}'s progress has been updated to ${progressValues[teamId]}%`,
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update team progress',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to update team progress',
        variant: 'destructive',
      });
    } finally {
      setSavingProgress(prev => ({ ...prev, [teamId]: false }));
    }
  };

  const handleRatingChange = async (memberId: string, rating: number) => {
    console.log(`AdminDashboard: Handling rating change for ${memberId} to ${rating}`);
    setSavingRating(prev => ({ ...prev, [memberId]: true }));
    
    try {
      const success = await updateMemberRating(memberId, rating);
      
      if (success) {
        // Dispatch custom event to notify other pages
        window.dispatchEvent(new CustomEvent('adminRatingUpdated'));
        
        toast({
          title: 'Rating updated',
          description: `Member rating has been updated to ${rating} stars`,
          variant: 'default',
        });
      } else {
        console.error(`Failed to save rating for member ${memberId}`);
        toast({
          title: 'Error',
          description: 'Failed to update member rating. Please check your connection and try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving rating:', error);
      toast({
        title: 'Error',
        description: `Failed to update member rating: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setSavingRating(prev => ({ ...prev, [memberId]: false }));
    }
  };

  const handleLeaderRatingChange = async (teamId: number, rating: number) => {
    console.log(`AdminDashboard: Handling leader rating change for team ${teamId} to ${rating}`);
    const leaderKey = `leader_${teamId}`;
    setSavingRating(prev => ({ ...prev, [leaderKey]: true }));
    
    try {
      const success = await updateLeaderRating(teamId, rating);
      
      if (success) {
        // Dispatch custom event to notify other pages
        window.dispatchEvent(new CustomEvent('adminRatingUpdated'));
        
        toast({
          title: 'Leader rating updated',
          description: `Team leader rating has been updated to ${rating} stars`,
          variant: 'default',
        });
      } else {
        console.error(`Failed to save leader rating for team ${teamId}`);
        toast({
          title: 'Error',
          description: 'Failed to update leader rating. Please check your connection and try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving leader rating:', error);
      toast({
        title: 'Error',
        description: `Failed to update leader rating: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setSavingRating(prev => ({ ...prev, [leaderKey]: false }));
    }
  };

  const toggleTeamExpand = (teamId: number) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
      variant: 'default',
    });
    navigate('/admin');
  };

  // Calculate total members for a team (leader + members)
  const getTotalMemberCount = (team: any) => {
    return team.members.length + 1; // +1 for the leader
  };

  if (error) {
    return (
      <>
        <Helmet>
          <title>Admin Dashboard | DT&I EEE A</title>
          <meta name="description" content="Admin dashboard for managing team progress" />
        </Helmet>
        
        <Navbar />
        
        <main className="flex-grow pt-24 pb-20 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Card className="mb-8">
              <CardContent className="p-6">
                <p className="text-red-600">Error: {error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | DT&I EEE A</title>
        <meta name="description" content="Admin dashboard for managing team progress" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Welcome to the admin dashboard. Here you can update the progress of each team's project and rate individual team members. Changes are synchronized in real-time across all devices.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Team Structure Summary:</h3>
                <p className="text-blue-800 text-sm">
                  • Total Teams: {teams.length}<br/>
                  • Team 1 & 2: 5 members each (1 Leader + 4 Members)<br/>
                  • Teams 3-17: 4 members each (1 Leader + 3 Members)
                </p>
              </div>
            </CardContent>
          </Card>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-card shadow-lg rounded-lg border border-border overflow-hidden">
              <Table>
                <TableCaption>Teams and their project progress - Real-time synchronized across all devices</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Current Progress</TableHead>
                    <TableHead>New Progress</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Team Members</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <React.Fragment key={team.id}>
                      <TableRow className="group">
                        <TableCell className="font-medium">{team.id}</TableCell>
                        <TableCell>{team.team_name}</TableCell>
                        <TableCell>{team.project_title}</TableCell>
                        <TableCell>{team.progress}%</TableCell>
                        <TableCell className="w-64">
                          <div className="flex flex-col space-y-1">
                            <div className="flex w-full justify-between items-center text-xs text-muted-foreground">
                              <span>0%</span>
                              <span>50%</span>
                              <span>100%</span>
                            </div>
                            <Slider
                              value={[progressValues[team.id] || team.progress]}
                              max={100}
                              step={1}
                              onValueChange={(value) => handleProgressChange(team.id, value)}
                            />
                            <div className="flex items-center justify-center mt-1">
                              <Percent size={14} className="mr-1" />
                              <span className="text-sm font-medium">{progressValues[team.id] || team.progress}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleSave(team.id)}
                            size="sm" 
                            disabled={team.progress === (progressValues[team.id] || team.progress) || savingProgress[team.id]}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            {savingProgress[team.id] ? 'Saving...' : 'Save'}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleTeamExpand(team.id)}
                            className="flex items-center gap-1"
                          >
                            {expandedTeams[team.id] ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                            Rate Members ({getTotalMemberCount(team)})
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedTeams[team.id] && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-muted/30">
                            <div className="py-4 px-2">
                              <div className="flex items-center gap-2 mb-4">
                                <Users className="h-5 w-5 text-blue-500" />
                                <h4 className="text-lg font-semibold text-foreground">
                                  Team {team.id} Members - Performance Rating ({getTotalMemberCount(team)} Total)
                                </h4>
                              </div>
                              
                              <div className="grid gap-4">
                                {/* Team Leader */}
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-2">
                                        <Crown className="h-5 w-5 text-yellow-600" />
                                        <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Team Leader</span>
                                      </div>
                                      <div>
                                        <span className="font-bold text-foreground text-lg">
                                          {team.leader_username}
                                        </span>
                                        {savingRating[`leader_${team.id}`] && (
                                          <span className="text-xs text-muted-foreground ml-2">Saving...</span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground">Performance:</span>
                                      <StarRating 
                                        rating={team.leader_rating || 0}
                                        onChange={(newRating) => handleLeaderRatingChange(team.id, newRating)}
                                        size="md"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Team Members */}
                                {team.members.length > 0 ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4 text-blue-500" />
                                      <span className="text-sm font-medium text-muted-foreground">
                                        Team Members ({team.members.length})
                                      </span>
                                    </div>
                                    {team.members.map((member, index) => (
                                      <div 
                                        key={member.id}
                                        className="bg-background/80 rounded-lg p-3 border border-border/50 hover:bg-background/90 transition-colors"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                              <span className="text-sm font-medium text-blue-600">
                                                {index + 1}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="font-medium text-foreground">
                                                {member.name}
                                              </span>
                                              <span className="text-xs text-muted-foreground ml-2 bg-gray-100 px-2 py-1 rounded">
                                                Member
                                              </span>
                                              {savingRating[member.id] && (
                                                <span className="text-xs text-muted-foreground ml-2">Saving...</span>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">Performance:</span>
                                            <StarRating 
                                              rating={member.rating || 0}
                                              onChange={(newRating) => handleRatingChange(member.id, newRating)}
                                              size="md"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No team members found for this team.</p>
                                    <p className="text-xs mt-1">Only the team leader is registered.</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AdminDashboard;
