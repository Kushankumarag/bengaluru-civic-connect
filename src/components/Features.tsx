import { MapPin, Users, Globe, Share2 } from 'lucide-react';
const Features = () => {
  const features = [{
    icon: MapPin,
    title: 'Auto-Location Detection',
    description: 'GPS-powered precise location tracking for faster resolution'
  }, {
    icon: Users,
    title: 'ML-Powered Classification',
    description: 'Smart issue categorization and automatic department routing'
  }, {
    icon: Globe,
    title: 'Public Issue Map',
    description: 'Real-time map showing reported issues and their status'
  }, {
    icon: Share2,
    title: 'Social Media Integration',
    description: 'Auto-tag relevant authorities on Twitter and Facebook'
  }];
  return <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-civic-dark">Why Choose Urban Eye?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced technology meets civic responsibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-civic-accent transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-civic-accent group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-civic-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Features;