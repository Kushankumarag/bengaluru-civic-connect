import { Building2 } from 'lucide-react';
const AdminSignUpInfo = () => {
  return <div className="glass-card p-6 rounded-2xl animate-fade-in-up">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-civic-accent/10 rounded-2xl flex items-center justify-center mx-auto glow">
          <Building2 className="w-10 h-10 text-civic-accent" />
        </div>
        
        <h2 className="text-2xl font-bold text-civic-light font-space-grotesk">
          Join BBMP Administration
        </h2>
        
        <p className="text-civic-light/70 leading-relaxed">
          Register as an authorized BBMP official to manage and respond to citizen complaints 
          across Bengaluru's civic zones.
        </p>
        
        <div className="space-y-3 text-civic-light/60 text-sm">
          
        </div>
      </div>
    </div>;
};
export default AdminSignUpInfo;