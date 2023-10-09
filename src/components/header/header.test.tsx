import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { appStore } from '../store/store';
import { Header } from './header';

jest.mock('../../hooks/use.users');

jest.mock('../../config.ts', () => ({
  localUrl: '',
}));

describe('Given the component Header', () => {
  describe('When we render it and there are token', () => {
    (useUsers as jest.Mock).mockReturnValue({
      token: 'mockToken',
    });
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header></Header>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, the component should be in the document', () => {
      const logo = screen.getByAltText(/logotipo/);
      expect(logo).toBeInTheDocument();
    });

    test('Then if user clicks on menu, state of menu changes', () => {
      const menuButton = screen.getByRole('button');
      const menu = screen.getByRole('list', { hidden: true });
      expect(menu).toHaveStyle({ right: '0%', top: '-500%', opacity: 0 });

      fireEvent.click(menuButton);

      expect(menu).toHaveStyle({ right: '0%', top: '100%', opacity: 1 });
    });

    test('Then if user clicks on the buttons, state changes again', () => {
      const menuButton = screen.getByRole('button');
      const menu = screen.getByRole('list', { hidden: true });
      const button1 = screen.getByText(/Home/);
      const button2 = screen.getByText(/Conócenos/);
      const button3 = screen.getByText(/Territorios/);
      const button4 = screen.getByText(/Tu perfil/);
      const button5 = screen.getByText(/Logout/);

      expect(menu).toHaveStyle({ right: '0%', top: '-500%', opacity: 0 });

      fireEvent.click(menuButton);

      expect(menu).toHaveStyle({ right: '0%', top: '100%', opacity: 1 });

      fireEvent.click(button1);
      expect(menu).toHaveStyle({
        right: '0%',
        top: '-500%',
        opacity: 0,
      });
      fireEvent.click(button2);
      expect(menu).toHaveStyle({ right: '0%', top: '100%', opacity: 1 });

      fireEvent.click(button3);
      expect(menu).toHaveStyle({
        right: '0%',
        top: '-500%',
        opacity: 0,
      });

      fireEvent.click(button4);
      expect(menu).toHaveStyle({ right: '0%', top: '100%', opacity: 1 });

      fireEvent.click(button3);
      expect(menu).toHaveStyle({
        right: '0%',
        top: '-500%',
        opacity: 0,
      });

      fireEvent.click(button4);
      expect(menu).toHaveStyle({ right: '0%', top: '100%', opacity: 1 });

      fireEvent.click(button5);
      expect(menu).toHaveStyle({
        right: '0%',
        top: '-500%',
        opacity: 0,
      });
    });
  });
  describe('When we render it and there are token', () => {
    beforeEach(() => {
      (useUsers as jest.Mock).mockReturnValue({});
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header></Header>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, the component should be in the document', () => {
      const logo = screen.getByAltText(/logotipo/);
      expect(logo).toBeInTheDocument();
    });
  });
});
