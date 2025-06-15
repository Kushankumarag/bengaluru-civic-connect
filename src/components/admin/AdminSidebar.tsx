import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, Map, Filter, Download } from 'lucide-react';
import FilterSelect from './FilterSelect';

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
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'roads', label: 'Roads' },
    { value: 'drainage', label: 'Drainage' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'waste', label: 'Waste' },
    { value: 'water', label: 'Water' },
    { value: 'parks', label: 'Parks' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
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
          <FilterSelect
            label="Category"
            value={filters.category}
            onValueChange={(value) => onFiltersChange({...filters, category: value})}
            options={categoryOptions}
          />

          <FilterSelect
            label="Severity"
            value={filters.severity}
            onValueChange={(value) => onFiltersChange({...filters, severity: value})}
            options={severityOptions}
          />

          <FilterSelect
            label="Status"
            value={filters.status}
            onValueChange={(value) => onFiltersChange({...filters, status: value})}
            options={statusOptions}
          />

          <FilterSelect
            label="Date Range"
            value={filters.dateRange}
            onValueChange={(value) => onFiltersChange({...filters, dateRange: value})}
            options={dateRangeOptions}
          />
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
