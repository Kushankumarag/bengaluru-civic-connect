import { Card, CardContent } from '@/components/ui/card';
import { Construction, Droplets, Zap, Navigation } from 'lucide-react';
const IssueTypes = () => {
  const issueTypes = [{
    icon: Construction,
    label: 'Roads & Infrastructure',
    color: 'text-orange-600'
  }, {
    icon: Droplets,
    label: 'Drainage & Water',
    color: 'text-blue-600'
  }, {
    icon: Zap,
    label: 'Power & Utilities',
    color: 'text-yellow-600'
  }, {
    icon: Navigation,
    label: 'Traffic & Transport',
    color: 'text-green-600'
  }];
  return <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-civic-dark">
            What Can You Report?
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            From potholes to power cuts, we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {issueTypes.map((type, index) => <Card key={index} className="hover-lift transition-all duration-300 cursor-pointer group bg-white border card-shadow">
              <CardContent className="p-6 text-center">
                <type.icon className={`w-12 h-12 mx-auto mb-4 ${type.color} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="font-semibold text-civic-dark">{type.label}</h3>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default IssueTypes;