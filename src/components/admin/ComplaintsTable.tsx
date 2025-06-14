
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Calendar, ArrowUpCircle } from 'lucide-react';
import { Complaint } from '@/pages/AdminDashboard';
import { format } from 'date-fns';

interface ComplaintsTableProps {
  complaints: Complaint[];
  onComplaintClick: (complaint: Complaint) => void;
  onStatusUpdate: (complaintId: string, newStatus: string) => void;
}

export const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  complaints,
  onComplaintClick,
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

  const getCategoryIcon = (category: string) => {
    // Return appropriate icon based on category
    return '📋';
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead className="text-gray-400">Complaint</TableHead>
            <TableHead className="text-gray-400">Category</TableHead>
            <TableHead className="text-gray-400">Severity</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Location</TableHead>
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow 
              key={complaint.id} 
              className="border-white/10 hover:bg-white/5 cursor-pointer"
              onClick={() => onComplaintClick(complaint)}
            >
              <TableCell>
                <div className="font-medium text-white truncate max-w-xs">
                  {complaint.title}
                </div>
                {complaint.description && (
                  <div className="text-sm text-gray-400 truncate max-w-xs">
                    {complaint.description}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{getCategoryIcon(complaint.category)}</span>
                  <span className="text-gray-300 capitalize">
                    {complaint.category}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getSeverityColor(complaint.severity)}>
                  {complaint.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(complaint.status)}>
                  {complaint.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate max-w-xs">
                    {complaint.location_address || 'Unknown'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {format(new Date(complaint.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  {complaint.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="glow-hover"
                      onClick={() => onStatusUpdate(complaint.id, 'in-progress')}
                    >
                      Start
                    </Button>
                  )}
                  {complaint.status === 'in-progress' && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 glow-hover"
                      onClick={() => onStatusUpdate(complaint.id, 'resolved')}
                    >
                      Resolve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-orange-400 hover:text-orange-300"
                  >
                    <ArrowUpCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {complaints.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-2">No complaints found</div>
          <div className="text-sm text-gray-500">
            Try adjusting your filters or check back later
          </div>
        </div>
      )}
    </div>
  );
};
