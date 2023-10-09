import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../components/store/store.ts';
import HomePage from './home.page.tsx';

describe('Given the component Home', () => {
  describe('When we render it', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <HomePage></HomePage>
        </Provider>
      </MemoryRouter>
    );

    test('the component should be in the document', () => {
      const home = screen.getAllByRole('heading');
      expect(home[0]).toBeInTheDocument();
    });
  });
});
