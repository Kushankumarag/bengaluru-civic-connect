
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 civic-gradient-subtle"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-civic-accent rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-civic-accent rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-civic-accent rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-civic-accent rounded-full animate-float opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <Badge className="mb-8 glass-card text-civic-accent border-civic-accent/30 px-6 py-2 text-lg font-medium">
            <Zap className="w-5 h-5 mr-2" />
            Bengaluru Civic Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-civic-light font-space-grotesk">
            Report Civic Issues in{' '}
            <span className="text-civic-accent animate-glow">Bengaluru</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-6 text-civic-accent font-medium">
            Fast • Easy • Transparent
          </p>
          
          <p className="text-lg mb-16 text-civic-light/80 max-w-3xl mx-auto leading-relaxed">
            Help make your city better with our advanced civic reporting platform. 
            Report issues like bad roads, drainage problems, power cuts, and traffic 
            directly to the right authorities with real-time tracking.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/login">
              <Button 
                size="lg" 
                className="glass-card text-civic-accent border-2 border-civic-accent hover:bg-civic-accent hover:text-civic-dark glow-hover py-6 px-10 text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                <Camera className="w-6 h-6 mr-3" />
                Report an Issue
              </Button>
            </Link>
            
            <Link to="/admin-login">
              <Button 
                size="lg" 
                className="bg-civic-accent text-civic-dark hover:bg-opacity-90 glow-hover py-6 px-10 text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                <Shield className="w-6 h-6 mr-3" />
                Admin Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl font-bold text-civic-accent mb-2">2,500+</div>
              <div className="text-civic-light/70">Issues Resolved</div>
            </div>
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl font-bold text-civic-accent mb-2">8</div>
              <div className="text-civic-light/70">BBMP Zones</div>
            </div>
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl font-bold text-civic-accent mb-2">24/7</div>
              <div className="text-civic-light/70">Active Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
