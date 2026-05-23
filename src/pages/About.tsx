
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
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
            <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* About College Section */}
            <div className="glass-card p-8 rounded-lg space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <School className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-primary">About College</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Lendi Institute of Engineering and Technology is a premier institution dedicated to academic excellence, 
                  innovation, and holistic student development. Located in Vizianagaram, Andhra Pradesh, we strive to 
                  be at the forefront of engineering education.
                </p>
                <p className="text-muted-foreground">
                  Our state-of-the-art infrastructure, experienced faculty, and research-driven approach create a dynamic 
                  learning environment that nurtures technical expertise and entrepreneurial spirit. We emphasize hands-on 
                  learning and real-world applications.
                </p>
                <div className="pt-4">
                  <Button onClick={() => window.open("https://lendi.edu.in/", "_blank")} className="group">
                    Visit College Website 
                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* About Department Section */}
            <div className="glass-card p-8 rounded-lg space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-primary">About Department</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The Department of Electrical & Electronics Engineering (EEE) at Lendi Institute is committed to 
                  excellence in education, research, and innovation. Our program provides comprehensive training in 
                  electrical engineering fundamentals and emerging technologies.
                </p>
                <p className="text-muted-foreground">
                  Our curriculum integrates theoretical knowledge with practical applications, preparing students for 
                  the challenges of the industry. Through our Design Thinking & Innovation program, students develop 
                  creative problem-solving skills and human-centered design approaches.
                </p>
                <p className="text-muted-foreground">
                  The department features well-equipped laboratories, experienced faculty members, and strong industry 
                  connections. We encourage student participation in research projects, technical competitions, and 
                  innovative ventures.
                </p>
              </div>
            </div>
          </div>
          
          {/* Vision & Mission Section */}
          <div className="mt-16 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Department's Vision & Mission</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
            </div>
            
            <div className="glass-card p-8 rounded-lg space-y-8">
              {/* Vision Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-7 h-7 text-primary flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-primary">Vision</h3>
                </div>
                <p className="text-muted-foreground pl-10">
                  To be a center of excellence in imparting knowledge, skills and ethical values, while fostering 
                  innovation, sustainability and globally competent to make exemplary contributions to the field 
                  of Electrical and Electronics Engineering.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              {/* Mission Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-7 h-7 text-primary flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-primary">Mission</h3>
                </div>
                
                <div className="pl-10 space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border/30">
                    <p className="text-muted-foreground">
                      To impart technical education using state-of-the-art infrastructure, laboratories and 
                      instructional methods ensuring students acquire comprehensive knowledge and skills.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border/30">
                    <p className="text-muted-foreground">
                      To foster industry-oriented learning by facilitating internships, industrial visits, 
                      collaborative projects with industries.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border/30">
                    <p className="text-muted-foreground">
                      To create a congenial environment for higher education, employment and entrepreneurship 
                      by delivering quality education, enhancing professional skills and promoting research and innovation.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border/30">
                    <p className="text-muted-foreground">
                      To promote societal commitment and ethical leadership by instilling moral values and 
                      encouraging responsible engineering practices among students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Management Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Management</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {managementMembers.map((member, index) => (
                <div key={index} className="glass-card p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className="text-muted-foreground font-semibold">{member.designation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Principal & HOD Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Principal & Head of Department (EEE)</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Principal */}
              <div className="glass-card p-8 rounded-lg space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">Principal</h3>
                </div>
                
                <div className="text-center mb-6">
                  <img 
                    src="https://lendi.edu.in//cloud/2024/12/15/1734257026_Lendi%20col.jpg" 
                    alt="Dr. V. V. Rama Reddy"
                    className="w-40 h-40 rounded-lg mx-auto object-cover border-4 border-primary/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face";
                    }}
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-bold text-gray-800">Dr. V. V. Rama Reddy</h4>
                  <p className="text-primary font-semibold">Principal</p>
                </div>
                
                <p className="text-muted-foreground text-center">
                  Dr. V. V. Rama Reddy brings extensive experience in engineering education and administration. 
                  He is committed to fostering academic excellence and innovation at Lendi Institute, ensuring 
                  students receive world-class education and opportunities for holistic development.
                </p>
              </div>

              {/* HOD EEE */}
              <div className="glass-card p-8 rounded-lg space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">Head of Department</h3>
                </div>
                
                <div className="text-center mb-6">
                  <img 
                    src="https://lendi.edu.in//cloud/2024/12/26/1735221638_cropped-image.jpg.jpg"
                    alt="Dr. K. Subbaramaiah"
                    className="w-40 h-40 rounded-lg mx-auto object-cover border-4 border-primary/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&face";
                    }}
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-bold text-gray-800">Dr. K. Subbaramaiah</h4>
                  <p className="text-primary font-semibold">Head of Department, EEE</p>
                </div>
                
                <p className="text-muted-foreground text-center">
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
