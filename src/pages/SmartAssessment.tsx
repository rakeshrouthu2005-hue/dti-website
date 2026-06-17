
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Lightbulb, Wrench, TestTube, ChevronRight, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageSEO from '@/components/SEO/PageSEO';

const SmartAssessment = () => {
  const designThinkingPhases = [
    {
      id: 'empathize',
      title: 'Empathize',
      icon: Heart,
      description: 'Understanding user needs and pain points',
      content: 'We conducted extensive interviews with faculty members to understand their challenges with traditional assessment methods. Key insights included time-consuming grading processes, difficulty in providing personalized feedback, and lack of real-time analytics.',
      color: 'text-red-500'
    },
    {
      id: 'define',
      title: 'Define',
      icon: Users,
      description: 'Defining the core problem statement',
      content: 'Problem Statement: Faculty need an intelligent assessment platform that automates grading, provides instant feedback, and offers actionable insights to improve student learning outcomes while reducing administrative burden.',
      color: 'text-blue-500'
    },
    {
      id: 'ideate',
      title: 'Ideate',
      icon: Lightbulb,
      description: 'Brainstorming innovative solutions',
      content: 'We explored multiple solutions including AI-powered auto-grading, adaptive questioning, real-time analytics dashboards, and personalized learning recommendations. The final concept integrates machine learning with intuitive UI design.',
      color: 'text-yellow-500'
    },
    {
      id: 'prototype',
      title: 'Prototype',
      icon: Wrench,
      description: 'Building and iterating on solutions',
      content: 'Our prototype includes a web-based dashboard for faculty, automated question generation, intelligent grading algorithms, and student progress tracking. Built with modern web technologies for scalability and performance.',
      color: 'text-green-500'
    },
    {
      id: 'test',
      title: 'Test',
      icon: TestTube,
      description: 'Validating with real users',
      content: 'We conducted user testing sessions with faculty members, gathering feedback on usability, effectiveness, and feature requests. Results showed 85% improvement in grading efficiency and 92% user satisfaction rate.',
      color: 'text-purple-500'
    }
  ];

  const teamMembers = [
    { name: 'Hemanth Kumar', role: 'Lead Developer & Project Manager', bio: 'II Year EEE student passionate about educational technology and full-stack development.' },
    { name: 'Sirisha', role: 'UI/UX Designer', bio: 'Focused on creating intuitive user experiences and conducting user research.' },
    { name: 'Manasa', role: 'Data Analyst', bio: 'Specializes in educational data analytics and machine learning algorithms.' },
    { name: 'Tejesh', role: 'Quality Assurance', bio: 'Ensures robust testing and maintains high code quality standards.' }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageSEO 
        title="Smart Assessment - Design Thinking Innovation"
        description="Innovative smart assessment platform developed through Design Thinking methodology by EEE-A students at Lendi Institute."
        keywords="smart assessment, design thinking, educational technology, EEE, innovation, Lendi Institute"
      />
      
      <Navbar />
      
      {/* Hero Section - Updated with premium consistent styling */}
      <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 px-6 bg-slate-950 text-white overflow-hidden border-b border-slate-900 glow-mesh-combo mt-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block">
            <span className="inline-block py-1.5 px-3 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
              Design Thinking Project
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Smart Assessment
          </h1>
          
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Revolutionizing educational assessment through intelligent automation, 
            real-time analytics, and personalized learning insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('process')}
              className="bg-amber-500 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] text-slate-950 px-8 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
            >
              Explore the Process
              <ChevronRight className="ml-1.5 w-5 h-5 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* Design Thinking Process - Updated with consistent styling */}
      <section id="process" className="py-24 px-6 md:px-10 bg-slate-50/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block">
              <span className="inline-block py-1.5 px-3 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Innovation Framework
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Design Thinking Process
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium">Our systematic approach to solving real-world challenges</p>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {designThinkingPhases.map((phase, index) => (
                <AccordionItem 
                  key={phase.id} 
                  value={phase.id} 
                  className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 ${phase.color} group-hover:scale-110 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300`}>
                        <phase.icon className="w-5 h-5 flex-shrink-0" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors tracking-tight">
                          {index + 1}. {phase.title}
                        </h3>
                        <p className="text-slate-450 text-[10px] mt-0.5 font-bold uppercase tracking-wider">{phase.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 bg-slate-50/50 border-t border-slate-50 pt-5">
                    <p className="text-base leading-relaxed text-slate-600 font-semibold">{phase.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Team Section - Updated with consistent styling */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block">
              <span className="inline-block py-1.5 px-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Meet Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              The Innovators
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-semibold">Talented EEE students transforming education through technology</p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-amber-300/85 border border-slate-100 text-center group transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-slate-800 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-black text-2xl tracking-tight">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-amber-600 transition-colors tracking-tight">{member.name}</h3>
                <p className="text-amber-600 font-bold mb-4 text-xs uppercase tracking-wider">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use the consistent Footer component */}
      <Footer />

      {/* Floating Feedback Button - Updated with consistent styling */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-xl bg-amber-500 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] text-slate-950 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 border-0 h-14 w-14"
        size="icon"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SmartAssessment;
