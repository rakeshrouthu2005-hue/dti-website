
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mentorData } from '@/data/teamsData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import { ChevronRight, Lightbulb, Users, Award, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Optimized animation effect - reduced complexity
  const initializeAnimations = useCallback(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-fade-in');
        element.classList.remove('opacity-0');
      }, 100 * index); // Reduced delay for faster loading
    });
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(initializeAnimations);
  }, [initializeAnimations]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <PageSEO 
        title="Home" 
        description="Explore innovative solutions to engineering challenges through creative problem-solving and human-centered design at Lendi Institute's Design Thinking & Innovation program." 
        keywords="design thinking, innovation, electrical engineering, EEE, Lendi Institute, engineering projects, creative solutions" 
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Modern, Extremely Premium Design */}
        <section className="relative bg-slate-950 text-white pt-36 pb-28 md:pt-44 md:pb-36 px-6 overflow-hidden border-b border-slate-900 glow-mesh-combo mt-16">
          {/* Decorative mesh vector grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          <div className="relative max-w-7xl mx-auto z-10">
            {/* Lendi Logo Container */}
            <div className="flex justify-center mb-8 animate-on-load opacity-0">
              <div className="relative p-2.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/41483ebe-d661-4c71-9a57-26359e0d9b6d.png" 
                  alt="Lendi Institute of Engineering and Technology Logo" 
                  className="h-20 md:h-24 w-auto filter brightness-110" 
                  loading="eager" 
                  width="96"
                  height="96"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }} 
                />
              </div>
            </div>
            
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest animate-on-load opacity-0">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  Department Innovation Hub
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 animate-on-load opacity-0 leading-tight tracking-tight">
                  Design Thinking <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-black">&</span> Innovation
                </h1>
              </div>

              <div className="space-y-4 animate-on-load opacity-0 max-w-2xl mx-auto">
                <p className="text-base md:text-xl text-slate-300 font-extrabold tracking-wide border-y border-slate-800/80 py-2 inline-block px-4">
                  Department of Electrical & Electronics Engineering
                </p>
                <p className="text-sm md:text-lg text-slate-400 leading-relaxed font-semibold">
                  Empowering future engineers through innovative problem-solving, human-centered design frameworks, and transformative academic project achievements.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-on-load opacity-0">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/smart-assessment')} 
                  className="bg-amber-500 hover:bg-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] text-slate-950 px-8 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                  Smart Assessment Project
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/teams')} 
                  className="border border-slate-700 hover:border-white text-white hover:bg-white/5 px-8 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                  Explore Teams
                </Button>
              </div>
            </div>
            
            {/* Elegant Hero Metrics Showcase */}
            <div className="mt-20 grid grid-cols-3 max-w-3xl mx-auto p-8 bg-slate-900/50 backdrop-blur-lg rounded-3xl border border-slate-800/80 text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-on-load opacity-0">
              <div className="border-r border-slate-800/80 px-2">
                <p className="text-3xl md:text-5xl font-black text-white tracking-tight">24</p>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Student Teams</p>
              </div>
              <div className="border-r border-slate-800/80 px-2">
                <p className="text-3xl md:text-5xl font-black text-amber-500 tracking-tight">140+</p>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">EEE Undergrads</p>
              </div>
              <div className="px-2">
                <p className="text-3xl md:text-5xl font-black text-white tracking-tight">2</p>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">EEE Sections</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced Design */}
        <section className="py-24 px-6 md:px-10 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <div className="inline-block">
                <span className="inline-block py-1.5 px-3 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-widest">
                  Our Methodology
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Our Approach to Innovation
              </h2>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-semibold">
                We follow a structured, human-centered approach to design thinking that empowers students to solve real-world engineering challenges
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group p-8 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-slate-200 border border-slate-100/80 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-amber-600 transition-colors">Creative Problem Solving</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">Innovative, out-of-the-box approaches to complex electrical engineering problems using design thinking principles.</p>
              </div>
              
              {/* Card 2 */}
              <div className="group p-8 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-slate-200 border border-slate-100/80 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-amber-600 transition-colors">Collaborative Learning</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">Fostering strong teamwork dynamics, active peer mentorship, leadership responsibilities, and collaborative development.</p>
              </div>
              
              {/* Card 3 */}
              <div className="group p-8 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-slate-200 border border-slate-100/80 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-amber-600 transition-colors">Excellence in Design</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">Rigorous evaluation and celebration of high-performing engineering prototypes and functional team outputs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Section - Refined Academic Profile */}
        <section className="py-24 px-6 md:px-10 bg-slate-50 relative overflow-hidden">
          {/* Ambient glow backgrounds */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-20 space-y-3">
              <div className="inline-block">
                <span className="inline-block py-1.5 px-3 bg-slate-900 text-slate-100 border border-slate-800 rounded-full text-xs font-bold uppercase tracking-widest">
                  Leadership spotlight
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Meet Our Mentor
              </h2>
              <p className="text-base md:text-lg text-slate-500 font-semibold">
                Under the expert guidance of our distinguished EEE department faculty mentor
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-slate-700 rounded-full mx-auto mt-4"></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
                {/* Image Column */}
                <div className="md:col-span-5 flex items-center justify-center p-8 md:p-10 md:bg-slate-50/50 border-r border-slate-100">
                  <div className="relative w-full max-w-sm">
                    {/* Glow outline wrapper */}
                    <div className="absolute -inset-1.5 bg-gradient-to-br from-amber-500 to-indigo-600 rounded-2xl blur opacity-20"></div>
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md bg-white border border-slate-100">
                      <img 
                        src={mentorData.image} 
                        alt={`${mentorData.name} - ${mentorData.title}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                        width="400"
                        height="400"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://lendi.edu.in//cloud/2024/12/27/1735293134_cropped-image.jpg.jpg";
                        }} 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Details Column */}
                <div className="md:col-span-7 flex flex-col justify-center p-8 md:p-12 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{mentorData.name}</h3>
                    <p className="text-amber-600 font-bold text-lg">{mentorData.title}</p>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-base font-semibold">{mentorData.bio}</p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center space-x-3 text-slate-500">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-amber-600">
                      <BookOpen className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <span className="font-bold text-sm">Lendi Institute of Engineering & Technology</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - High Fidelity Design */}
        <section className="py-24 px-6 md:px-10 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
          {/* Glowing gradient backdrops */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(245,158,11,0.06),transparent_45%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-20%,rgba(59,130,246,0.06),transparent_45%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

          <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Ready to Explore Innovation?
              </h2>
              <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                Discover how our talented second-year undergraduate students are transforming bold conceptual ideas into functional engineering solutions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button 
                size="lg" 
                onClick={() => navigate('/smart-assessment')} 
                className="bg-amber-500 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] text-slate-950 px-8 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                View Smart Assessment
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/about')} 
                className="border border-slate-700 hover:border-white text-white hover:bg-white/5 px-8 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
