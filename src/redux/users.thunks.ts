import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersRepository } from '../components/repository/users.repository';
import { User, UserLogin } from '../model/user';
import { Payload } from '../types/payload';

export const addThunk = createAsyncThunk<
  User,
  { repository: UsersRepository; newUser: FormData }
>('users/add', async ({ repository, newUser }) => {
  const user = await repository.create(newUser);
  return user;
});

export const loginThunk = createAsyncThunk<
  Payload,
  { repository: UsersRepository; user: UserLogin }
>('users/update', async ({ repository, user }) => {
  const updatedUser = await repository.login(user);

  return updatedUser;
});

export const loadThunk = createAsyncThunk<User[], UsersRepository>(
  'users/load',
  async (repository) => {
    const users = await repository.getAll();
    return users;
  }
);
