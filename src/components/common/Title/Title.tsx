import React from 'react';

interface TitleProps {
  title: string;
  className?: string;
  dataTestId?: string;
}

const Title: React.FC<TitleProps> = ({ title, className = '', dataTestId }) => {
  return (
    <h3
      className={`text-xl font-semibold text-gray-800 mb-4 ${className}`}
      data-testid={dataTestId}
    >
      {title}
    </h3>
  );
};

export default Title;
