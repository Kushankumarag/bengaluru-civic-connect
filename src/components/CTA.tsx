import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
const CTA = () => {
  return <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 civic-gradient opacity-10 bg-black"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="glass-card p-12 rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-civic-light font-space-grotesk">
            Ready to Make a <span className="text-civic-accent">Difference?</span>
          </h2>
          
          <p className="text-xl mb-10 text-civic-light/80 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Bengaluru citizens who are actively improving their city 
            through our smart reporting platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-civic-accent text-civic-dark hover:bg-opacity-90 glow-hover px-10 py-6 text-lg font-semibold transition-all duration-300 bg-black text-white">
                Get Started - Report Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Button size="lg" className="glass-card text-civic-accent border-2 border-civic-accent hover:bg-civic-accent hover:text-civic-dark px-10 py-6 font-semibold text-lg transition-all duration-300 bg-black text-white">
              <Download className="w-5 h-5 mr-2" />
              Download App (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;