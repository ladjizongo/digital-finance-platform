
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import AdminPortal from "./pages/AdminPortal";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add CSP meta tag programmatically
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.lovable.app; font-src 'self' data:;";
    document.head.appendChild(metaCSP);
    
    // Add additional security headers
    const metaXSS = document.createElement('meta');
    metaXSS.httpEquiv = 'X-XSS-Protection';
    metaXSS.content = '1; mode=block';
    document.head.appendChild(metaXSS);
    
    const metaFrameOptions = document.createElement('meta');
    metaFrameOptions.httpEquiv = 'X-Frame-Options';
    metaFrameOptions.content = 'DENY';
    document.head.appendChild(metaFrameOptions);
    
    const metaContentType = document.createElement('meta');
    metaContentType.httpEquiv = 'X-Content-Type-Options';
    metaContentType.content = 'nosniff';
    document.head.appendChild(metaContentType);
    
    return () => {
      document.head.removeChild(metaCSP);
      document.head.removeChild(metaXSS);
      document.head.removeChild(metaFrameOptions);
      document.head.removeChild(metaContentType);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/admin" element={<AdminPortal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
