import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Header = () => {
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const languages = ['English', 'ಕನ್ನಡ', 'हिन्दी'];
  return <header className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover-scale">
          <div className="w-10 h-10 bg-civic-accent rounded-xl flex items-center justify-center glow">
            <Shield className="w-6 h-6 text-civic-dark" />
          </div>
          <span className="text-2xl font-bold text-civic-light font-space-grotesk">Urban Eye</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          
          
          <Link to="/signup">
            <Button className="glass-card hover:glow-hover text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300 bg-black text-white">
              User Sign Up
            </Button>
          </Link>
          
          <Link to="/login">
            <Button className="glass-card hover:glow-hover text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300 bg-black text-white">
              User Login
            </Button>
          </Link>
          
          <Link to="/admin-login">
            <Button className="bg-civic-accent/20 text-civic-accent border border-civic-accent hover:bg-civic-accent hover:text-civic-dark glow-hover transition-all duration-300 bg-black font-semibold text-white">
              Admin Login
            </Button>
          </Link>

          <Link to="/admin-signup">
            <Button className="bg-civic-accent text-civic-dark hover:bg-opacity-80 glow-hover transition-all duration-300 bg-black text-white">
              Admin Sign Up
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-civic-light hover:text-civic-accent transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden glass-card border-t border-civic-accent/20 p-4 space-y-4 animate-slide-up">
          <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full glass text-civic-light border-0 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-accent">
            {languages.map(lang => <option key={lang} value={lang} className="bg-civic-dark">{lang}</option>)}
          </select>
          
          <Link to="/signup" className="block">
            <Button className="w-full glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300">
              User Sign Up
            </Button>
          </Link>
          
          <Link to="/login" className="block">
            <Button className="w-full glass-card text-civic-accent border-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300">
              User Login
            </Button>
          </Link>
          
          <Link to="/admin-login" className="block">
            <Button className="w-full bg-civic-accent/20 text-civic-accent border border-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300">
              Admin Login
            </Button>
          </Link>

          <Link to="/admin-signup" className="block">
            <Button className="w-full bg-civic-accent text-civic-dark hover:bg-opacity-80 transition-all duration-300">
              Admin Sign Up
            </Button>
          </Link>
        </div>}
    </header>;
};
export default Header;