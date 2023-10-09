import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../components/store/store';
import AboutUsPage from './about.us.page';

describe('Given the component Home', () => {
  describe('When we render it', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <AboutUsPage></AboutUsPage>
        </Provider>
      </MemoryRouter>
    );

    test('the component should be in the document', () => {
      const home = screen.getAllByRole('heading');
      expect(home[0]).toBeInTheDocument();
    });
  });
});
