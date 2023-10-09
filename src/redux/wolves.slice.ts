import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Wolf, WolfToPublic } from '../model/wolf';
import {
  addThunk,
  eraseThunk,
  loadThunk,
  partialLoadThunk,
  updateThunk,
} from './wolves.thunks';

export type WolvesState = {
  wolves: Wolf[] | WolfToPublic[];
  wolvesStatus: 'iddle' | 'loading' | 'loaded' | 'error';
  hasGoneWrong: boolean | null;
};

const initialState: WolvesState = {
  wolves: [],
  wolvesStatus: 'iddle',
  hasGoneWrong: false,
};

const wolvesSlice = createSlice({
  name: 'wolves',
  initialState,
  reducers: {
    filterTerritory: (state, action: PayloadAction<string>) => {
      const selectedTerritory = action.payload;
      state.wolves = state.wolves.filter(
        (wolf) => wolf.territory === selectedTerritory
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadThunk.pending, (state) => {
      state.wolvesStatus = 'loading';
    });
    builder.addCase(
      loadThunk.fulfilled,
      (state, { payload }: { payload: Wolf[] }) => {
        state.hasGoneWrong = false;
        state.wolvesStatus = 'loaded';
        state.wolves = payload;
      }
    );
    builder.addCase(loadThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.wolvesStatus = 'error';
    });

    builder.addCase(
      addThunk.fulfilled,
      (state, { payload }: { payload: Wolf }) => {
        state.wolves.push(payload);
        state.hasGoneWrong = false;
      }
    );

    builder.addCase(addThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.wolvesStatus = 'error';
    });

    builder.addCase(
      updateThunk.fulfilled,
      (state, { payload }: { payload: Wolf }) => {
        state.wolves = state.wolves.map((item) =>
          item.id === payload.id ? payload : item
        );
        state.hasGoneWrong = false;
      }
    );
    builder.addCase(updateThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.wolvesStatus = 'error';
    });

    builder.addCase(
      eraseThunk.fulfilled,
      (state, { payload }: { payload: Wolf['id'] }) => {
        state.wolves = state.wolves.filter((item) => item.id !== payload);
      }
    );

    builder.addCase(eraseThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.wolvesStatus = 'error';
    });

    builder.addCase(partialLoadThunk.pending, (state) => {
      state.wolvesStatus = 'loading';
      state.hasGoneWrong = null;
    });

    builder.addCase(
      partialLoadThunk.fulfilled,
      (state, { payload }: { payload: WolfToPublic[] }) => {
        state.hasGoneWrong = false;
        state.wolvesStatus = 'loaded';
        state.wolves = payload;
      }
    );

    builder.addCase(partialLoadThunk.rejected, (state) => {
      state.hasGoneWrong = true;
      state.wolvesStatus = 'error';
    });
  },
});

export const actions = wolvesSlice.actions;

export default wolvesSlice.reducer;
