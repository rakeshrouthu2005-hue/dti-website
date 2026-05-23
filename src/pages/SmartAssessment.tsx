
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
      
      {/* Hero Section - Updated with consistent styling */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="lendi-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="px-4 py-2 text-sm font-medium">
              Design Thinking & Innovation Project
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 lendi-text-primary font-display">
              Smart Assessment
            </h1>
            
            <p className="text-xl md:text-2xl lendi-text-secondary mb-8 max-w-3xl mx-auto">
              Revolutionizing educational assessment through intelligent automation, 
              real-time analytics, and personalized learning insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('process')}
                className="lendi-button px-8 py-6 text-lg"
              >
                Explore the Process
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Thinking Process - Updated with consistent styling */}
      <section id="process" className="lendi-section lendi-bg-secondary">
        <div className="lendi-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 lendi-text-primary font-display">
              Design Thinking Process
            </h2>
            <p className="text-xl lendi-text-secondary">Our systematic approach to innovation</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {designThinkingPhases.map((phase, index) => (
                <AccordionItem key={phase.id} value={phase.id} className="lendi-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gray-100 ${phase.color}`}>
                        <phase.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold lendi-text-primary">
                          {index + 1}. {phase.title}
                        </h3>
                        <p className="lendi-text-secondary">{phase.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-lg leading-relaxed lendi-text-secondary">{phase.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Team Section - Updated with consistent styling */}
      <section className="lendi-section bg-background">
        <div className="lendi-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 lendi-text-primary font-display">
              Our Team
            </h2>
            <p className="text-xl lendi-text-secondary">Meet the innovators behind Smart Assessment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="lendi-card p-6 text-center hover-scale">
                <div className="w-16 h-16 lendi-bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 lendi-text-primary">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="lendi-text-secondary text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use the consistent Footer component */}
      <Footer />

      {/* Floating Feedback Button - Updated with consistent styling */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg lendi-button"
        size="icon"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SmartAssessment;
