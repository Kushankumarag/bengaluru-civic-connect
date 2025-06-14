
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been safely logged out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <header className="glass-nav border-b border-civic-accent/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-civic-accent rounded-xl flex items-center justify-center glow">
              <Shield className="w-6 h-6 text-civic-dark" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-civic-light font-space-grotesk">Urban Eye</h1>
              <p className="text-sm text-gray-400">Citizen Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-civic-light hover:text-civic-accent hover:bg-civic-accent/20"
          >
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-civic-light">
                {user?.email ? getUserDisplayName(user.email) : 'User'}
              </p>
              <p className="text-xs text-gray-400">Active Citizen</p>
            </div>
            <div className="w-8 h-8 bg-civic-accent/20 rounded-full flex items-center justify-center">
              <span className="text-civic-accent font-semibold text-xs">
                {user?.email ? getUserInitials(user.email) : 'U'}
              </span>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
