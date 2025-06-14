import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, ArrowLeft, Building2, Lock, Mail, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import DivisionSelect from '@/components/admin/DivisionSelect';
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accessCode: '',
    division: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    division: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'email' && errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
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
      division: ''
    };
    if (formData.email && !formData.email.endsWith('.gov.in')) {
      newErrors.email = 'Official email must end with .gov.in';
    }
    if (!formData.division) {
      newErrors.division = 'Please select your division/zone';
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.division;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Admin login form submitted:', formData);
      // TODO: Handle admin login
    }
  };
  return <div className="min-h-screen bg-civic-dark">
      {/* Header */}
      <header className="glass-nav">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-civic-accent hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-civic-light mb-4 font-space-grotesk">
              Admin Portal – <span className="text-civic-accent">BBMP & Civic Authority</span>
            </h1>
            <p className="text-civic-light/70 text-lg">Secure access for authorized government officials</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Civic Info */}
            <div className="glass-card p-8 rounded-2xl animate-fade-in-up">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-civic-accent/10 rounded-2xl flex items-center justify-center mx-auto glow">
                  <Building2 className="w-12 h-12 text-civic-accent" />
                </div>
                
                <h2 className="text-3xl font-bold text-civic-light font-space-grotesk">
                  BBMP Administration
                </h2>
                
                <p className="text-civic-light/70 leading-relaxed text-lg">
                  Secure portal for Bruhat Bengaluru Mahanagara Palike officials and civic authorities 
                  to manage and respond to citizen reports across all zones and divisions.
                </p>
                
                <div className="space-y-4 text-civic-light/60">
                  <p className="font-semibold text-civic-accent">Serving Bengaluru's 8 Major Zones:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>• East Zone</span>
                    <span>• West Zone</span>
                    <span>• South Zone</span>
                    <span>• Bommanahalli</span>
                    <span>• RR Nagar</span>
                    <span>• Dasarahalli</span>
                    <span>• Yelahanka</span>
                    <span>• Mahadevapura</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="animate-fade-in-up" style={{
            animationDelay: '0.2s'
          }}>
              <Card className="glass-card border-civic-accent/20">
                <CardHeader className="text-center space-y-4">
                  <div className="w-20 h-20 bg-civic-accent/10 rounded-2xl flex items-center justify-center mx-auto glow">
                    <Lock className="w-10 h-10 text-civic-accent" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-civic-light font-space-grotesk">
                    Official Login
                  </CardTitle>
                  <p className="text-civic-light/70">Access restricted to authorized personnel</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Official Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-civic-light font-medium">
                        Official Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-civic-accent" />
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.name@bbmp.gov.in" required className="pl-12 bg-inherit" />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm animate-pulse">❌ {errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-civic-light font-medium">
                        Password
                      </Label>
                      <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your secure password" required className="bg-inherit" />
                    </div>

                    {/* Division Selector - Using the same component as signup */}
                    <DivisionSelect value={formData.division} onChange={handleDivisionChange} error={errors.division} />

                    {/* Access Code */}
                    <div className="space-y-2">
                      <Label htmlFor="accessCode" className="text-civic-light font-medium">
                        Access Code
                      </Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 w-5 h-5 text-civic-accent" />
                        <Input id="accessCode" name="accessCode" type="password" value={formData.accessCode} onChange={handleInputChange} placeholder="Enter security access code" required className="pl-12 bg-inherit" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-civic-accent/90 text-civic-dark hover:bg-civic-accent border border-civic-accent/50 backdrop-blur-md py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-civic-accent/25">
                      <Shield className="w-5 h-5 mr-2" />
                      Secure Login
                    </Button>

                    <div className="text-center text-civic-light/70">
                      New admin?{' '}
                      <Link to="/admin-signup" className="text-civic-accent hover:text-civic-accent/80 font-medium transition-colors">
                        Register here
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="mt-6 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 p-4 rounded-xl">
                <p className="text-yellow-400 font-medium text-center text-sm">
                  ⚠️ Unauthorized access is prohibited. All logins are monitored.
                </p>
                <p className="text-civic-light/60 text-center text-sm mt-1">
                  This system is for official BBMP and civic authority use only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminLogin;