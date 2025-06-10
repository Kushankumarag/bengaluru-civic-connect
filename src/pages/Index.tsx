import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Shield, Construction, Droplets, Zap, Navigation, MapPin, Users, Share2, Globe, Menu, X } from 'lucide-react';
const Index = () => {
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const languages = ['English', 'ಕನ್ನಡ', 'हिन्दी'];
  const issueTypes = [{
    icon: Construction,
    label: 'Roads & Infrastructure',
    color: 'text-orange-600'
  }, {
    icon: Droplets,
    label: 'Drainage & Water',
    color: 'text-blue-600'
  }, {
    icon: Zap,
    label: 'Power & Utilities',
    color: 'text-yellow-600'
  }, {
    icon: Navigation,
    label: 'Traffic & Transport',
    color: 'text-green-600'
  }];
  const features = [{
    icon: MapPin,
    title: 'Auto-Location Detection',
    description: 'GPS-powered precise location tracking for faster resolution'
  }, {
    icon: Users,
    title: 'ML-Powered Classification',
    description: 'Smart issue categorization and automatic department routing'
  }, {
    icon: Globe,
    title: 'Public Issue Map',
    description: 'Real-time map showing reported issues and their status'
  }, {
    icon: Share2,
    title: 'Social Media Integration',
    description: 'Auto-tag relevant authorities on Twitter and Facebook'
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-civic-blue rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-civic-blue">Urban Eye </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <select value={language} onChange={e => setLanguage(e.target.value)} className="bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue">
              {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="md:hidden bg-white border-t p-4">
            <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue">
              {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 civic-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">🏛️  Bengaluru Civic Platform</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Report Civic Issues in Bengaluru
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Fast, Easy, Transparent
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
              Help make your city better. Report issues like bad roads, drainage problems, 
              power cuts, and traffic directly to the right authorities.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-civic-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                <Camera className="w-5 h-5 mr-2" />
                📸 Report an Issue (User Login)
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-civic-blue px-8 py-4 text-lg font-semibold w-full sm:w-auto text-blue-700">
                <Shield className="w-5 h-5 mr-2" />
                🔐 Admin Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Issue Types */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What Can You Report?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From potholes to power cuts, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {issueTypes.map((type, index) => <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <type.icon className={`w-12 h-12 mx-auto mb-4 ${type.color} group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="font-semibold text-gray-900">{type.label}</h3>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose Urban Eye?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced technology meets civic responsibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-civic-light-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-civic-blue transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-civic-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-civic-blue text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">250+</div>
              <div className="text-blue-100">Issues Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Issues Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">74%</div>
              <div className="text-blue-100">Resolution Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7 days</div>
              <div className="text-blue-100">Avg. Resolution Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-civic-green text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Bengaluru citizens who are actively improving their city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-civic-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Get Started - Report Now
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-civic-green px-8 py-4 text-lg font-semibold text-[#34bf1d]">
              Download Mobile App (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-civic-blue rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Namma Bengaluru</span>
              </div>
              <p className="text-gray-400">
                Making Bengaluru better, one report at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Public Map</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  📘 Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  🐦 Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  📧 Email
                </a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-sm">📞 Helpline: +91 89XXX XXX86</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Urban Eye . All rights reserved. | A citizen-first initiative.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;