import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';
import { FeatureCard } from './FeatureCard';
import { FeatureCardProps } from './FeatureCard.types';

const renderFeatureCard = (props: Partial<FeatureCardProps> = {}) => {
  const defaultProps: FeatureCardProps = {
    title: 'Sample Title',
    description: 'Sample Description',
    dataTestId: 'feature-card',
  };

  render(
    <FeatureCard
      {...defaultProps}
      {...props}
    />
  );
};

jest.mock('framer-motion', () => {
  const originalModule = jest.requireActual('framer-motion');
  return {
    ...originalModule,
    motion: {
      ...originalModule.motion,
      div: jest.fn(({ whileHover, ...rest }) => (
        <div
          data-whilehover={JSON.stringify(whileHover)}
          {...rest}
        />
      )),
    },
  };
});

describe('FeatureCard Component', () => {
  test('Renders card with correct title and description', () => {
    renderFeatureCard({
      title: 'Test Title',
      description: 'Test Description',
    });

    const title = screen.getByText('Test Title');
    const description = screen.getByText('Test Description');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('Renders with correct data-testid attribute', () => {
    renderFeatureCard({ dataTestId: 'custom-feature-card' });

    const card = screen.getByTestId('custom-feature-card');
    expect(card).toBeInTheDocument();
  });

  test('Has correct initial classes for styling', () => {
    renderFeatureCard();

    const card = screen.getByTestId('feature-card');
    expect(card).toHaveClass(
      'bg-white p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-200 ease-in-out transform border border-gray-200'
    );
  });

  test('Applies hover animation styles', () => {
    const mockedDiv = motion.div as unknown as jest.Mock;
    render(
      <FeatureCard
        title="Test Title"
        description="Test Description"
        dataTestId="hover-card"
      />
    );

    expect(mockedDiv).toHaveBeenCalledWith(
      expect.objectContaining({
        whileHover: { scale: 1.05 },
        transition: { type: 'spring', stiffness: 200, damping: 20 },
      }),
      expect.anything()
    );
  });
});
