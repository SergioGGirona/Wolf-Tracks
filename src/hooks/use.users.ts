import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UsersRepository } from '../components/repository/users.repository';
import { AppDispatch, RootState } from '../components/store/store';
import { localUrl } from '../config';
import { UserLogin } from '../model/user';
import { addThunk, loadThunk, loginThunk } from '../redux/users.thunks';

export const urlBaseUsers = localUrl + '/users';

export function useUsers() {
  const repository = useMemo(() => new UsersRepository(urlBaseUsers), []);

  const usersState = useSelector((state: RootState) => state.usersState);
  const usersDispatch = useDispatch<AppDispatch>();

  const addUser = async (newUser: FormData) => {
    usersDispatch(addThunk({ repository, newUser }));
  };

  const loginUser = async (user: UserLogin) => {
    usersDispatch(loginThunk({ repository, user }));
  };

  const loadEmployees = useCallback(async () => {
    usersDispatch(loadThunk(repository));
  }, [repository, usersDispatch]);

  return {
    users: usersState.users,
    error: usersState.hasError,
    status: usersState.userStatus,
    token: usersState.token,
    employees: usersState.employees,
    addUser,
    loginUser,
    loadEmployees,
  };
}
