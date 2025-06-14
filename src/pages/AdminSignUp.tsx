
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, ArrowLeft, Building2, Lock, Mail, Key, User, Phone, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    division: '',
    accessCode: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accessCode: '',
    division: ''
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const divisions = [
    'East Zone – Indiranagar',
    'East Zone – C.V. Raman Nagar',
    'East Zone – Jeevanbhima Nagar',
    'West Zone – Rajajinagar',
    'West Zone – Govindarajanagar',
    'West Zone – Vijayanagar',
    'South Zone – Basavanagudi',
    'South Zone – Jayanagar',
    'South Zone – Banashankari',
    'Bommanahalli Zone – BTM Layout',
    'Bommanahalli Zone – HSR Layout',
    'Bommanahalli Zone – Begur',
    'Rajarajeshwari Nagar Zone – Kengeri',
    'Rajarajeshwari Nagar Zone – R.R. Nagar',
    'Rajarajeshwari Nagar Zone – Ullalu',
    'Dasarahalli Zone – Bagalagunte',
    'Dasarahalli Zone – Jalahalli',
    'Dasarahalli Zone – T. Dasarahalli',
    'Yelahanka Zone – Yelahanka',
    'Yelahanka Zone – Byatarayanapura',
    'Yelahanka Zone – Attur',
    'Mahadevapura Zone – Whitefield',
    'Mahadevapura Zone – Marathahalli',
    'Mahadevapura Zone – KR Puram'
  ];

  const generateAccessCode = (division: string) => {
    if (!division) return '';
    
    // Extract first 4 letters from division name
    const divisionName = division.split(' ')[0]; // Get first word before space/dash
    const prefix = divisionName.substring(0, 4).toUpperCase();
    return `${prefix}-2025`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDivisionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      division: value,
      accessCode: '' // Clear access code when division changes
    }));
    
    if (errors.division) {
      setErrors(prev => ({ ...prev, division: '' }));
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

    // Email validation
    if (formData.email && !formData.email.endsWith('.gov.in')) {
      newErrors.email = 'Official email must end with .gov.in';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Division validation
    if (!formData.division) {
      newErrors.division = 'Please select your division';
    }

    // Access code validation
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
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
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
        // Create admin profile
        const { error: profileError } = await supabase
          .from('admin_profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            email: formData.email,
            division: formData.division,
            access_code: formData.accessCode
          });

        if (profileError) throw profileError;

        toast({
          title: "Registration Successful! ✅",
          description: "Your admin account has been created. Please check your email to verify your account.",
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

  return (
    <div className="min-h-screen bg-civic-dark">
      {/* Header */}
      <header className="glass-nav">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/admin-login" className="flex items-center space-x-2 text-civic-accent hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Login</span>
          </Link>
          <div className="flex items-center space-x-3 mx-auto">
            <div className="w-8 h-8 bg-civic-accent rounded-xl flex items-center justify-center glow">
              <Shield className="w-5 h-5 text-civic-dark" />
            </div>
            <span className="text-xl font-bold text-civic-light font-space-grotesk">Urban Eye</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-civic-light mb-2 font-space-grotesk">
              Admin Registration – <span className="text-civic-accent">BBMP Portal</span>
            </h1>
            <p className="text-civic-light/70">Join the civic administration team</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Info */}
            <div className="glass-card p-6 rounded-2xl animate-fade-in-up">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-civic-accent/10 rounded-2xl flex items-center justify-center mx-auto glow">
                  <Building2 className="w-10 h-10 text-civic-accent" />
                </div>
                
                <h2 className="text-2xl font-bold text-civic-light font-space-grotesk">
                  Join BBMP Administration
                </h2>
                
                <p className="text-civic-light/70 leading-relaxed">
                  Register as an authorized BBMP official to manage and respond to citizen complaints 
                  across Bengaluru's civic zones.
                </p>
                
                <div className="space-y-3 text-civic-light/60 text-sm">
                  <div className="glass p-3 rounded-lg">
                    <p className="font-semibold text-civic-accent mb-2">Access Code Format:</p>
                    <p>First 4 letters of division + "-2025"</p>
                    <p className="text-civic-accent text-xs mt-1">Example: BOMM-2025 for Bommanahalli</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
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
                          className="glass pl-10 text-civic-light border-civic-accent/30 glow-border-focus"
                          required
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
                          className="glass pl-10 text-civic-light border-civic-accent/30 glow-border-focus"
                          required
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
                          className="glass pl-10 text-civic-light border-civic-accent/30 glow-border-focus"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-civic-light font-medium">
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a secure password"
                          className="glass pl-10 pr-10 text-civic-light border-civic-accent/30 glow-border-focus"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-civic-accent hover:text-civic-light"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm animate-pulse">❌ {errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-civic-light font-medium">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          className="glass pl-10 pr-10 text-civic-light border-civic-accent/30 glow-border-focus"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-civic-accent hover:text-civic-light"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm animate-pulse">❌ {errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Division Selector */}
                    <div className="space-y-2">
                      <Label htmlFor="division" className="text-civic-light font-medium">
                        BBMP Division *
                      </Label>
                      <Select value={formData.division} onValueChange={handleDivisionChange}>
                        <SelectTrigger className="glass text-civic-light border-civic-accent/30 glow-border-focus">
                          <SelectValue placeholder="Select your assigned division" />
                        </SelectTrigger>
                        <SelectContent className="glass bg-civic-dark border-civic-accent/30 max-h-60">
                          {divisions.map((division) => (
                            <SelectItem 
                              key={division} 
                              value={division}
                              className="text-civic-light hover:bg-civic-accent/20 focus:bg-civic-accent/20"
                            >
                              {division}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.division && (
                        <p className="text-red-400 text-sm animate-pulse">❌ {errors.division}</p>
                      )}
                    </div>

                    {/* Access Code */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="accessCode" className="text-civic-light font-medium">
                          Access Code *
                        </Label>
                        <div className="group relative">
                          <HelpCircle className="w-4 h-4 text-civic-accent cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-civic-dark border border-civic-accent/30 rounded-md text-xs text-civic-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {formData.division ? `Expected: ${generateAccessCode(formData.division)}` : 'Select division first'}
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
                        <Input
                          id="accessCode"
                          name="accessCode"
                          value={formData.accessCode}
                          onChange={handleInputChange}
                          placeholder={formData.division ? generateAccessCode(formData.division) : "Select division first"}
                          className="glass pl-10 text-civic-light border-civic-accent/30 glow-border-focus"
                          required
                        />
                      </div>
                      {errors.accessCode && (
                        <p className="text-red-400 text-sm animate-pulse">❌ {errors.accessCode}</p>
                      )}
                      {formData.division && (
                        <p className="text-civic-accent text-xs">
                          Expected format: {generateAccessCode(formData.division)}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-civic-accent text-civic-dark hover:bg-civic-accent/90 glow-hover py-6 text-lg font-semibold transition-all duration-300 disabled:opacity-50"
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
              <div className="mt-4 glass-card p-3 rounded-xl border-yellow-500/30">
                <p className="text-yellow-400 font-medium text-center text-sm">
                  🔐 Secure Registration - All data is encrypted and verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
