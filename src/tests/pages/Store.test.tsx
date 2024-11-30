import { render, screen } from '@testing-library/react';
import { Store } from '../../pages/Store';

describe('App Component', () => {
  test('Renders Header', () => {
    render(<Store />);

    const welcomeMessage = screen.getByText(/Store Page/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
