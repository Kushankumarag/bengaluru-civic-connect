
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const FilterSelect = ({ label, value, onValueChange, options, placeholder }: FilterSelectProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-civic-light">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="glass text-civic-light border-civic-accent/30 glow-border-focus">
          <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-civic-dark/95 backdrop-blur-md border-civic-accent/30 z-50">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="text-civic-light hover:bg-civic-accent/30 focus:bg-civic-accent/30 cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
