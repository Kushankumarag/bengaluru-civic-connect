import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, User, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DivisionSelect from './DivisionSelect';
import PasswordInput from './PasswordInput';
import AccessCodeInput from './AccessCodeInput';
const AdminSignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    division: '',
    accessCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accessCode: '',
    division: ''
  });
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const generateAccessCode = (division: string) => {
    if (!division) return '';
    const divisionName = division.split(' ')[0];
    const prefix = divisionName.substring(0, 4).toUpperCase();
    return `${prefix}-2025`;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
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
      division: value,
      accessCode: ''
    }));
    if (errors.division) {
      setErrors(prev => ({
        ...prev,
        division: ''
      }));
    }
  };
  const validateAccessCode = () => {
    if (!formData.division || !formData.accessCode) return false;
    const expectedCode = generateAccessCode(formData.division);
    return formData.accessCode === expectedCode;
  };
  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      accessCode: '',
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
    if (!validateAccessCode()) {
      newErrors.accessCode = 'Invalid access code for selected division';
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const {
        data: authData,
        error: authError
      } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin-dashboard`,
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      });
      if (authError) throw authError;
      if (authData.user) {
        const {
          error: profileError
        } = await supabase.from('admin_profiles').insert({
          id: authData.user.id,
          full_name: formData.fullName,
          email: formData.email,
          division: formData.division,
          access_code: formData.accessCode
        });
        if (profileError) throw profileError;
        toast({
          title: "Registration Successful! ✅",
          description: "Your admin account has been created. Please check your email to verify your account."
        });
        navigate('/admin-login');
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="animate-fade-in-up" style={{
    animationDelay: '0.2s'
  }}>
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
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" required className="pl-10 bg-inherit" />
              </div>
            </div>

            {/* Official Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-civic-light font-medium">
                Official Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.name@bbmp.gov.in" required className="pl-10 bg-inherit" />
              </div>
              {errors.email && <p className="text-red-400 text-sm animate-pulse">❌ {errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-civic-light font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className="pl-10 bg-inherit" />
              </div>
            </div>

            {/* Password */}
            <PasswordInput id="password" name="password" label="Password" value={formData.password} onChange={handleInputChange} placeholder="Create a secure password" error={errors.password} required />

            {/* Confirm Password */}
            <PasswordInput id="confirmPassword" name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" error={errors.confirmPassword} required />

            {/* Division Selector */}
            <DivisionSelect value={formData.division} onChange={handleDivisionChange} error={errors.division} />

            {/* Access Code */}
            <AccessCodeInput value={formData.accessCode} onChange={handleInputChange} division={formData.division} error={errors.accessCode} />

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full bg-civic-accent/90 text-civic-dark hover:bg-civic-accent border border-civic-accent/50 backdrop-blur-md py-6 text-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-civic-accent/25">
              {isLoading ? <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-civic-dark border-t-transparent"></div>
                  <span>Creating Account...</span>
                </div> : <>
                  <Shield className="w-5 h-5 mr-2" />
                  Create Admin Account
                </>}
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
    </div>;
};
export default AdminSignUpForm;