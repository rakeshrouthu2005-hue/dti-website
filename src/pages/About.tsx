
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, School, GraduationCap, Rocket, Target, Users, Award } from 'lucide-react';
import PageSEO from '@/components/SEO/PageSEO';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const managementMembers = [
    {
      name: "Sri P. Madhusudana Rao",
      designation: "Chairman",
      image: "https://lendi.edu.in//cloud/2024/11/19/1732023045_chairman1.jpeg"
    },
    {
      name: "Sri P. Srinivasa Rao",
      designation: "Vice Chairman",
      image: "https://lendi.edu.in//cloud/2024/11/19/1732023050_vicechairman1.jpeg"
    },
    {
      name: "Sri K. Siva Rama Krishna",
      designation: "Secretary & Correspondent",
      image: "https://lendi.edu.in//cloud/2024/11/19/1732023056_secretary1.jpeg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="About Lendi Institute"
        description="Learn about Lendi Institute of Engineering and Technology and our Electrical & Electronics Engineering department."
        keywords="Lendi Institute, engineering college, Vizianagaram, Andhra Pradesh, EEE department, electrical engineering"
      />
      
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Page Header */}
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block">
              <span className="inline-block py-1.5 px-3 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Our Institution
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Our Academic Foundations</h1>
            <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto">Discover the visionary leadership and technical excellence backing Lendi Institute of Engineering & Technology.</p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mx-auto mt-4"></div>
          </div>
          
          {/* College & Department Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-24">
            {/* About College Section */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 animate-fade-in">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-slate-950 text-white rounded-xl shadow-md">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">About</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">The Institution</h2>
                </div>
              </div>
              
              <div className="space-y-5 text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
                <p>
                  Lendi Institute of Engineering and Technology is a premier institution dedicated to academic excellence, 
                  innovation, and holistic student development. Located in Vizianagaram, Andhra Pradesh, we strive to 
                  be at the forefront of engineering education.
                </p>
                <p>
                  Our state-of-the-art infrastructure, experienced faculty, and research-driven approach create a dynamic 
                  learning environment that nurtures technical expertise and entrepreneurial spirit. We emphasize hands-on 
                  learning and real-world applications.
                </p>
                <div className="pt-4">
                  <Button 
                    onClick={() => window.open("https://lendi.edu.in/", "_blank")} 
                    className="bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center group text-xs md:text-sm"
                  >
                    Visit College Website 
                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            </div>

            {/* About Department Section */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 animate-fade-in">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest leading-none">department</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">EEE Department</h2>
                </div>
              </div>
              
              <div className="space-y-5 text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
                <p>
                  The Department of Electrical & Electronics Engineering (EEE) at Lendi Institute is committed to 
                  excellence in education, research, and innovation. Our program provides comprehensive training in 
                  electrical engineering fundamentals and emerging technologies.
                </p>
                <p>
                  Our curriculum integrates theoretical knowledge with practical applications, preparing students for 
                  the challenges of the industry. Through our Design Thinking & Innovation program, students develop 
                  creative problem-solving skills and human-centered design approaches.
                </p>
                <p>
                  The department features well-equipped laboratories, experienced faculty members, and strong industry 
                  connections. We encourage student participation in research projects, technical competitions, and 
                  innovative ventures.
                </p>
              </div>
            </div>
          </div>
          
          {/* Vision & Mission Section */}
          <div className="mb-24">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block">
                <span className="inline-block py-1.5 px-3 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs font-bold uppercase tracking-widest">
                  Our Direction
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Vision & Mission</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full mx-auto mt-4"></div>
            </div>
            
            <div className="space-y-8">
              {/* Vision Section */}
              <div className="bg-slate-950 text-white p-8 md:p-10 rounded-3xl border border-slate-900 shadow-xl relative overflow-hidden">
                {/* Radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(245,158,11,0.06),transparent_40%)]"></div>
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-900 relative z-10">
                  <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-md">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">Vision</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg font-semibold relative z-10">
                  To be a center of excellence in imparting knowledge, skills and ethical values, while fostering 
                  innovation, sustainability and globally competent to make exemplary contributions to the field 
                  of Electrical and Electronics Engineering.
                </p>
              </div>
              
              {/* Mission Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-slate-200/50">
                  <div className="p-3 bg-slate-950 text-white rounded-xl shadow-md">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Mission</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                    <p className="text-slate-650 leading-relaxed font-bold text-sm md:text-base text-slate-700">
                      To impart technical education using state-of-the-art infrastructure, laboratories and 
                      instructional methods ensuring students acquire comprehensive knowledge and skills.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                    <p className="text-slate-650 leading-relaxed font-bold text-sm md:text-base text-slate-700">
                      To foster industry-oriented learning by facilitating internships, industrial visits, 
                      collaborative projects with industries.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                    <p className="text-slate-650 leading-relaxed font-bold text-sm md:text-base text-slate-700">
                      To create a congenial environment for higher education, employment and entrepreneurship 
                      by delivering quality education, enhancing professional skills and promoting research and innovation.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                    <p className="text-slate-650 leading-relaxed font-bold text-sm md:text-base text-slate-700">
                      To promote societal commitment and ethical leadership by instilling moral values and 
                      encouraging responsible engineering practices among students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Management Section */}
          <div className="mb-24">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block">
                <span className="inline-block py-1.5 px-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase tracking-widest">
                  Leadership
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Management Team</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {managementMembers.map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:border-amber-300/80 hover:-translate-y-1 transition-all duration-300 text-center group animate-scale-in">
                  <div className="mb-6 relative">
                    {/* Glowing blur box wrapper */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all"></div>
                    <div className="w-40 h-40 rounded-2xl mx-auto overflow-hidden border border-slate-100 shadow-md relative bg-slate-50">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face";
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-amber-600 transition-colors tracking-tight">{member.name}</h3>
                  <p className="text-amber-600 font-bold text-xs uppercase tracking-wider">{member.designation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Principal & HOD Section */}
          <div className="mb-10">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block">
                <span className="inline-block py-1.5 px-3 bg-rose-50 text-rose-700 border border-rose-100 rounded-full text-xs font-bold uppercase tracking-widest">
                  Heads
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Principal & Head of Department</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-rose-300 rounded-full mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Principal */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-slate-100">
                  <div className="p-3 bg-rose-600 text-white rounded-xl shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest leading-none">Administration</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Principal</h3>
                  </div>
                </div>
                
                <div className="text-center mb-8 relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl blur opacity-15"></div>
                  <div className="w-48 h-48 rounded-2xl mx-auto overflow-hidden border border-slate-100 shadow-md relative bg-slate-50">
                    <img 
                      src="https://lendi.edu.in//cloud/2024/12/15/1734257026_Lendi%20col.jpg" 
                      alt="Dr. V. V. Rama Reddy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face";
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center space-y-1 mb-6">
                  <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">Dr. V. V. Rama Reddy</h4>
                  <p className="text-rose-600 font-bold text-xs uppercase tracking-wider">Principal</p>
                </div>
                
                <p className="text-slate-500 leading-relaxed text-center font-medium text-sm md:text-base max-w-md mx-auto">
                  Dr. V. V. Rama Reddy brings extensive experience in engineering education and administration. 
                  He is committed to fostering academic excellence and innovation at Lendi Institute, ensuring 
                  students receive world-class education and opportunities for holistic development.
                </p>
              </div>

              {/* HOD EEE */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-slate-100">
                  <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">department Head</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Head of Department</h3>
                  </div>
                </div>
                
                <div className="text-center mb-8 relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl blur opacity-15"></div>
                  <div className="w-48 h-48 rounded-2xl mx-auto overflow-hidden border border-slate-100 shadow-md relative bg-slate-50">
                    <img 
                      src="https://lendi.edu.in//cloud/2024/12/26/1735221638_cropped-image.jpg.jpg"
                      alt="Dr. K. Subbaramaiah"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face";
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center space-y-1 mb-6">
                  <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">Dr. K. Subbaramaiah</h4>
                  <p className="text-indigo-600 font-bold text-xs uppercase tracking-wider">Head of Department, EEE</p>
                </div>
                
                <p className="text-slate-500 leading-relaxed text-center font-medium text-sm md:text-base max-w-md mx-auto">
                  Dr. K. Subbaramaiah leads the Electrical & Electronics Engineering department with dedication 
                  to academic excellence and industry-relevant curriculum. He champions innovative teaching methods 
                  and encourages students to pursue research and practical applications in electrical engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
