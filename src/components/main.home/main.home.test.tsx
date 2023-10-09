import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './main.home';

describe('Given the component Home', () => {
  describe('When we render it', () => {
    render(
      <MemoryRouter>
        <Home></Home>
      </MemoryRouter>
    );

    test('the component should be in the document', () => {
      const home = screen.getAllByRole('heading');
      expect(home[0]).toBeInTheDocument();
    });
  });
});
