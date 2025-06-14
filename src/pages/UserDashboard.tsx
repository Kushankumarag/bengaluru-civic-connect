
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ReportIssueForm from '@/components/dashboard/ReportIssueForm';
import ComplaintsList from '@/components/dashboard/ComplaintsList';
import ComplaintsMap from '@/components/dashboard/ComplaintsMap';
import ProfileSection from '@/components/dashboard/ProfileSection';
import StatsCards from '@/components/dashboard/StatsCards';
import { Shield, Plus, List, Map, User, HelpCircle } from 'lucide-react';

type ViewType = 'overview' | 'report' | 'complaints' | 'map' | 'profile' | 'help';

const UserDashboard = () => {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const { toast } = useToast();

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'report', label: 'Report Issue', icon: Plus },
    { id: 'complaints', label: 'My Complaints', icon: List },
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-civic-light">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ComplaintsList isPreview={true} />
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-civic-light">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setActiveView('report')} 
                    className="w-full bg-civic-accent text-civic-dark hover:bg-opacity-80 glow-hover"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Report New Issue
                  </Button>
                  <Button 
                    onClick={() => setActiveView('map')} 
                    variant="outline" 
                    className="w-full glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    View Issues on Map
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'report':
        return <ReportIssueForm onSuccess={() => setActiveView('complaints')} />;
      case 'complaints':
        return <ComplaintsList />;
      case 'map':
        return <ComplaintsMap />;
      case 'profile':
        return <ProfileSection />;
      case 'help':
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-civic-light">Help Center</CardTitle>
            </CardHeader>
            <CardContent className="text-civic-light">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-civic-accent mb-2">How to Report an Issue</h3>
                  <p className="text-gray-300">Click on "Report Issue" and fill in the details with photos and location.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-civic-accent mb-2">Track Your Complaints</h3>
                  <p className="text-gray-300">View all your submitted complaints in "My Complaints" section.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-civic-accent mb-2">Contact Support</h3>
                  <p className="text-gray-300">For technical issues, contact us at support@urbaneye.gov.in</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-civic-dark">
      <DashboardHeader />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 min-h-screen glass-nav border-r border-civic-accent/20 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeView === item.id
                    ? 'bg-civic-accent text-civic-dark glow'
                    : 'text-civic-light hover:bg-civic-accent/20 hover:text-civic-accent'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
