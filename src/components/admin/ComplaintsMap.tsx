
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { Complaint } from '@/pages/AdminDashboard';

interface ComplaintsMapProps {
  complaints: Complaint[];
  onComplaintClick: (complaint: Complaint) => void;
}

export const ComplaintsMap: React.FC<ComplaintsMapProps> = ({
  complaints,
  onComplaintClick
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // For now, we'll display complaints in a grid layout as a placeholder for the map
  // In a real implementation, you'd integrate with Google Maps or similar
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-white/10">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-civic-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Map View</h3>
              <p className="text-gray-400">
                Map integration coming soon. For now, complaints are displayed below.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <Card 
            key={complaint.id} 
            className="glass-card hover-lift cursor-pointer"
            onClick={() => onComplaintClick(complaint)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white truncate">
                    {complaint.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {complaint.description}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(complaint.severity)} ml-2 mt-1`}></div>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {complaint.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {complaint.status}
                </Badge>
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">
                  {complaint.location_address || 'Location not specified'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {complaints.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-2">No complaints to display on map</div>
            <div className="text-sm text-gray-500">
              Try adjusting your filters or check back later
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
