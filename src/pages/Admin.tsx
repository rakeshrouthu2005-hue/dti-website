
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simple login check - in a real app this would be done securely
    if (email === 'hemanthkumarhk100@gmail.com' && password === 'hemanthkumar5341') {
      // Set admin authentication in localStorage
      localStorage.setItem('adminAuthenticated', 'true');
      
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin dashboard',
          variant: 'default',
        });
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
      }, 1000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | DT&I EEE A</title>
        <meta name="description" content="Admin login page for DT&I EEE A website" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 min-h-screen">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-card shadow-lg rounded-lg p-6 border border-border">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AdminLogin;
