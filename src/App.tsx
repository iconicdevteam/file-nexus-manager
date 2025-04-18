
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Section from "./pages/Section";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { DragProvider } from "./context/DragContext";

const queryClient = new QueryClient();

const App = () => {
  // In a real application, this would be handled by a proper auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DragProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
              
              {/* Main App Routes - Protected */}
              <Route path="/" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
              <Route path="/section/:sectionId" element={isAuthenticated ? <Section /> : <Navigate to="/login" />} />
              <Route path="/recent" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
              <Route path="/favorites" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
              <Route path="/trash" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
              <Route path="/settings" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DragProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
