import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './error.page';

describe('Given the component ErrorPage', () => {
  describe('When we render it', () => {
    render(
      <MemoryRouter>
        <ErrorPage></ErrorPage>
      </MemoryRouter>
    );

    test('the component should be in the document', () => {
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });
});
