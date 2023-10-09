import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Info } from './main.info';

describe('Given the component Info', () => {
  describe('When we render it', () => {
    render(<Info></Info>);

    test('the component should be in the document', () => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
    });
  });
});
