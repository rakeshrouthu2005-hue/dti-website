
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://lendi.org/GRCL/logo.png" 
                alt="Lendi Institute Logo" 
                className="h-12 w-auto filter brightness-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="text-lg font-bold text-white">
                DT&I EEE-A
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Design Thinking & Innovation in Electrical & Electronic Engineering Department A, 
              Lendi Institute of Engineering & Technology
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </NavLink>
              <NavLink to="/smart-assessment" className="text-gray-300 hover:text-white transition-colors text-sm">
                Smart Assessment
              </NavLink>
              <NavLink to="/teams" className="text-gray-300 hover:text-white transition-colors text-sm">
                Teams
              </NavLink>
              <NavLink to="/presentations" className="text-gray-300 hover:text-white transition-colors text-sm">
                Presentations
              </NavLink>
              <NavLink to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                About
              </NavLink>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Lendi Institute of Engineering & Technology</p>
                  <p>Vizianagaram, Andhra Pradesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Department of EEE-A</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Contact via Department</span>
              </div>
            </div>
          </div>

          {/* Institute Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Institute</h3>
            <div className="space-y-2">
              <a 
                href="https://lendi.edu.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://lendi.edu.in/academics/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <span>Academics</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>© {currentYear} Lendi Institute of Engineering & Technology. All rights reserved.</p>
              <p>Developed by Hemanth Kumar Chandaka - Department of EEE-A, II Year</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
