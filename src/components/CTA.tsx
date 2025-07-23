import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
const CTA = () => {
  return <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <div className="bg-white p-12 rounded-lg card-shadow-lg max-w-4xl mx-auto border">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-civic-dark font-space-grotesk">
            Ready to Make a <span className="text-civic-accent">Difference?</span>
          </h2>
          
          <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Bengaluru citizens who are actively improving their city 
            through our civic reporting platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-civic-accent text-white hover:bg-civic-accent/90 px-10 py-6 text-lg font-semibold">
                Get Started - Report Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="border-civic-accent text-civic-accent hover:bg-civic-accent hover:text-white px-10 py-6 font-semibold text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download App (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;