
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Preload critical components immediately
import Index from "./pages/Index";

// Lazy load all other pages for better initial bundle size
const Teams = lazy(() => import("./pages/Teams"));
const TeamDetail = lazy(() => import("./pages/TeamDetail"));
const Presentations = lazy(() => import("./pages/Presentations"));
const About = lazy(() => import("./pages/About"));
const SmartAssessment = lazy(() => import("./pages/SmartAssessment"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced query client with better performance settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,
      gcTime: 45 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// Optimized loading component with minimal DOM
const PageLoader = React.memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/smart-assessment" element={<SmartAssessment />} />
                <Route path="/teams" element={<Navigate to="/teams/eee-a" replace />} />
                <Route path="/teams/:section" element={<Teams />} />
                <Route path="/teams/:section/:id" element={<TeamDetail />} />
                <Route path="/presentations" element={<Presentations />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
