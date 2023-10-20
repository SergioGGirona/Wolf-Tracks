import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { useWolves } from '../../hooks/use.wolves';
import { User } from '../../model/user';
import { Wolf } from '../../model/wolf';
import { appStore } from '../store/store';
import Profile from './profile';

jest.mock('../../hooks/use.users');
jest.mock('../../hooks/use.wolves');
jest.mock('../../config.ts', () => ({
  localUrl: '',
}));

const wolfMocked = {
  id: '01',
  nickname: 'Chopper',
  codeName: 'TES-01',
  age: 1,
  isAlpha: true,
  isFemale: true,
  territory: 'Asturias',
  comments: 'Comment',
  images: [{} as ImageData],
  specialist: { id: '01', firstName: 'Luffy' } as User,
} as unknown as Wolf;

const userMocked = {
  id: '01',
  userName: 'Luffy',
  email: 'Test',
  assingedZone: 'Asturias',
  wolves: [wolfMocked],
} as unknown as User;

describe('Given the component Profile', () => {
  const renderProfile = () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <Profile></Profile>
        </Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [userMocked],
      status: 'logged',
    });
  });

  describe('When we render its loaded with a logged user', () => {
    beforeEach(() => {
      (useWolves as jest.Mock).mockReturnValue({
        wolves: [wolfMocked],
        loadWolves: jest.fn().mockReturnValue(wolfMocked),
        loadState: 'loaded',
      });

      renderProfile();
    });

    test('Then, header should be rendered', () => {
      const header = screen.getByText(/perfil/);
      expect(header).toBeInTheDocument();
    });

    test('Then, loadWolves should have been called', () => {
      expect(useWolves().loadWolves).toHaveBeenCalled();
    });
  });

  describe('When keeps loading while we instantiate it with a logged user', () => {
    beforeEach(() => {
      (useWolves as jest.Mock).mockReturnValueOnce({
        wolves: [wolfMocked],
        loadWolves: jest.fn().mockReturnValue(wolfMocked),
        loadState: 'loading',
      });

      renderProfile();
    });

    test('Then, header should be rendered', () => {
      const element = screen.getByText(/perfil/);
      expect(element).toBeInTheDocument();
    });
  });

  describe('When there is no logged user', () => {
    beforeEach(() => {
      (useUsers as jest.Mock).mockReturnValue({
        users: [userMocked],
        status: 'not logged',
      });

      (useWolves as jest.Mock).mockReturnValue({
        wolves: [wolfMocked],
        loadWolves: jest.fn().mockReturnValue(wolfMocked),
        loadState: 'loaded',
      });

      renderProfile();
    });

    test('Then, Error page should be rendered', () => {
      const errorPage = screen.getByText(/Has perdido el rastro/);
      expect(errorPage).toBeInTheDocument();
    });
  });
});
