
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, User, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DivisionSelect from './DivisionSelect';
import PasswordInput from './PasswordInput';

const AdminSignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    division: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    division: ''
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { adminSignUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDivisionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      division: value
    }));

    if (errors.division) {
      setErrors(prev => ({
        ...prev,
        division: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      division: ''
    };

    if (formData.email && !formData.email.endsWith('.gov.in')) {
      newErrors.email = 'Official email must end with .gov.in';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.division) {
      newErrors.division = 'Please select your division';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Starting admin signup process...');
      
      const { error } = await adminSignUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone,
        formData.division,
        '' // Empty access code
      );

      if (error) {
        console.error('Admin signup failed:', error);
        toast({
          title: "Registration Failed",
          description: error.message || "An error occurred during registration",
          variant: "destructive"
        });
      } else {
        console.log('Admin signup successful');
        toast({
          title: "Registration Successful! ✅",
          description: "Your admin account has been created. You can now log in with your credentials."
        });
        
        // Navigate to login after a short delay
        setTimeout(() => {
          navigate('/admin-login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Admin signup exception:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <Card className="glass-card border-civic-accent/20">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 bg-civic-accent/10 rounded-2xl flex items-center justify-center mx-auto glow">
            <User className="w-8 h-8 text-civic-accent" />
          </div>
          <CardTitle className="text-2xl font-bold text-civic-light font-space-grotesk">
            Create Admin Account
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-civic-light font-medium">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="pl-10 bg-inherit"
                />
              </div>
            </div>

            {/* Official Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-civic-light font-medium">
                Official Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.name@bbmp.gov.in"
                  required
                  className="pl-10 bg-inherit"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm animate-pulse">❌ {errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-civic-light font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="pl-10 bg-inherit"
                />
              </div>
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a secure password"
              error={errors.password}
              required
            />

            {/* Confirm Password */}
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            {/* Division Selector */}
            <DivisionSelect
              value={formData.division}
              onChange={handleDivisionChange}
              error={errors.division}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-civic-accent/90 text-civic-dark hover:bg-civic-accent border border-civic-accent/50 backdrop-blur-md py-6 text-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-civic-accent/25"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-civic-dark border-t-transparent"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Create Admin Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <div className="mt-4 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 p-3 rounded-xl">
        <p className="text-yellow-400 font-medium text-center text-sm">
          🔐 Secure Registration - All data is encrypted and verified
        </p>
      </div>
    </div>
  );
};

export default AdminSignUpForm;
