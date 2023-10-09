import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Register from './register';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { appStore } from '../store/store';

jest.mock('../../hooks/use.users');
jest.mock('../../config.ts', () => ({
  localUrl: '',
}));
describe('Given the component Register', () => {
  describe('When we render it', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Register></Register>
          </Provider>
        </MemoryRouter>
      );
    });
    const addUserMock = jest.fn();

    (useUsers as jest.Mock).mockReturnValue({ addUser: addUserMock });

    test('Then, the title should be in the document', () => {
      const element = screen.getByText(/¡Te damos la bienvenida!/);
      expect(element).toBeInTheDocument();
    });

    test('Then, the Add user button should be in the document', () => {
      const element = screen.getByRole('button');
      expect(element.textContent).toBe('Enviar');
    });
    test('Then, the form should be completed and call the register function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(useUsers().addUser).toHaveBeenCalled();
    });
  });
});
