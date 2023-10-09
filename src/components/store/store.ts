import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../../redux/users.slice';
import wolvesReducer from '../../redux/wolves.slice';

export const appStore = configureStore({
  reducer: {
    usersState: usersReducer,
    wolvesState: wolvesReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
