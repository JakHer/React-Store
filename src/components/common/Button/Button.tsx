import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  dataTestId?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className = '',
  dataTestId,
  onClick,
  disabled,
}) => {
  const bgColorClass = className.includes('bg-') ? className : 'bg-gray-200';

  const buttonBgClass = disabled
    ? 'bg-gray-400 cursor-not-allowed'
    : bgColorClass;

  return (
    <button
      className={`text-gray-800 py-2 px-4 rounded-full text-sm hover:opacity-80 transition-all ${buttonBgClass} ${className}`}
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
