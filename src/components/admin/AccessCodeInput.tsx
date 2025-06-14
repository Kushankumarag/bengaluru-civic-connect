
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key } from 'lucide-react';

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
      <Label htmlFor="accessCode" className="text-civic-light font-medium">
        Access Code *
      </Label>
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
    </div>
  );
};

export default AccessCodeInput;
