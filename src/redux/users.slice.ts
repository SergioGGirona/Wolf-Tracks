import { createSlice } from '@reduxjs/toolkit';
import { User } from '../model/user';
import { Payload } from '../types/payload';
import { resetUserState } from './users.actions'; // Importa la acción
import { addThunk, loadThunk, loginThunk } from './users.thunks';

export type UsersState = {
  users: User[];
  userStatus: 'logged' | 'not logged' | 'error' | 'pending';
  hasError: boolean | null;
  token: string;
  employees: User[];
};

const initialState: UsersState = {
  users: [],
  userStatus: 'not logged',
  hasError: false,
  token: '',
  employees: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addThunk.pending, (state) => {
      state.hasError = null;
    });
    builder.addCase(
      addThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.users.push(payload);
        state.hasError = false;
      }
    );
    builder.addCase(addThunk.rejected, (state) => {
      state.userStatus = 'error';
      state.hasError = true;
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.userStatus = 'pending';
      state.hasError = null;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }: { payload: Payload }) => {
        state.users.push(payload.user);
        state.userStatus = 'logged';
        state.hasError = false;
        state.token = payload.token;
      }
    );

    builder.addCase(loginThunk.rejected, (state) => {
      state.userStatus = 'error';
      state.hasError = true;
    });

    builder.addCase(loadThunk.pending, (state) => {
      state.hasError = null;
    });

    builder.addCase(
      loadThunk.fulfilled,
      (state, { payload }: { payload: User[] }) => {
        state.employees = payload;
        state.hasError = false;
      }
    );

    builder.addCase(loadThunk.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(resetUserState, () => {
      return initialState;
    });
  },
});

export default usersSlice.reducer;
