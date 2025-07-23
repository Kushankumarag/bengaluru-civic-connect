import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Header = () => {
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const languages = ['English', 'ಕನ್ನಡ', 'हिन्दी'];
  return <header className="sticky top-0 z-50 header-shadow bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover-scale">
          <div className="w-10 h-10 bg-civic-accent rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-civic-dark font-space-grotesk">Urban Eye</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          
          
          <Link to="/signup">
            <Button variant="outline" className="text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-white">
              User Sign Up
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" className="text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-white">
              User Login
            </Button>
          </Link>
          
          <Link to="/admin-login">
            <Button variant="outline" className="text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-white">
              Admin Login
            </Button>
          </Link>

          <Link to="/admin-signup">
            <Button className="bg-civic-accent text-white hover:bg-civic-accent/90">
              Admin Sign Up
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-civic-dark hover:text-civic-accent transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-4 animate-slide-up">
          <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-accent focus:border-civic-accent">
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          
          <Link to="/signup" className="block">
            <Button variant="outline" className="w-full text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-white">
              User Sign Up
            </Button>
          </Link>
          
          <Link to="/login" className="block">
            <Button variant="outline" className="w-full text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-white">
              User Login
            </Button>
          </Link>
          
          <Link to="/admin-login" className="block">
            <Button variant="outline" className="w-full text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-white">
              Admin Login
            </Button>
          </Link>

          <Link to="/admin-signup" className="block">
            <Button className="w-full bg-civic-accent text-white hover:bg-civic-accent/90">
              Admin Sign Up
            </Button>
          </Link>
        </div>}
    </header>;
};
export default Header;