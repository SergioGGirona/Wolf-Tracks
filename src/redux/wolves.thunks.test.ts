import { WolvesRepository } from '../components/repository/wolves.repository';
import { appStore } from '../components/store/store';
import { Wolf } from '../model/wolf';
import { WolvesState } from './wolves.slice';
import {
  addThunk,
  eraseThunk,
  loadThunk,
  partialLoadThunk,
  updateThunk,
} from './wolves.thunks';

describe('Given the thunks of the Wolf entity', () => {
  describe('When we intantiate a repository without errors', () => {
    let mockRepo: WolvesRepository;
    let changedState: WolvesState;
    const mockToken = 'token';

    beforeEach(() => {
      changedState = {
        wolves: [],
        wolvesStatus: 'loaded',
        hasGoneWrong: false,
      };
      mockRepo = {
        getAll: jest.fn(),
        getPartialAll: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as unknown as WolvesRepository;
    });

    test('Then, LoadThunk should be dispatched ', async () => {
      (mockRepo.getAll as jest.Mock).mockResolvedValue([]);

      await appStore.dispatch(loadThunk(mockRepo));

      expect(mockRepo.getAll).toHaveBeenCalled();
      expect(changedState.wolvesStatus).toEqual('loaded');
    });

    test('Then, AddThunk should be dispatched ', async () => {
      (mockRepo.create as jest.Mock).mockResolvedValue('');

      const mockWolf = { codeName: 'Chopper', id: '6' } as unknown as FormData;
      await appStore.dispatch(
        addThunk({ repository: mockRepo, newWolf: mockWolf, token: mockToken })
      );

      expect(mockRepo.create).toHaveBeenCalled();
      expect(changedState.wolvesStatus).toEqual('loaded');
    });

    test('Then, UpdateThunk should be dispatched and actualize item', async () => {
      (mockRepo.update as jest.Mock).mockResolvedValue('');

      const mockWolf = { codeName: 'Chopper', id: '6' } as unknown as Wolf;

      await appStore.dispatch(
        updateThunk({
          repository: mockRepo,
          id: mockWolf.id,
          wolf: mockWolf,
          token: mockToken,
        })
      );

      expect(mockRepo.update).toHaveBeenCalled();
    });

    test('Then, UpdateThunk should be dispatched and reemplace item', async () => {
      (mockRepo.update as jest.Mock).mockResolvedValue({
        codeName: 'Luffy',
        id: '7',
      });

      const mockWolf = { codeName: 'Chopper', id: '6' } as unknown as Wolf;

      await appStore.dispatch(
        updateThunk({
          repository: mockRepo,
          id: mockWolf.id,
          wolf: mockWolf,
          token: mockToken,
        })
      );

      expect(mockRepo.update).toHaveBeenCalled();
    });

    test('Then, DeleteThunk should be dispatched ', async () => {
      (mockRepo.delete as jest.Mock).mockResolvedValue('');

      const mockWolf = { codeName: 'Chopper', id: '6' } as unknown as Wolf;

      await appStore.dispatch(
        eraseThunk({ repository: mockRepo, wolf: mockWolf, token: mockToken })
      );

      expect(mockRepo.delete).toHaveBeenCalled();
    });

    test('Then, partialLoadThunk should be dispatched ', async () => {
      (mockRepo.getPartialAll as jest.Mock).mockResolvedValue('');

      await appStore.dispatch(partialLoadThunk(mockRepo));

      expect(mockRepo.getPartialAll).toHaveBeenCalled();
    });
  });
  describe('When we intantiate a repository without errors', () => {
    let errorRepo: WolvesRepository;
    let rejectedState: WolvesState;
    beforeEach(() => {
      rejectedState = {
        wolves: [],
        wolvesStatus: 'error',
        hasGoneWrong: false,
      };

      errorRepo = {
        getAll: jest.fn().mockRejectedValueOnce(rejectedState),
        getPartialAll: jest.fn().mockRejectedValueOnce(rejectedState),
        getById: jest.fn().mockRejectedValueOnce(rejectedState),
        create: jest.fn().mockRejectedValueOnce(rejectedState),
        update: jest.fn().mockRejectedValueOnce(rejectedState),
        delete: jest.fn().mockRejectedValueOnce(rejectedState),
      } as unknown as WolvesRepository;
    });

    test('Then, LoadThunk should be dispatched with error', () => {
      appStore.dispatch(loadThunk(errorRepo));

      expect(errorRepo.getAll).toHaveBeenCalled();
      expect(rejectedState.wolvesStatus).toEqual('error');
    });

    test('Then, partialLoadThunk should be dispatched with error', () => {
      appStore.dispatch(partialLoadThunk(errorRepo));

      expect(errorRepo.getPartialAll).toHaveBeenCalled();
      expect(rejectedState.wolvesStatus).toEqual('error');
    });

    test('Then, AddThunk should be dispatched with error ', () => {
      const mockToken = 'Token';

      const mockWolf = { codeName: 'Chopper', id: '6' } as unknown as FormData;
      appStore.dispatch(
        addThunk({ repository: errorRepo, newWolf: mockWolf, token: mockToken })
      );

      expect(rejectedState.wolvesStatus).toEqual('error');
    });

    test('Then, UpdateThunk should be dispatched with error ', () => {
      const mockWolf = {
        codeName: 'Chopper',
        id: '6',
      } as unknown as Wolf;
      const mockToken = 'Token';

      appStore.dispatch(
        updateThunk({
          repository: errorRepo,
          id: mockWolf.id,
          wolf: mockWolf,
          token: mockToken,
        })
      );

      expect(rejectedState.wolvesStatus).toEqual('error');
    });

    test('Then, deletethunk should be dispatched with error ', () => {
      const mockWolf = {
        codeName: 'Chopper',
        id: '6',
      } as unknown as Wolf;
      const mockToken = 'Token';

      appStore.dispatch(
        eraseThunk({ repository: errorRepo, wolf: mockWolf, token: mockToken })
      );

      expect(rejectedState.wolvesStatus).toEqual('error');
    });
  });
});
