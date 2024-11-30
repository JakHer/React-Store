import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Store } from '../../pages/Store';

const renderHome = () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </Router>
  );
};

afterEach(() => {
  cleanup();
  window.history.pushState({}, '', '/');
});
describe('Home Component', () => {
  test('Renders the hero section and heading correctly', () => {
    renderHome();

    const heroHeading = screen.getByTestId('hero-heading');
    expect(heroHeading).toBeInTheDocument();
    expect(heroHeading).toHaveTextContent('Welcome to My React Store');

    const heroDescription = screen.getByTestId('hero-description');
    expect(heroDescription).toBeInTheDocument();
    expect(heroDescription).toHaveTextContent(
      "Your one-stop shop for all things awesome. Discover products you'll love!"
    );
  });

  test('Renders the Shop Now button and navigates correctly', () => {
    renderHome();

    const shopNowButton = screen.getByTestId('shop-now-button');
    expect(shopNowButton).toBeInTheDocument();
    expect(shopNowButton).toHaveTextContent('Shop Now');

    fireEvent.click(shopNowButton);

    const storeContainer = screen.getByTestId('store-container');
    expect(storeContainer).toBeInTheDocument();
  });

  test('Renders features section correctly', () => {
    renderHome();

    const featuresSection = screen.getByTestId('features-section');
    expect(featuresSection).toBeInTheDocument();

    const feature1 = screen.getByTestId('feature-1');
    expect(feature1).toBeInTheDocument();
    expect(feature1).toHaveTextContent('Fast Shipping');

    const feature2 = screen.getByTestId('feature-2');
    expect(feature2).toBeInTheDocument();
    expect(feature2).toHaveTextContent('Secure Payments');

    const feature3 = screen.getByTestId('feature-3');
    expect(feature3).toBeInTheDocument();
    expect(feature3).toHaveTextContent('Quality Products');
  });

  test('Renders Call to Action section with correct button', () => {
    renderHome();

    const ctaSection = screen.getByTestId('cta-section');
    expect(ctaSection).toBeInTheDocument();

    const ctaButton = screen.getByTestId('cta-button');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveTextContent('Browse Our Store');
  });
});
