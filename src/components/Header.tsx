
import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = ['English', 'ಕನ್ನಡ', 'हिन्दी'];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-civic-blue rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-civic-blue">Urban Eye </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <select 
            value={language} 
            onChange={e => setLanguage(e.target.value)} 
            className="bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue"
          >
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <Link to="/signup">
            <Button variant="outline" size="sm" className="border-civic-blue text-civic-blue hover:bg-civic-blue hover:text-white">
              Sign Up
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <select 
            value={language} 
            onChange={e => setLanguage(e.target.value)} 
            className="w-full bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue"
          >
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <Link to="/signup" className="block">
            <Button variant="outline" className="w-full border-civic-blue text-civic-blue hover:bg-civic-blue hover:text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
