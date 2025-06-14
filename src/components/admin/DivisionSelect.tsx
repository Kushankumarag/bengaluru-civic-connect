
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DivisionSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const divisions = [
  'East Zone – Indiranagar',
  'East Zone – C.V. Raman Nagar',
  'East Zone – Jeevanbhima Nagar',
  'West Zone – Rajajinagar',
  'West Zone – Govindarajanagar',
  'West Zone – Vijayanagar',
  'South Zone – Basavanagudi',
  'South Zone – Jayanagar',
  'South Zone – Banashankari',
  'Bommanahalli Zone – BTM Layout',
  'Bommanahalli Zone – HSR Layout',
  'Bommanahalli Zone – Begur',
  'Rajarajeshwari Nagar Zone – Kengeri',
  'Rajarajeshwari Nagar Zone – R.R. Nagar',
  'Rajarajeshwari Nagar Zone – Ullalu',
  'Dasarahalli Zone – Bagalagunte',
  'Dasarahalli Zone – Jalahalli',
  'Dasarahalli Zone – T. Dasarahalli',
  'Yelahanka Zone – Yelahanka',
  'Yelahanka Zone – Byatarayanapura',
  'Yelahanka Zone – Attur',
  'Mahadevapura Zone – Whitefield',
  'Mahadevapura Zone – Marathahalli',
  'Mahadevapura Zone – KR Puram'
];

const DivisionSelect = ({ value, onChange, error }: DivisionSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="division" className="text-civic-light font-medium">
        BBMP Division *
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="glass text-civic-light border-civic-accent/30 glow-border-focus">
          <SelectValue placeholder="Select your assigned division" />
        </SelectTrigger>
        <SelectContent className="bg-civic-dark/95 backdrop-blur-md border-civic-accent/30 max-h-60 z-50">
          {divisions.map((division) => (
            <SelectItem 
              key={division} 
              value={division}
              className="text-civic-light hover:bg-civic-accent/30 focus:bg-civic-accent/30 cursor-pointer px-3 py-2 bg-civic-dark/80"
            >
              {division}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-400 text-sm animate-pulse">❌ {error}</p>
      )}
    </div>
  );
};

export default DivisionSelect;
