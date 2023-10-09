import { createAsyncThunk } from '@reduxjs/toolkit';
import { WolvesRepository } from '../components/repository/wolves.repository';
import { Wolf, WolfToPublic } from '../model/wolf';

export const loadThunk = createAsyncThunk<Wolf[], WolvesRepository>(
  'wolves/load',
  async (repository) => {
    const wolves = await repository.getAll();
    return wolves;
  }
);

export const partialLoadThunk = createAsyncThunk<
  WolfToPublic[],
  WolvesRepository
>('wolves/loadPartial', async (repository) => {
  const wolves = await repository.getPartialAll();
  return wolves;
});

export const addThunk = createAsyncThunk<
  Wolf,
  { repository: WolvesRepository; newWolf: FormData; token: string }
>('wolves/add', async ({ repository, newWolf, token }) => {
  const createdWolf = await repository.create(newWolf, token);
  return createdWolf;
});

export const updateThunk = createAsyncThunk<
  Wolf,
  {
    repository: WolvesRepository;
    id: string;
    wolf: Partial<Wolf>;
    token: string;
  }
>('wolves/update', async ({ repository, id, wolf, token }) => {
  const updatedWolf = await repository.update(id, wolf, token);
  return updatedWolf;
});

export const eraseThunk = createAsyncThunk<
  Wolf['id'],
  { repository: WolvesRepository; wolf: Wolf; token: string }
>('wolves/erase', async ({ repository, wolf, token }) => {
  await repository.delete(wolf.id, token);
  return wolf.id;
});
