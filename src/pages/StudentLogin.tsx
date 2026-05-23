
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';

const StudentLogin = () => {
  const [selectedTeamLeader, setSelectedTeamLeader] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const teamLeaders = [
    { id: '23KD1A0201', team: 1 },
    { id: '23KD1A0214', team: 2 },
    { id: '23KD1A0234', team: 3 },
    { id: '23KD1A0253', team: 4 },
    { id: '23KD1A0238', team: 5 },
    { id: '23KD1A0246', team: 6 },
    { id: '23KD1A0233', team: 7 },
    { id: '23KD1A0224', team: 8 },
    { id: '23KD1A0251', team: 9 },
    { id: '23KD1A0222', team: 10 },
    { id: '24KD5A0202', team: 11 },
    { id: '23KD1A0237', team: 12 },
    { id: '23KD1A0219', team: 13 },
    { id: '23KD1A0257', team: 14 },
    { id: '23KD1A0220', team: 15 },
    { id: '23KD1A0239', team: 16 },
    { id: '23KD1A0264', team: 17 }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedTeamLeader || !password) {
      setError('Please select your Team Leader ID and enter password');
      return;
    }

    if (password !== 'team@123') {
      setError('Invalid password');
      return;
    }

    const teamLeader = teamLeaders.find(leader => leader.id === selectedTeamLeader);
    if (teamLeader) {
      // Store login info in localStorage for simple session management
      localStorage.setItem('currentTeamLeader', selectedTeamLeader);
      localStorage.setItem('currentTeamId', teamLeader.team.toString());
      navigate(`/dashboard/team${teamLeader.team}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageSEO 
        title="Student Login"
        description="Team leaders login to manage their project content"
        keywords="student login, team leader, project management"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6 bg-gray-50">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Team Leader Login</CardTitle>
              <CardDescription>
                Access your team dashboard to manage project content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamLeader" className="flex items-center gap-2">
                    <User size={16} />
                    Team Leader ID
                  </Label>
                  <Select value={selectedTeamLeader} onValueChange={setSelectedTeamLeader}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Team Leader ID" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamLeaders.map((leader) => (
                        <SelectItem key={leader.id} value={leader.id}>
                          {leader.id} (Team {leader.team})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock size={16} />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Login to Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentLogin;
