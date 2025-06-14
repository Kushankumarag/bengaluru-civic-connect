
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, MapPin, Camera } from 'lucide-react';

interface ReportIssueFormProps {
  onSuccess: () => void;
}

const ReportIssueForm: React.FC<ReportIssueFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    image: null as File | null
  });
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const categories = [
    'Roads & Infrastructure',
    'Drainage & Water',
    'Power & Utilities',
    'Traffic & Transport',
    'Waste Management',
    'Street Lighting',
    'Parks & Gardens',
    'Others'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Issue Reported Successfully!",
        description: "Your complaint has been submitted and will be reviewed soon.",
      });
      onSuccess();
    }, 1000);
  };

  const handleImageUpload = (file: File) => {
    setFormData(prev => ({ ...prev, image: file }));
    toast({
      title: "Image Uploaded",
      description: `${file.name} has been attached to your report.`,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  return (
    <Card className="glass-card max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-civic-light flex items-center">
          <Camera className="w-6 h-6 mr-3 text-civic-accent" />
          Report New Issue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-civic-light mb-2">
                Issue Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full glass-card text-civic-light border-civic-accent/30 rounded-lg px-4 py-3 focus:border-civic-accent focus:ring-2 focus:ring-civic-accent/20"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-civic-dark text-civic-light">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-civic-light mb-2">
                Location
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location or use GPS"
                  className="glass-card text-civic-light border-civic-accent/30 pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-civic-accent" />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          location: `${position.coords.latitude}, ${position.coords.longitude}` 
                        }));
                        toast({
                          title: "Location Detected",
                          description: "GPS location has been added to your report.",
                        });
                      },
                      () => {
                        toast({
                          title: "Location Error",
                          description: "Unable to detect your location. Please enter manually.",
                          variant: "destructive"
                        });
                      }
                    );
                  }
                }}
              >
                <MapPin className="w-4 h-4 mr-1" />
                Use GPS
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-civic-light mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the issue in detail..."
              rows={4}
              className="w-full glass-card text-civic-light border-civic-accent/30 rounded-lg px-4 py-3 focus:border-civic-accent focus:ring-2 focus:ring-civic-accent/20 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-civic-light mb-2">
              Upload Photo
            </label>
            <div
              className={`glass-card border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                isDragging 
                  ? 'border-civic-accent bg-civic-accent/10' 
                  : 'border-civic-accent/30 hover:border-civic-accent/50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
            >
              <Upload className="w-12 h-12 text-civic-accent mx-auto mb-4" />
              {formData.image ? (
                <div>
                  <p className="text-civic-light font-medium">{formData.image.name}</p>
                  <p className="text-gray-400 text-sm">Image uploaded successfully</p>
                </div>
              ) : (
                <div>
                  <p className="text-civic-light font-medium">Drop your image here or click to browse</p>
                  <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-block mt-4 px-4 py-2 bg-civic-accent/20 text-civic-accent rounded-lg cursor-pointer hover:bg-civic-accent/30 transition-colors"
              >
                Choose File
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="glass-card text-civic-light border-civic-accent/30 hover:bg-civic-accent/20"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="bg-civic-accent text-civic-dark hover:bg-opacity-80 glow-hover px-8"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportIssueForm;
