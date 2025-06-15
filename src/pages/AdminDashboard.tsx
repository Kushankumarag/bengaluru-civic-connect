
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ComplaintsTable } from '@/components/admin/ComplaintsTable';
import { ComplaintsMap } from '@/components/admin/ComplaintsMap';
import { StatsOverview } from '@/components/admin/StatsOverview';
import { ComplaintModal } from '@/components/admin/ComplaintModal';
import { ProfileModal } from '@/components/admin/ProfileModal';
import { toast } from 'sonner';

export interface Complaint {
  id: string;
  title: string;
  description: string | null;
  category: string;
  severity: string;
  status: string;
  location_address: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  division: string;
  assigned_admin_id: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  user_id: string;
}

export interface AdminProfile {
  id: string;
  full_name: string;
  email: string;
  division: string;
  role: string;
  access_code: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    severity: 'all',
    status: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin-login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAdminProfile();
      fetchComplaints();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [complaints, filters]);

  const fetchAdminProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setAdminProfile(data);
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      toast.error('Failed to load admin profile');
    }
  };

  const fetchComplaints = async () => {
    try {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Failed to load complaints');
    } finally {
      setLoadingData(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...complaints];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(complaint => complaint.category === filters.category);
    }

    if (filters.severity && filters.severity !== 'all') {
      filtered = filtered.filter(complaint => complaint.severity === filters.severity);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === filters.status);
    }

    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();

      switch (filters.dateRange) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(complaint => 
        new Date(complaint.created_at) >= cutoffDate
      );
    }

    setFilteredComplaints(filtered);
  };

  const updateComplaintStatus = async (complaintId: string, newStatus: string) => {
    try {
      const updates: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      if (newStatus === 'resolved') {
        updates.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('complaints')
        .update(updates)
        .eq('id', complaintId);

      if (error) throw error;

      // Log admin action
      await supabase
        .from('admin_actions')
        .insert({
          admin_id: user?.id,
          complaint_id: complaintId,
          action_type: 'status_update',
          details: `Status changed to ${newStatus}`
        });

      await fetchComplaints();
      toast.success(`Complaint marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Failed to update complaint status');
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-civic-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-civic-accent"></div>
      </div>
    );
  }

  if (!adminProfile) {
    return (
      <div className="min-h-screen bg-civic-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-civic-dark">
      <AdminHeader 
        adminProfile={adminProfile}
        onProfileClick={() => setShowProfileModal(true)}
      />
      
      <div className="flex">
        <AdminSidebar 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={filters}
          onFiltersChange={setFilters}
          complaintsCount={filteredComplaints.length}
        />
        
        <main className="flex-1 p-6 ml-64">
          <StatsOverview complaints={filteredComplaints} />
          
          {viewMode === 'table' ? (
            <ComplaintsTable 
              complaints={filteredComplaints}
              onComplaintClick={setSelectedComplaint}
              onStatusUpdate={updateComplaintStatus}
            />
          ) : (
            <ComplaintsMap 
              complaints={filteredComplaints}
              onComplaintClick={setSelectedComplaint}
            />
          )}
        </main>
      </div>

      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onStatusUpdate={updateComplaintStatus}
        />
      )}

      {showProfileModal && adminProfile && (
        <ProfileModal
          adminProfile={adminProfile}
          onClose={() => setShowProfileModal(false)}
          onUpdate={fetchAdminProfile}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
