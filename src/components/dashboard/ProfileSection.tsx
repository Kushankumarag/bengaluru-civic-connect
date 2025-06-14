
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Award, Edit2, Save, X } from 'lucide-react';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    address: 'Koramangala, Bengaluru - 560034',
    joinDate: 'January 2024'
  });
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const stats = [
    { label: 'Total Reports', value: '12', color: 'text-civic-accent' },
    { label: 'Resolved Issues', value: '8', color: 'text-green-400' },
    { label: 'Pending Issues', value: '3', color: 'text-yellow-400' },
    { label: 'Civic Points', value: '156', color: 'text-purple-400' }
  ];

  const achievements = [
    { title: 'First Reporter', description: 'First issue reported', icon: '🎯' },
    { title: 'Active Citizen', description: '10+ issues reported', icon: '🏆' },
    { title: 'Community Helper', description: 'Helped resolve 5 issues', icon: '🤝' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-civic-light">My Profile</h2>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-civic-accent text-civic-dark hover:bg-opacity-80"
        >
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-civic-light flex items-center">
              <User className="w-5 h-5 mr-2 text-civic-accent" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-civic-accent/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-civic-accent">JD</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-civic-light">{profileData.name}</h3>
                <p className="text-gray-400">Active since {profileData.joinDate}</p>
                <Badge className="mt-1 bg-civic-accent/20 text-civic-accent">
                  Verified Citizen
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-civic-light mb-2">
                  <Mail className="w-4 h-4 mr-2 text-civic-accent" />
                  Email
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-card text-civic-light border-civic-accent/30"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-civic-light mb-2">
                  <Phone className="w-4 h-4 mr-2 text-civic-accent" />
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="glass-card text-civic-light border-civic-accent/30"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-medium text-civic-light mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-civic-accent" />
                  Address
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    className="glass-card text-civic-light border-civic-accent/30"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.address}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="glass-card text-civic-light border-civic-accent/30"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-civic-light text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                  <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-civic-light text-lg flex items-center">
                <Award className="w-5 h-5 mr-2 text-civic-accent" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-civic-accent/10">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="text-civic-light font-medium text-sm">{achievement.title}</p>
                    <p className="text-gray-400 text-xs">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
