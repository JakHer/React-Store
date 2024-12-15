import React from 'react';
import clsx from 'clsx';
interface ButtonProps {
  text: string;
  className?: string;
  dataTestId?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({
  text,
  className = '',
  dataTestId,
  onClick,
  disabled = false,
  ariaLabel,
  variant = 'primary',
}) => {
  const baseClasses =
    'text-sm font-medium py-2 px-4 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    tertiary:
      'bg-transparent text-blue-500 hover:text-blue-600 border border-blue-500 focus:ring-blue-500',
  };
  const disabledClasses = 'bg-gray-400 cursor-not-allowed text-gray-700';

  const buttonClasses = clsx(
    baseClasses,
    disabled ? disabledClasses : variantClasses[variant],
    className
  );

  return (
    <button
      className={buttonClasses}
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
    >
      {text}
    </button>
  );
};

export default Button;
