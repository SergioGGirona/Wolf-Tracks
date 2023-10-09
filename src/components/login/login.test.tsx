import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { appStore } from '../store/store';
import Login from './login';

jest.mock('../../hooks/use.users');

describe('Given the component Login', () => {
  describe('When we render it with a provider', () => {
    (useUsers as jest.Mock).mockReturnValue({ loginUser: jest.fn() });

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Login></Login>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, it should render a button', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toBeInTheDocument();
    });

    test('The form should be completed and call the login function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(useUsers().loginUser).toHaveBeenCalled();
    });
  });
});
