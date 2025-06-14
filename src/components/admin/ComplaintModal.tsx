
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, ImageIcon, ArrowUpCircle } from 'lucide-react';
import { Complaint } from '@/pages/AdminDashboard';
import { format } from 'date-fns';

interface ComplaintModalProps {
  complaint: Complaint;
  onClose: () => void;
  onStatusUpdate: (complaintId: string, newStatus: string) => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  complaint,
  onClose,
  onStatusUpdate
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Complaint Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {complaint.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={getSeverityColor(complaint.severity)}>
                {complaint.severity}
              </Badge>
              <Badge className={getStatusColor(complaint.status)}>
                {complaint.status.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {complaint.category}
              </Badge>
            </div>
          </div>

          {/* Description */}
          {complaint.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {complaint.description}
              </p>
            </div>
          )}

          {/* Image */}
          {complaint.image_url && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Image</h3>
              <div className="relative">
                <img
                  src={complaint.image_url}
                  alt="Complaint"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white">
                    {complaint.location_address || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Reported</div>
                  <div className="text-white">
                    {format(new Date(complaint.created_at), 'PPpp')}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Division</div>
                  <div className="text-white">{complaint.division}</div>
                </div>
              </div>

              {complaint.resolved_at && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Resolved</div>
                    <div className="text-white">
                      {format(new Date(complaint.resolved_at), 'PPpp')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="flex space-x-3">
              {complaint.status === 'pending' && (
                <Button
                  className="glow-hover"
                  onClick={() => {
                    onStatusUpdate(complaint.id, 'in-progress');
                    onClose();
                  }}
                >
                  Mark In Progress
                </Button>
              )}
              {complaint.status === 'in-progress' && (
                <Button
                  className="bg-green-600 hover:bg-green-700 glow-hover"
                  onClick={() => {
                    onStatusUpdate(complaint.id, 'resolved');
                    onClose();
                  }}
                >
                  Mark Resolved
                </Button>
              )}
              <Button
                variant="outline"
                className="glow-hover"
                onClick={() => {/* TODO: Implement escalation */}}
              >
                <ArrowUpCircle className="h-4 w-4 mr-2" />
                Escalate
              </Button>
            </div>

            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
