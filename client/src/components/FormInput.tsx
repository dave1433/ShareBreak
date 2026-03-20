/**
 * Reusable form input component
 * Provides consistent styling and behavior across forms
 */

import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = true,
  disabled = false,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium text-black">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

