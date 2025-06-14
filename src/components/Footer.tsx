
import { Shield, Github, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-nav py-16 px-4 border-t border-civic-accent/20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-civic-accent rounded-xl flex items-center justify-center glow">
                <Shield className="w-6 h-6 text-civic-dark" />
              </div>
              <span className="text-2xl font-bold text-civic-light font-space-grotesk">Urban Eye</span>
            </div>
            <p className="text-civic-light/70 leading-relaxed">
              Making Bengaluru better, one report at a time. Advanced civic technology for modern cities.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-civic-light text-lg">Quick Links</h3>
            <ul className="space-y-3 text-civic-light/70">
              <li><a href="#" className="hover:text-civic-accent transition-colors">Report Issue</a></li>
              <li><a href="#" className="hover:text-civic-accent transition-colors">Track Status</a></li>
              <li><a href="#" className="hover:text-civic-accent transition-colors">Public Map</a></li>
              <li><a href="#" className="hover:text-civic-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-civic-light text-lg">Support</h3>
            <ul className="space-y-3 text-civic-light/70">
              <li><a href="#" className="hover:text-civic-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-civic-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-civic-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-civic-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-civic-light text-lg">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="glass-card p-3 rounded-lg text-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="glass-card p-3 rounded-lg text-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="glass-card p-3 rounded-lg text-civic-accent hover:bg-civic-accent hover:text-civic-dark transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-civic-light/70">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Helpline: +91 89XXX XXX86</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-civic-accent/20 mt-12 pt-8 text-center">
          <p className="text-civic-light/60">
            © 2025 Urban Eye. All rights reserved. | A citizen-first tech initiative.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
