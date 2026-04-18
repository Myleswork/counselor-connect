import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { Loader2 } from "lucide-react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentProfiles from "./pages/StudentProfiles";
import StudentDetail from "./pages/StudentDetail";
import TalkSection from "./pages/TalkSection";
import AttendanceSection from "./pages/AttendanceSection";
import DormSection from "./pages/DormSection";
import DataManagement from "./pages/DataManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthGate() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return <Login />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentProfiles />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/talks" element={<Navigate to="/talks/new" replace />} />
        <Route path="/talks/:tab" element={<TalkSection />} />
        <Route path="/attendance" element={<Navigate to="/attendance/new" replace />} />
        <Route path="/attendance/:tab" element={<AttendanceSection />} />
        <Route path="/dorm" element={<Navigate to="/dorm/new" replace />} />
        <Route path="/dorm/:tab" element={<DormSection />} />
        <Route path="/data" element={<DataManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AuthGate />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
