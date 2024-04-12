import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WolvesRepository } from '../components/repository/wolves.repository';
import { AppDispatch, RootState } from '../components/store/store';
import { localUrl } from '../config';
import { Wolf, WolfToPublic } from '../model/wolf';
import { actions } from '../redux/wolves.slice';
import {
  addThunk,
  eraseThunk,
  loadThunk,
  partialLoadThunk,
  updateThunk,
} from '../redux/wolves.thunks';

export const urlBaseWolves = localUrl + '/wolves';

export function useWolves() {
  const repository = useMemo(() => new WolvesRepository(urlBaseWolves), []);

  const userState = useSelector((state: RootState) => state.usersState);
  const token = userState.token;

  const wolvesState = useSelector((state: RootState) => state.wolvesState);
  const wolvesDispatch = useDispatch<AppDispatch>();

  const loadWolves = useCallback(async () => {
    wolvesDispatch(loadThunk(repository));
  }, [repository, wolvesDispatch]);

  const addWolf = async (newWolf: FormData) => {
    wolvesDispatch(addThunk({ repository, newWolf, token }));
  };

  const updateWolf = async (wolf: Partial<Wolf>, id: string) => {
    wolvesDispatch(updateThunk({ repository, id, wolf, token }));
  };

  const eraseWolf = async (wolf: Wolf) => {
    wolvesDispatch(eraseThunk({ repository, wolf, token }));
  };

  const loadPartialWolves = useCallback(async () => {
    wolvesDispatch(partialLoadThunk(repository));
  }, [repository, wolvesDispatch]);

  const filterTerritory = async (territory: string) => {
    await wolvesDispatch(partialLoadThunk(repository));
    wolvesDispatch(actions.filterTerritory(territory));
  };
  return {
    wolves: wolvesState.wolves as Wolf[],
    wolvesToPublic: wolvesState.wolves as WolfToPublic[],
    loadState: wolvesState.wolvesStatus,
    wolverError: wolvesState.hasGoneWrong,
    loadPartialWolves,
    filterTerritory,
    loadWolves,
    addWolf,
    updateWolf,
    eraseWolf,
  };
}
