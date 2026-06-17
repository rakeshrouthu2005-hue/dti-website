
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
        'fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-500',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-slate-100/80' 
          : 'bg-white/60 backdrop-blur-md py-5 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="relative overflow-hidden rounded-xl bg-slate-50 p-1 border border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
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
          </div>
          <div className="flex flex-col">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">LENDI INSTITUTE</div>
            <div className="text-base md:text-lg font-black text-slate-900 leading-none tracking-tight">DT&I <span className="text-amber-500">EEE-A</span></div>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              'nav-link',
              isActive && 'active'
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/smart-assessment" 
            className={({ isActive }) => cn(
              'nav-link flex items-center gap-1.5',
              isActive && 'active'
            )}
          >
            <Lightbulb size={15} className="text-amber-500" />
            <span>Smart Assessment</span>
          </NavLink>
          <NavLink 
            to="/teams" 
            className={({ isActive }) => cn(
              'nav-link',
              isActive && 'active'
            )}
          >
            Teams
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => cn(
              'nav-link',
              isActive && 'active'
            )}
          >
            About
          </NavLink>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl transition-all"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl border-t border-slate-100 mt-2 mx-4 rounded-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-5">
          <nav className="flex flex-col py-4 px-6 space-y-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 block',
                isActive 
                  ? 'text-slate-950 bg-slate-50 border-l-4 border-amber-500 font-bold' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/50'
              )}
            >
              Home
            </NavLink>
            <NavLink 
              to="/smart-assessment" 
              className={({ isActive }) => cn(
                'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                isActive 
                  ? 'text-slate-950 bg-slate-50 border-l-4 border-amber-500 font-bold' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/50'
              )}
            >
              <Lightbulb size={16} className="text-amber-500" />
              <span>Smart Assessment</span>
            </NavLink>
            <NavLink 
              to="/teams" 
              className={({ isActive }) => cn(
                'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 block',
                isActive 
                  ? 'text-slate-950 bg-slate-50 border-l-4 border-amber-500 font-bold' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/50'
              )}
            >
              Teams
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => cn(
                'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 block',
                isActive 
                  ? 'text-slate-950 bg-slate-50 border-l-4 border-amber-500 font-bold' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/50'
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
