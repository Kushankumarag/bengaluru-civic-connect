
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSignUpHeader = () => {
  return (
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
  );
};

export default AdminSignUpHeader;
