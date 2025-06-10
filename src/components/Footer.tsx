import { Shield } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-civic-blue rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Urban Eye</span>
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
    </footer>;
};
export default Footer;