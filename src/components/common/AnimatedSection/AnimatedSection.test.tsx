import { render, screen } from '@testing-library/react';
import { motion, MotionProps } from 'framer-motion';
import { jest } from '@jest/globals';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { AnimatedSection } from './AnimatedSection';

jest.mock('framer-motion', () => {
  const originalModule =
    jest.requireActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...originalModule,
    motion: {
      ...originalModule.motion,
      section: jest.fn(
        (
          props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
            MotionProps
        ) => (
          <section
            {...props}
            role="region"
          />
        )
      ),
    },
  };
});

describe('AnimatedSection Component', () => {
  test('Renders children correctly', () => {
    render(
      <AnimatedSection>
        <p>Test Child</p>
      </AnimatedSection>
    );

    const child = screen.getByText('Test Child');
    expect(child).toBeInTheDocument();
  });

  test('Applies default and additional classNames correctly', () => {
    render(
      <AnimatedSection className="extra-class">
        <p>Test Child</p>
      </AnimatedSection>
    );

    const section = screen.getByRole('region');

    expect(section).toHaveClass('py-20', 'px-6', 'md:px-12', 'extra-class');
  });

  test('Sets animation properties correctly', () => {
    const mockedSection = motion.section as unknown as jest.Mock;

    render(
      <AnimatedSection delay={0.5}>
        <p>Test Child</p>
      </AnimatedSection>
    );

    expect(mockedSection).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, delay: 0.5 },
      }),
      expect.anything()
    );
  });

  test('Passes additional props to the section element', () => {
    render(
      <AnimatedSection
        id="test-id"
        aria-label="animated-section"
      >
        <p>Test Child</p>
      </AnimatedSection>
    );

    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'test-id');
    expect(section).toHaveAttribute('aria-label', 'animated-section');
  });
});
