/**
 * Reusable form button component
 * Provides consistent styling and behavior for form submission
 */

import React from 'react';

interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = 'submit',
  onClick,
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full font-semibold p-4 bg-purple text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-6 hover:opacity-90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? loadingText : children}
    </button>
  );
};

