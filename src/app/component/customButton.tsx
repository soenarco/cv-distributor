'use client';

import { useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';

interface CustomButtonProps {
  buttonText: string;
  className?: string;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CustomButton({
  onClick,
  buttonText = '',
  className = '',
  isDisabled = false,
}: CustomButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    await onClick(event); 
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      type="button"
      className={`flex items-center justify-center ${className} ${
        isDisabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <ImSpinner9 className="animate-spin h-5 w-5 mr-2" />
      ) : (
        buttonText
      )}
    </button>
  );
}
