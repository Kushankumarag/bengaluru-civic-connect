
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, HelpCircle } from 'lucide-react';

interface AccessCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  division: string;
  error?: string;
}

const generateAccessCode = (division: string) => {
  if (!division) return '';
  
  const divisionName = division.split(' ')[0];
  const prefix = divisionName.substring(0, 4).toUpperCase();
  return `${prefix}-2025`;
};

const AccessCodeInput = ({ value, onChange, division, error }: AccessCodeInputProps) => {
  const expectedCode = generateAccessCode(division);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="accessCode" className="text-civic-light font-medium">
          Access Code *
        </Label>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-civic-accent cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-civic-dark border border-civic-accent/30 rounded-md text-xs text-civic-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {division ? `Expected: ${expectedCode}` : 'Select division first'}
          </div>
        </div>
      </div>
      <div className="relative">
        <Key className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
        <Input
          id="accessCode"
          name="accessCode"
          value={value}
          onChange={onChange}
          placeholder={division ? expectedCode : "Select division first"}
          className="glass pl-10 text-civic-light border-civic-accent/30 glow-border-focus"
          required
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm animate-pulse">❌ {error}</p>
      )}
      {division && (
        <p className="text-civic-accent text-xs">
          Expected format: {expectedCode}
        </p>
      )}
    </div>
  );
};

export default AccessCodeInput;
