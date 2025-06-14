
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, Map, Filter, Download } from 'lucide-react';

interface AdminSidebarProps {
  viewMode: 'table' | 'map';
  onViewModeChange: (mode: 'table' | 'map') => void;
  filters: {
    category: string;
    severity: string;
    status: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
  complaintsCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  viewMode,
  onViewModeChange,
  filters,
  onFiltersChange,
  complaintsCount
}) => {
  const categories = ['roads', 'drainage', 'lighting', 'waste', 'water', 'parks'];
  const severities = ['low', 'medium', 'high', 'critical'];
  const statuses = ['pending', 'in-progress', 'resolved'];
  const dateRanges = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-card border-r border-white/10 p-6">
      {/* View Toggle */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3">View Mode</h3>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('table')}
            className="flex-1"
          >
            <Table className="h-4 w-4 mr-2" />
            Table
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('map')}
            className="flex-1"
          >
            <Map className="h-4 w-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Filter className="h-4 w-4 mr-2 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-400">Filters</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Category</label>
            <Select
              value={filters.category}
              onValueChange={(value) => onFiltersChange({...filters, category: value})}
            >
              <SelectTrigger className="glass glow-border-focus">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Severity</label>
            <Select
              value={filters.severity}
              onValueChange={(value) => onFiltersChange({...filters, severity: value})}
            >
              <SelectTrigger className="glass glow-border-focus">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Severities</SelectItem>
                {severities.map(severity => (
                  <SelectItem key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFiltersChange({...filters, status: value})}
            >
              <SelectTrigger className="glass glow-border-focus">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Date Range</label>
            <Select
              value={filters.dateRange}
              onValueChange={(value) => onFiltersChange({...filters, dateRange: value})}
            >
              <SelectTrigger className="glass glow-border-focus">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 p-3 glass-card rounded-lg">
        <div className="text-2xl font-bold text-civic-accent">{complaintsCount}</div>
        <div className="text-sm text-gray-400">Total Complaints</div>
      </div>

      {/* Export Button */}
      <Button
        variant="outline"
        className="w-full glow-hover"
        onClick={() => {/* TODO: Implement export */}}
      >
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
    </aside>
  );
};
