import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return <section className="relative py-32 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 bg-white/80"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <Badge className="mb-8 bg-blue-100 text-civic-accent border border-blue-200 px-6 py-2 text-lg font-medium">
            <Zap className="w-5 h-5 mr-2" />
            Bengaluru Civic Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-civic-dark font-space-grotesk">
            Report Civic Issues in{' '}
            <span className="text-civic-accent">Bengaluru</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-6 text-gray-600 font-medium">
            Fast • Easy • Transparent
          </p>
          
          <p className="text-lg mb-16 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Help make your city better with our civic reporting platform. 
            Report issues like bad roads, drainage problems, power cuts, and traffic 
            directly to the right authorities with real-time tracking.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/login">
              <Button size="lg" className="bg-civic-accent text-white hover:bg-civic-accent/90 py-6 px-10 text-lg font-semibold w-full sm:w-auto">
                <Camera className="w-6 h-6 mr-3" />
                Report an Issue
              </Button>
            </Link>
            
            <Link to="/admin-login">
              <Button size="lg" variant="outline" className="border-civic-accent text-civic-accent hover:bg-civic-accent hover:text-white py-6 px-10 text-lg font-semibold w-full sm:w-auto">
                <Shield className="w-6 h-6 mr-3" />
                Admin Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-lg card-shadow hover-lift border">
              <div className="text-3xl font-bold text-civic-accent mb-2">2,500+</div>
              <div className="text-gray-600">Issues Resolved</div>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow hover-lift border">
              <div className="text-3xl font-bold text-civic-accent mb-2">8</div>
              <div className="text-gray-600">BBMP Zones</div>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow hover-lift border">
              <div className="text-3xl font-bold text-civic-accent mb-2">24/7</div>
              <div className="text-gray-600">Active Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;