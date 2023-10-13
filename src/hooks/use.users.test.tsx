import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';
import { appStore } from '../components/store/store';
import { UserLogin } from '../model/user';
import { Suscriptor } from '../types/suscriptor';
import { useUsers } from './use.users';

jest.mock('../config.ts', () => ({
  localUrl: '',
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Given the hook useUsers', () => {
  function TestComponent() {
    const { status, addUser, loginUser, loadEmployees, suscribeVisitor } =
      useUsers();

    const mockUser = {} as unknown as FormData;
    const mockUser2 = {} as unknown as UserLogin;
    const mockUser3 = {} as unknown as Suscriptor;

    return (
      <>
        <button role="button" onClick={() => addUser(mockUser)}>
          1
        </button>
        <button role="button" onClick={() => loginUser(mockUser2)}>
          2
        </button>
        <button role="button" onClick={() => loadEmployees()}>
          3
        </button>
        <button role="button" onClick={() => suscribeVisitor(mockUser3)}>
          4
        </button>
        <p>{status}</p>
      </>
    );
  }

  describe('When the component run the hook', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <TestComponent></TestComponent>
        </Provider>
      );
    });

    test('Then, if we click 1, the state should be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, if we click 2, the state should be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
    test('Then, if we click 3, the state should be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
    test('Then, if we click 3, the state should be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[3]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
