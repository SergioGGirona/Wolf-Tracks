import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../store/store';
import { AboutUs } from './about.us';

describe('Given the component Footer', () => {
  describe('When we render it', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <AboutUs></AboutUs>
        </Provider>
      </MemoryRouter>
    );

    test('the component should be in the document', () => {
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });
});
