
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Presentation } from 'lucide-react';
import { fetchTeamData } from '@/services/supabaseTeamService';

interface PresentationViewerProps {
  teamId: number;
  teamName: string;
}

const PresentationViewer: React.FC<PresentationViewerProps> = ({ teamId, teamName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [presentationUrl, setPresentationUrl] = useState<string>('');
  const [isSupabaseUrl, setIsSupabaseUrl] = useState(false);
  
  useEffect(() => {
    const loadPresentation = async () => {
      try {
        // First check for uploaded presentation in Supabase
        const teamData = await fetchTeamData(teamId);
        const uploadedPresentation = teamData?.media.find(m => m.media_type === 'presentation');
        
        if (uploadedPresentation?.file_url) {
          console.log('Found uploaded presentation:', uploadedPresentation.file_url);
          setPresentationUrl(uploadedPresentation.file_url);
          setIsSupabaseUrl(true);
        } else {
          console.log('No uploaded presentation found, using static file');
          // Fallback to static presentation file
          setPresentationUrl(`/team_presentations/team_${teamId}_presentation.pptx`);
          setIsSupabaseUrl(false);
        }
      } catch (error) {
        console.error('Error loading presentation:', error);
        // Fallback to static presentation file
        setPresentationUrl(`/team_presentations/team_${teamId}_presentation.pptx`);
        setIsSupabaseUrl(false);
      }
    };

    loadPresentation();
  }, [teamId]);
  
  // Use Microsoft Office Online viewer for better PPTX support
  // Handle URL construction differently for Supabase vs static files
  const fullPresentationUrl = isSupabaseUrl ? presentationUrl : `${window.location.origin}${presentationUrl}`;
  const previewUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullPresentationUrl)}`;
  
  // Fallback to Google Docs Viewer if Office Online fails
  const fallbackPreviewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullPresentationUrl)}&embedded=true`;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log('Primary viewer loading timed out, trying fallback');
        setShowFallback(true);
        setIsLoading(false);
      }
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.log('Iframe failed to load, showing fallback');
    setShowFallback(true);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-bold animate-fade-in">Project Presentation</h3>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => window.open(presentationUrl, '_blank')}
        >
          <Download size={16} />
          <span>Download PPT</span>
        </Button>
      </div>
      
      {/* Primary presentation viewer */}
      <div className="relative w-full rounded-lg shadow-lg bg-white border overflow-hidden animate-fade-in" style={{ height: '600px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading presentation...</p>
          </div>
        )}
        
        {!showFallback ? (
          <iframe 
            className="w-full h-full border-0"
            src={previewUrl}
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allowFullScreen
            title={`Team ${teamId} Presentation`}
          />
        ) : (
          <iframe 
            className="w-full h-full border-0"
            src={fallbackPreviewUrl}
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={() => {
              // If both viewers fail, show download option
              const container = document.querySelector('.presentation-fallback-container');
              if (container) {
                container.innerHTML = `
                  <div class="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div class="bg-blue-50 p-4 rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <path d="M13 2v7h7"></path>
                      </svg>
                    </div>
                    <h4 class="text-xl font-medium mb-2">Team ${teamId}: ${teamName}</h4>
                    <p class="text-muted-foreground mb-6">Unable to display presentation inline. Please download to view.</p>
                    <a 
                      href="${presentationUrl}" 
                      download 
                      class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download Presentation
                    </a>
                  </div>
                `;
              }
            }}
            allowFullScreen
            title={`Team ${teamId} Presentation (Fallback)`}
          />
        )}
        
        <div className="presentation-fallback-container" style={{ display: 'none' }}></div>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        You can scroll through the presentation above or download it for offline viewing.
      </p>
    </div>
  );
};

export default PresentationViewer;
