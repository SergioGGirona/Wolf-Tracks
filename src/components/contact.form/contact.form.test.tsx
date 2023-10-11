import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useWolves } from '../../hooks/use.wolves';
import { appStore } from '../store/store';
import Contact from './contact.form';

jest.mock('../../hooks/use.users');
jest.mock('sweetalert2');
jest.mock('../../config.ts', () => ({
  localUrl: '',
}));
describe('Given the component Form', () => {
  describe('When we render it', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Contact></Contact>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, the title should be in the document', () => {
      const element = screen.getByText(/escuchado/);
      expect(element).toBeInTheDocument();
    });

    test('Then, the Add wolf button should be in the document', () => {
      const element = screen.getByRole('button');
      expect(element.textContent).toBe('Enviar');
    });
    test('Then, the form should be completed and call the register function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(useWolves().addWolf).toHaveBeenCalled();
    });
  });
});
