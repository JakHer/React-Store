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

export interface HamburgerMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

export interface MenuLinkProps {
  to: string;
  text: string;
  mobile?: boolean;
  onClick?: () => void;
}

export interface ProductCardProps {
  name: string;
  description: string;
  price: number;
}
