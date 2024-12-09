import React from 'react';

interface ParagraphProps {
  text: string;
  className?: string;
  dataTestId?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  text,
  className = '',
  dataTestId,
}) => {
  return (
    <p className={`text-gray-600 ${className}`} data-testid={dataTestId}>
      {text}
    </p>
  );
};

export default Paragraph;
