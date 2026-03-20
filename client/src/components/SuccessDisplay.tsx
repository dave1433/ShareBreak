import React from 'react';

interface SuccessDisplayProps {
  message: string | null;
  onDismiss?: () => void;
}

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-4 mt-4 flex justify-between items-center">
      <p className="m-0">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-green-700 hover:text-green-900 font-bold text-xl"
        >
          ×
        </button>
      )}
    </div>
  );
};

