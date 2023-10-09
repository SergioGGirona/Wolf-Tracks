import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Media } from './media';

describe('Given the component Footer', () => {
  describe('When we render it', () => {
    render(<Media></Media>);

    test('the component should be in the document', () => {
      const logo = screen.getAllByRole('img');
      expect(logo[1]).toBeInTheDocument();
    });
  });
});
