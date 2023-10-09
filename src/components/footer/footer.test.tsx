import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Given the component Footer', () => {
  describe('When we render it', () => {
    render(<Footer></Footer>);

    test('the component should be in the document', () => {
      const logo = screen.getAllByRole('listitem');
      expect(logo[1]).toBeInTheDocument();
    });
  });
});
