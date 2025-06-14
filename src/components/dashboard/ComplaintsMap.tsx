
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Filter } from 'lucide-react';

const ComplaintsMap = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-civic-light">Issues Map</h2>
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

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="h-96 bg-civic-darker rounded-lg flex items-center justify-center border border-civic-accent/20">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-civic-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-civic-light mb-2">Interactive Map</h3>
              <p className="text-gray-400">
                Map integration will show all reported issues with location pins.
                <br />
                Different colors for different status and categories.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-civic-light font-medium">High Priority</p>
                <p className="text-sm text-gray-400">12 issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-civic-light font-medium">Medium Priority</p>
                <p className="text-sm text-gray-400">8 issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-civic-light font-medium">Resolved</p>
                <p className="text-sm text-gray-400">25 issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintsMap;
