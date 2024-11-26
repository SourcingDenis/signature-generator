import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  isDark?: boolean;
}

export function Input({ label, value, onChange, placeholder, icon, isDark }: InputProps) {
  const [hasFocused, setHasFocused] = React.useState(false);

  const handleFocus = () => {
    if (!hasFocused) {
      onChange('');
      setHasFocused(true);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-[#666] dark:text-[#888]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#999] dark:text-[#666]">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          className={`vercel-input h-9 ${icon ? 'pl-9' : ''}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}