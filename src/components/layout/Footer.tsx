
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-200 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle geometric glowing grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      {/* Top Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-indigo-600 to-amber-500"></div>

      {/* Main Footer */}
      <div className="py-20 px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 shadow-inner">
                  <img 
                    src="/lovable-uploads/41483ebe-d661-4c71-9a57-26359e0d9b6d.png" 
                    alt="Lendi Institute Logo" 
                    className="h-12 w-auto filter brightness-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://lendi.org/GRCL/logo.png";
                    }}
                  />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">LENDI INSTITUTE</div>
                  <div className="text-xl font-black text-white tracking-tight">DT&I <span className="text-amber-500">EEE-A</span></div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Empowering future engineers through creative, human-centered problem-solving frameworks at Lendi Institute of Engineering & Technology.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-5 lg:pl-8">
              <h3 className="font-bold text-white text-sm tracking-wider uppercase border-b border-slate-900 pb-2.5">Navigation</h3>
              <nav className="flex flex-col space-y-3">
                <NavLink to="/" className="text-slate-400 hover:text-amber-400 transition-all duration-300 text-sm font-semibold flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform">Home</span>
                </NavLink>
                <NavLink to="/smart-assessment" className="text-slate-400 hover:text-amber-400 transition-all duration-300 text-sm font-semibold flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform">Smart Assessment</span>
                </NavLink>
                <NavLink to="/teams" className="text-slate-400 hover:text-amber-400 transition-all duration-300 text-sm font-semibold flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform">Teams</span>
                </NavLink>
                <NavLink to="/about" className="text-slate-400 hover:text-amber-400 transition-all duration-300 text-sm font-semibold flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1.5 transition-transform">About</span>
                </NavLink>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="font-bold text-white text-base tracking-wide uppercase border-b border-slate-900 pb-2">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 group">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-amber-500 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-slate-400 text-sm font-medium leading-relaxed">
                    <p className="font-bold text-slate-300">Lendi Institute</p>
                    <p className="text-xs">Vizianagaram, AP, India</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3.5 group">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-amber-500 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400 text-sm font-semibold">Dept. of EEE-A</span>
                </div>
                <div className="flex items-center space-x-3.5 group">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-amber-500 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400 text-sm font-semibold">Academic Portal</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-5">
              <h3 className="font-bold text-white text-base tracking-wide uppercase border-b border-slate-900 pb-2">Resources</h3>
              <div className="space-y-3">
                <a 
                  href="https://lendi.edu.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-400 hover:text-amber-500 transition-all duration-300 text-sm font-semibold group"
                >
                  <span>College Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </a>
                <a 
                  href="https://lendi.edu.in/academics/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-400 hover:text-amber-500 transition-all duration-300 text-sm font-semibold group"
                >
                  <span>Academics</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </a>
                <a 
                  href="https://lendi.edu.in/departments/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-400 hover:text-amber-500 transition-all duration-300 text-sm font-semibold group"
                >
                  <span>EEE Department</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="py-8 px-6 border-t border-slate-900/60 bg-slate-950/95 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-400 text-center md:text-left leading-relaxed">
            <p className="font-semibold text-slate-300">© {currentYear} Lendi Institute of Engineering & Technology. All rights reserved.</p>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">Developed by Hemanth Kumar Chandaka — Department of EEE-A, II Year</p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <a 
              href="#" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 hover:bg-amber-500 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:shadow-lg transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 hover:bg-amber-500 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:shadow-lg transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 hover:bg-amber-500 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:shadow-lg transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
