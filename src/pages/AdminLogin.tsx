
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, ArrowLeft, Building2, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear email error when user starts typing
    if (name === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleDivisionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      division: value
    }));
    
    // Clear division error when user selects
    if (errors.division) {
      setErrors(prev => ({ ...prev, division: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: '', division: '' };

    // Validate email domain
    if (formData.email && !formData.email.endsWith('.gov.in')) {
      newErrors.email = 'Official email must end with .gov.in';
    }

    // Validate division selection
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-civic-blue hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2 mx-auto">
            <div className="w-8 h-8 bg-civic-blue rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-civic-blue">Urban Eye</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Portal – BBMP & Civic Authority Login Only
            </h1>
            <p className="text-gray-600">Secure access for authorized government officials</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Civic Image */}
            <div className="hidden lg:block">
              <div className="bg-civic-light-blue rounded-lg p-8 h-full flex flex-col items-center justify-center">
                <Building2 className="w-32 h-32 text-civic-blue mb-6" />
                <h2 className="text-2xl font-bold text-civic-blue mb-4">BBMP Administration</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                  Secure portal for Bruhat Bengaluru Mahanagara Palike officials and civic authorities 
                  to manage and respond to citizen reports across all zones and divisions.
                </p>
                <div className="mt-6 text-sm text-gray-600">
                  <p className="font-semibold">Serving Bengaluru's 8 Major Zones:</p>
                  <p>East • West • South • Bommanahalli</p>
                  <p>RR Nagar • Dasarahalli • Yelahanka • Mahadevapura</p>
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full">
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="text-center bg-gray-50 rounded-t-lg">
                  <div className="w-16 h-16 bg-civic-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Official Login</CardTitle>
                  <p className="text-gray-600">Access restricted to authorized personnel</p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Official Email */}
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Official Email Address
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.name@bbmp.gov.in"
                          className="pl-10 border-gray-300 focus:border-civic-blue focus:ring-civic-blue"
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <Label htmlFor="password" className="text-gray-700 font-medium">
                        Password
                      </Label>
                      <div className="mt-1">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your secure password"
                          className="border-gray-300 focus:border-civic-blue focus:ring-civic-blue"
                          required
                        />
                      </div>
                    </div>

                    {/* Division Selector */}
                    <div>
                      <Label htmlFor="division" className="text-gray-700 font-medium">
                        Select Your Division / Zone
                      </Label>
                      <div className="mt-1">
                        <Select value={formData.division} onValueChange={handleDivisionChange}>
                          <SelectTrigger className="border-gray-300 focus:border-civic-blue focus:ring-civic-blue">
                            <SelectValue placeholder="Choose your assigned division/zone" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {divisions.map((division) => (
                              <SelectItem key={division} value={division}>
                                {division}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.division && (
                        <p className="text-red-600 text-sm mt-1">{errors.division}</p>
                      )}
                    </div>

                    {/* Access Code */}
                    <div>
                      <Label htmlFor="accessCode" className="text-gray-700 font-medium">
                        Access Code
                      </Label>
                      <div className="mt-1">
                        <Input
                          id="accessCode"
                          name="accessCode"
                          type="password"
                          value={formData.accessCode}
                          onChange={handleInputChange}
                          placeholder="Enter security access code"
                          className="border-gray-300 focus:border-civic-blue focus:ring-civic-blue"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-civic-blue hover:bg-civic-blue/90 text-white py-3 text-lg font-medium"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Secure Login
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="mt-6 text-center text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="font-medium text-yellow-800">
                  ⚠️ Unauthorized access is prohibited. All logins are monitored.
                </p>
                <p className="mt-1">
                  This system is for official BBMP and civic authority use only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
