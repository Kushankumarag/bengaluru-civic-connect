
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-20 px-4 civic-gradient text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">🏛️  Bengaluru Civic Platform</Badge>
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
            <Link to="/login">
              <Button size="lg" className="bg-white text-civic-blue hover:bg-gray-100 py-4 text-lg font-semibold w-full sm:w-auto px-[28px]">
                <Camera className="w-5 h-5 mr-2" />
                📸 Report an Issue (User Login)
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-civic-blue px-8 py-4 text-lg font-semibold w-full sm:w-auto text-blue-700">
                <Shield className="w-5 h-5 mr-2" />
                🔐 Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
