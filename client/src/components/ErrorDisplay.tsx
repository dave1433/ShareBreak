/**
 * Error display component
 * Shows error messages in a consistent format
 */

import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
  onDismiss?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 mt-4 flex justify-between items-center">
      <p className="m-0">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-red-700 hover:text-red-900 font-bold text-xl"
        >
          ×
        </button>
      )}
    </div>
  );
};

