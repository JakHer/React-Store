export interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    [key: string]: any;
  }
  
  export interface FeatureCardProps {
    title: string;
    description: string;
    dataTestId: string;
  }