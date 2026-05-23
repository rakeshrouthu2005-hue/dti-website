
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Save, Upload, Eye, FileVideo, FileText, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import { getTeamDashboardData, updateTeamDashboardData, uploadTeamMedia, type TeamDashboardData } from '@/services/dashboardService';

interface FileUploadPreview {
  file: File | null;
  preview: string | null;
  type: 'video' | 'document';
}

const TeamDashboard = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState<TeamDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // File upload states - only for video and PPT
  const [videoFile, setVideoFile] = useState<FileUploadPreview>({ file: null, preview: null, type: 'video' });
  const [pptFile, setPptFile] = useState<FileUploadPreview>({ file: null, preview: null, type: 'document' });

  // File input refs - only for video and PPT
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pptInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadTeamData = async () => {
      const currentTeamLeader = localStorage.getItem('currentTeamLeader');
      const currentTeamId = localStorage.getItem('currentTeamId');

      if (!currentTeamLeader || !teamId || currentTeamId !== teamId?.replace('team', '')) {
        navigate('/student-login');
        return;
      }

      try {
        const data = await getTeamDashboardData(teamId);
        if (data && data.username === currentTeamLeader) {
          setTeamData(data);
        } else {
          navigate('/student-login');
        }
      } catch (error) {
        console.error('Error loading team data:', error);
        navigate('/student-login');
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamData();
  }, [teamId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentTeamLeader');
    localStorage.removeItem('currentTeamId');
    navigate('/student-login');
  };

  const validateFile = (file: File, type: 'video' | 'document'): string | null => {
    const maxSizes = {
      video: 100 * 1024 * 1024, // 100MB
      document: 25 * 1024 * 1024 // 25MB
    };

    if (file.size > maxSizes[type]) {
      return `File too large. Maximum size for ${type}s is ${maxSizes[type] / (1024 * 1024)}MB`;
    }

    const allowedTypes = {
      video: ['video/mp4', 'video/webm', 'video/mov', 'video/quicktime'],
      document: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
    };

    if (!allowedTypes[type].includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes[type].join(', ')}`;
    }

    return null;
  };

  const handleFileSelect = (file: File, type: 'video' | 'document', setter: React.Dispatch<React.SetStateAction<FileUploadPreview>>) => {
    const error = validateFile(file, type);
    if (error) {
      alert(error);
      return;
    }

    const preview = type === 'document' ? file.name : URL.createObjectURL(file);
    setter({ file, preview, type });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, 'video', setVideoFile);
    }
  };

  const handlePptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, 'document', setPptFile);
    }
  };

  const handleSave = async () => {
    if (!teamData || !teamId) return;

    setUploading(true);
    setSaveMessage('Saving changes...');

    try {
      // Save basic team data first
      await updateTeamDashboardData(teamId, teamData);

      // Handle file uploads
      if (videoFile.file) {
        setSaveMessage('Uploading video...');
        const videoUrl = await uploadTeamMedia(teamId, videoFile.file, 'video');
        if (videoUrl) {
          setTeamData(prev => prev ? {
            ...prev,
            projectVideos: [videoUrl]
          } : null);
        }
      }

      if (pptFile.file) {
        setSaveMessage('Uploading presentation...');
        const pptUrl = await uploadTeamMedia(teamId, pptFile.file, 'presentation');
        if (pptUrl) {
          setTeamData(prev => prev ? {
            ...prev,
            presentations: [pptUrl]
          } : null);
        }
      }

      // Clear file upload states
      setVideoFile({ file: null, preview: null, type: 'video' });
      setPptFile({ file: null, preview: null, type: 'document' });

      setSaveMessage('All changes saved successfully!');
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('dashboardDataUpdated', { detail: { teamId } }));
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveMessage('Error saving changes. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setUploading(false);
    }
  };

  const clearFilePreview = (setter: React.Dispatch<React.SetStateAction<FileUploadPreview>>, inputRef: React.RefObject<HTMLInputElement>) => {
    setter({ file: null, preview: null, type: 'video' });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Team data not found. Please try logging in again.</p>
            <Button onClick={() => navigate('/student-login')} className="mt-4">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageSEO 
        title={`Dashboard - ${teamData.teamName}`}
        description="Team leader dashboard for managing project content"
        keywords="team dashboard, project management, team leader"
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Team Dashboard</h1>
              <p className="text-muted-foreground">Manage your team's project content</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate(`/team/${teamData.id}`)}>
                <Eye className="w-4 h-4 mr-2" />
                View Team Page
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {saveMessage && (
            <Alert className={saveMessage.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertDescription className={saveMessage.includes('Error') ? 'text-red-700' : 'text-green-700'}>
                {saveMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamData.teamName}
                  onChange={(e) => setTeamData(prev => prev ? { ...prev, teamName: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input
                  id="projectTitle"
                  value={teamData.projectTitle}
                  onChange={(e) => setTeamData(prev => prev ? { ...prev, projectTitle: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="abstract">Project Abstract</Label>
                <Textarea
                  id="abstract"
                  value={teamData.abstract}
                  onChange={(e) => setTeamData(prev => prev ? { ...prev, abstract: e.target.value } : null)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Video Presentation Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileVideo className="w-5 h-5" />
                Video Presentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="video-upload">Upload Team Video Presentation</Label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    ref={videoInputRef}
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => videoInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Video File
                  </Button>
                  {videoFile.preview && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {videoFile.file?.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => clearFilePreview(setVideoFile, videoInputRef)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {videoFile.preview && (
                  <div className="mt-4">
                    <video
                      src={videoFile.preview}
                      controls
                      className="w-full max-w-md h-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* PPT Presentation Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                PPT Presentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ppt-upload">Upload Project Presentation (PPT/PPTX)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    ref={pptInputRef}
                    id="ppt-upload"
                    type="file"
                    accept=".ppt,.pptx"
                    onChange={handlePptUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => pptInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose PPT File
                  </Button>
                  {pptFile.preview && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {pptFile.file?.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => clearFilePreview(setPptFile, pptInputRef)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleSave} 
              size="lg" 
              className="px-8"
              disabled={uploading}
            >
              <Save className="w-4 h-4 mr-2" />
              {uploading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamDashboard;
