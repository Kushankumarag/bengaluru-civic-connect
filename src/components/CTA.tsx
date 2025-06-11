import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const CTA = () => {
  return <section className="py-16 px-4 bg-civic-green text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of Bengaluru citizens who are actively improving their city
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-civic-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Get Started - Report Now
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-civic-green text-[#34bf1d] px-[38px] py-[18px] font-semibold text-lg text-justify">      Download App -(Coming Soon)</Button>
        </div>
      </div>
    </section>;
};
export default CTA;