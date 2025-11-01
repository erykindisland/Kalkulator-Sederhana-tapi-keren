
import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'number' | 'operator' | 'special';
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'number',
}) => {
  const baseClasses = "h-20 w-full rounded-full text-3xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-150 transform active:scale-95 shadow-md";

  const variantClasses = {
    number: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
    operator: 'bg-orange-500 text-white hover:bg-orange-400 focus:ring-orange-400 text-4xl',
    special: 'bg-gray-500 text-black hover:bg-gray-400 focus:ring-gray-400',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
