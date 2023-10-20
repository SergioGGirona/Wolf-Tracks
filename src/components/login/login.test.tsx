import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUsers } from '../../hooks/use.users';
import { resetUserState } from '../../redux/users.actions';
import { appStore } from '../store/store';
import Login from './login';

jest.mock('../../hooks/use.users');
jest.mock('../../config.ts', () => ({
  localUrl: '',
}));
jest.mock('../../redux/users.actions');
Swal.fire = jest.fn();

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe('Given the component Login', () => {
  describe('When we render it with a user not logged', () => {
    (useUsers as jest.Mock).mockReturnValue({
      loginUser: jest.fn(),
      status: 'not logged',
    });
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

  describe('When we render it with a logged user', () => {
    beforeEach(() => {
      (useUsers as jest.Mock).mockReturnValue({
        loginUser: jest.fn(),
        status: 'logged',
      });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Login></Login>
          </Provider>
        </MemoryRouter>
      );
    });

    test('The form should be completed and call the login function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(mockedNavigator).toHaveBeenCalled();
    });
  });

  describe('When we render it with a error in logging', () => {
    (useUsers as jest.Mock).mockReturnValue({
      loginUser: jest.fn().mockRejectedValue(new Error()),
      status: 'error',
    });
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Login></Login>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, the errro in login should call reset State function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(resetUserState).toHaveBeenCalled();
    });

    test('Then, the errro in login should call reset State function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(resetUserState).toHaveBeenCalled();
    });
  });
});
