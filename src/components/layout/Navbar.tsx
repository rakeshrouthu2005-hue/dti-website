
import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavbarAdminLink from '../NavbarAdminLink';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4',
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/41483ebe-d661-4c71-9a57-26359e0d9b6d.png" 
            alt="Lendi Institute Logo" 
            className="h-10 w-auto"
            width="40"
            height="40"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="text-lg md:text-xl font-bold text-blue-900">
            DT&I EEE-A
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              'text-gray-700 hover:text-blue-900 font-medium',
              isActive && 'text-blue-900 font-semibold'
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/smart-assessment" 
            className={({ isActive }) => cn(
              'text-gray-700 hover:text-blue-900 font-medium flex items-center gap-1',
              isActive && 'text-blue-900 font-semibold'
            )}
          >
            <Lightbulb size={16} />
            Smart Assessment
          </NavLink>
          <NavLink 
            to="/teams" 
            className={({ isActive }) => cn(
              'text-gray-700 hover:text-blue-900 font-medium',
              isActive && 'text-blue-900 font-semibold'
            )}
          >
            Teams
          </NavLink>
          <NavLink 
            to="/student-login" 
            className={({ isActive }) => cn(
              'text-gray-700 hover:text-blue-900 font-medium flex items-center gap-1',
              isActive && 'text-blue-900 font-semibold'
            )}
          >
            <LogIn size={16} />
            Student Login
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => cn(
              'text-gray-700 hover:text-blue-900 font-medium',
              isActive && 'text-blue-900 font-semibold'
            )}
          >
            About
          </NavLink>
          <NavbarAdminLink />
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 text-gray-700 hover:text-blue-900"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
          <nav className="flex flex-col py-4 px-6 space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                'text-gray-700 hover:text-blue-900 font-medium py-2',
                isActive && 'text-blue-900 font-semibold'
              )}
            >
              Home
            </NavLink>
            <NavLink 
              to="/smart-assessment" 
              className={({ isActive }) => cn(
                'text-gray-700 hover:text-blue-900 font-medium py-2 flex items-center gap-2',
                isActive && 'text-blue-900 font-semibold'
              )}
            >
              <Lightbulb size={16} />
              Smart Assessment
            </NavLink>
            <NavLink 
              to="/teams" 
              className={({ isActive }) => cn(
                'text-gray-700 hover:text-blue-900 font-medium py-2',
                isActive && 'text-blue-900 font-semibold'
              )}
            >
              Teams
            </NavLink>
            <NavLink 
              to="/student-login" 
              className={({ isActive }) => cn(
                'text-gray-700 hover:text-blue-900 font-medium py-2 flex items-center gap-2',
                isActive && 'text-blue-900 font-semibold'
              )}
            >
              <LogIn size={16} />
              Student Login
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => cn(
                'text-gray-700 hover:text-blue-900 font-medium py-2',
                isActive && 'text-blue-900 font-semibold'
              )}
            >
              About
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
