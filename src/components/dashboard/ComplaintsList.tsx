
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Eye, MessageCircle } from 'lucide-react';

interface ComplaintsListProps {
  isPreview?: boolean;
}

const ComplaintsList: React.FC<ComplaintsListProps> = ({ isPreview = false }) => {
  const complaints = [
    {
      id: 'UE001',
      title: 'Pothole on MG Road',
      category: 'Roads & Infrastructure',
      status: 'In Progress',
      date: '2024-01-15',
      location: 'MG Road, Brigade Road Junction',
      description: 'Large pothole causing traffic issues...',
      priority: 'High'
    },
    {
      id: 'UE002',
      title: 'Street Light Not Working',
      category: 'Street Lighting',
      status: 'Pending',
      date: '2024-01-14',
      location: 'Koramangala 4th Block',
      description: 'Street light has been non-functional for 3 days...',
      priority: 'Medium'
    },
    {
      id: 'UE003',
      title: 'Drainage Overflow',
      category: 'Drainage & Water',
      status: 'Resolved',
      date: '2024-01-12',
      location: 'Indiranagar Metro Station',
      description: 'Water logging due to blocked drainage...',
      priority: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const displayComplaints = isPreview ? complaints.slice(0, 3) : complaints;

  return (
    <div className="space-y-4">
      {!isPreview && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-civic-light">My Complaints</h2>
          <div className="flex space-x-2">
            <select className="glass-card text-civic-light border-civic-accent/30 rounded-lg px-3 py-2 text-sm">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select className="glass-card text-civic-light border-civic-accent/30 rounded-lg px-3 py-2 text-sm">
              <option value="">All Categories</option>
              <option value="roads">Roads & Infrastructure</option>
              <option value="drainage">Drainage & Water</option>
              <option value="lighting">Street Lighting</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {displayComplaints.map((complaint) => (
          <Card key={complaint.id} className="glass-card hover:glow-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-civic-light">{complaint.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-civic-accent font-medium mb-2">#{complaint.id}</p>
                  <p className="text-gray-300 text-sm mb-3">{complaint.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {complaint.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {complaint.date}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
              
              {complaint.status === 'In Progress' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-civic-light mb-2">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-civic-dark rounded-full h-2">
                    <div className="bg-civic-accent h-2 rounded-full glow" style={{ width: '65%' }}></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isPreview && (
        <div className="text-center">
          <Button
            variant="outline"
            className="glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark"
          >
            View All Complaints
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
