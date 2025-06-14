
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminProfile } from '@/pages/AdminDashboard';

interface AdminHeaderProps {
  adminProfile: AdminProfile;
  onProfileClick: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminProfile,
  onProfileClick
}) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="glass-nav h-16 px-6 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-civic-accent">
          BBMP Admin
        </div>
        <div className="text-sm text-gray-400">
          {adminProfile.division}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-gray-400 hover:text-white"
          onClick={onProfileClick}
        >
          <User className="h-5 w-5" />
          <span>{adminProfile.full_name}</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
