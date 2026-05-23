
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageSEO 
        title="Home" 
        description="Explore innovative solutions to engineering challenges through creative problem-solving and human-centered design at Lendi Institute's Design Thinking & Innovation program." 
        keywords="design thinking, innovation, electrical engineering, EEE, Lendi Institute, engineering projects, creative solutions" 
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - optimized images with lazy loading */}
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-center mb-2 animate-on-load opacity-0">
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
            
            <div className="text-center space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-load opacity-0">
                Design Thinking & Innovation
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-4 animate-on-load opacity-0">
                Department of Electrical & Electronic Engineering - A
              </p>
              <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-3xl mx-auto animate-on-load opacity-0">
                Empowering future engineers through innovative problem-solving and human-centered design approaches
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-load opacity-0">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/smart-assessment')} 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Smart Assessment Project
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/teams')} 
                  className="border-2 border-white hover:bg-white px-8 py-4 text-lg font-semibold rounded-lg text-blue-800"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Explore Teams
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Approach to Innovation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We follow a structured approach to design thinking that empowers students to solve real-world problems
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Creative Problem Solving</h3>
                <p className="text-gray-600">Innovative approaches to complex engineering challenges</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative Learning</h3>
                <p className="text-gray-600">Team-based approach to design and innovation</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Excellence in Design</h3>
                <p className="text-gray-600">Recognition for outstanding project outcomes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Section - optimized image loading */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Meet Our Mentor
              </h2>
              <p className="text-lg text-gray-600">
                Guided by experienced faculty in design thinking and innovation
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div className="relative">
                  <div className="aspect-square max-w-sm mx-auto overflow-hidden rounded-lg">
                    <img 
                      src={mentorData.image} 
                      alt={`${mentorData.name} - ${mentorData.title}`} 
                      className="w-full h-full object-cover" 
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
                
                <div className="flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{mentorData.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg">{mentorData.title}</p>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{mentorData.bio}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Lendi Institute of Engineering & Technology
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore Innovation?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Discover how our students are transforming ideas into impactful solutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/smart-assessment')} 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg"
              >
                View Smart Assessment
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/about')} 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-lg"
              >
                Learn More
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
