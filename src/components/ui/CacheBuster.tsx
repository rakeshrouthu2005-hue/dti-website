
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CacheBusterProps {
  version: string;
  checkInterval?: number;
}

const CacheBuster: React.FC<CacheBusterProps> = ({ 
  version,
  checkInterval = 60 * 60 * 1000 // 1 hour by default
}) => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  
  useEffect(() => {
    const checkForUpdates = () => {
      fetch(`/version.json?cache=${Date.now()}`)
        .then(response => response.json())
        .then(data => {
          if (data.version !== version) {
            setUpdateAvailable(true);
          }
        })
        .catch(err => console.error('Failed to check for updates:', err));
    };
    
    // Check immediately
    checkForUpdates();
    
    // Set up periodic checks
    const interval = setInterval(checkForUpdates, checkInterval);
    
    return () => clearInterval(interval);
  }, [version, checkInterval]);
  
  useEffect(() => {
    if (updateAvailable) {
      toast("Update Available", {
        description: "A new version of the site is available.",
        action: {
          label: "Update Now",
          onClick: () => window.location.reload()
        },
        duration: 60000, // Keep notification visible for a minute
      });
    }
  }, [updateAvailable]);
  
  if (!updateAvailable) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="secondary" 
        className="shadow-lg" 
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Update Available
      </Button>
    </div>
  );
};

export default CacheBuster;
