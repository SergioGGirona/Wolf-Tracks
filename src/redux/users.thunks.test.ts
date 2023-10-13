import { UsersRepository } from '../components/repository/users.repository';
import { appStore } from '../components/store/store';
import { UserLogin } from '../model/user';
import { Suscriptor } from '../types/suscriptor';
import { addThunk, loadThunk, loginThunk, suscribeThunk } from './users.thunks';

describe('Given the thunks of the Users entity', () => {
  describe('When we intantiate a repository', () => {
    const changedState = {
      users: [],
      userStatus: 'logged',
      hasError: false,
      token: 'token',
      employees: [],
    };
    const rejectedState = {
      users: [],
      userStatus: 'error',
      hasError: true,
      token: 'token',
      employees: [],
    };
    const errorRepo = null as unknown as UsersRepository;

    const mockRepo = {
      create: jest.fn(),
      login: jest.fn().mockResolvedValue({ token: '010' }),
      getAll: jest.fn().mockResolvedValue([]),
      suscribe: jest.fn().mockResolvedValue({}),
    } as unknown as UsersRepository;

    test('Then, AddThunk should be dispatched without errors ', () => {
      const mockUser = { userName: 'Luffy' } as unknown as FormData;
      appStore.dispatch(addThunk({ repository: mockRepo, newUser: mockUser }));

      expect(mockRepo.create).toHaveBeenCalled();
      expect(changedState.userStatus).toEqual('logged');
    });

    test('Then, AddThunk should be dispatched with error ', () => {
      const mockUser = { userName: 'Luffy' } as unknown as FormData;
      appStore.dispatch(addThunk({ repository: errorRepo, newUser: mockUser }));

      expect(mockRepo.create).toHaveBeenCalled();
      expect(rejectedState.userStatus).toEqual('error');
    });

    test('Then, loginThunk should be dispatched without errors', () => {
      const mockUser = {
        userName: 'Luffy',
        password: '01',
      } as unknown as UserLogin;

      appStore.dispatch(loginThunk({ repository: mockRepo, user: mockUser }));

      expect(mockRepo.login).toHaveBeenCalled();
    });

    test('Then, loginThunk should be dispatched with error ', () => {
      const mockUser = {
        userName: 'Luffy',
        password: '01',
      } as unknown as UserLogin;
      appStore.dispatch(loginThunk({ repository: errorRepo, user: mockUser }));

      expect(mockRepo.login).toHaveBeenCalled();
      expect(rejectedState.userStatus).toEqual('error');
    });

    test('Then, loginThunk should be dispatched with error ', () => {
      const mockUser = {
        userName: 'Luffy',
        password: '01',
      } as unknown as UserLogin;
      appStore.dispatch(loginThunk({ repository: errorRepo, user: mockUser }));

      expect(mockRepo.create).toHaveBeenCalled();
      expect(rejectedState.userStatus).toEqual('error');
    });

    test('Then, loadThunk should be dispatched without errors ', () => {
      appStore.dispatch(loadThunk(mockRepo));

      expect(mockRepo.getAll).toHaveBeenCalled();
      expect(changedState.employees).toEqual([]);
    });

    test('Then, loadThunk should be dispatched with error ', () => {
      appStore.dispatch(loadThunk(errorRepo));

      expect(mockRepo.getAll).toHaveBeenCalled();
      expect(rejectedState.hasError).toEqual(true);
    });

    test('Then, suscribeThunk should be dispatched without errors ', () => {
      const mockSuscriptor: Suscriptor = {
        userName: 'Luffy',
        email: 'email',
      };

      appStore.dispatch(
        suscribeThunk({ repository: mockRepo, visitor: mockSuscriptor })
      );

      expect(mockRepo.suscribe).toHaveBeenCalled();
    });
  });
});
