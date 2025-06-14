
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminProfile } from '@/pages/AdminDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileModalProps {
  adminProfile: AdminProfile;
  onClose: () => void;
  onUpdate: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  adminProfile,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    full_name: adminProfile.full_name,
    email: adminProfile.email,
    division: adminProfile.division
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('admin_profiles')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          division: formData.division,
          updated_at: new Date().toISOString()
        })
        .eq('id', adminProfile.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="full_name" className="text-gray-400">
              Full Name
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="glass glow-border-focus mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="glass glow-border-focus mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="division" className="text-gray-400">
              Division
            </Label>
            <Input
              id="division"
              value={formData.division}
              onChange={(e) => setFormData({...formData, division: e.target.value})}
              className="glass glow-border-focus mt-1"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="glow-hover"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
