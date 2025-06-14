
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
}

const PasswordInput = ({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false 
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-civic-light font-medium">
        {label} {required && '*'}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-civic-accent" />
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="glass pl-10 pr-10 text-civic-light border-civic-accent/30 glow-border-focus"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-civic-accent hover:text-civic-light"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm animate-pulse">❌ {error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
