import { Wolf } from '../model/wolf';
import { WolvesState, actions, default as wolvesReducer } from './wolves.slice';

describe('wolvesSlice reducers', () => {
  it('should filter wolves by territory', () => {
    // Define the initial state
    const initialState: WolvesState = {
      wolves: [
        { id: '1', codeName: 'Wolf 1', territory: 'Asturias' },
        { id: '2', codeName: 'Wolf 2', territory: 'Galicia' },
        { id: '3', codeName: 'Wolf 3', territory: 'Asturias' },
      ] as unknown as Wolf[],
      wolvesStatus: 'loaded',
      hasGoneWrong: false,
    };

    const action = actions.filterTerritory('Asturias');

    const newState = wolvesReducer(initialState, action);

    expect(newState.wolves).toHaveLength(2);

    expect(newState.wolvesStatus).toBe('loaded');
    expect(newState.hasGoneWrong).toBe(false);
  });
});
