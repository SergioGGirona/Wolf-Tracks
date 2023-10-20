import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';
import { appStore } from '../components/store/store';
import { Wolf } from '../model/wolf';
import { useWolves } from './use.wolves';

jest.mock('../config.ts', () => ({
  localUrl: '',
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Given the hook useWolves', () => {
  const mockNewWolf = {} as unknown as FormData;
  const mockWolf = {
    codeName: 'Chopper',
    id: '07',
    territory: 'Asturias',
  } as unknown as Wolf;

  function MockComponent() {
    const {
      loadWolves,
      addWolf,
      eraseWolf,
      updateWolf,
      loadPartialWolves,
      filterTerritory,
      loadState,
    } = useWolves();

    return (
      <>
        <button role="button" onClick={() => loadWolves()}>
          A
        </button>
        <button role="button" onClick={() => eraseWolf(mockWolf)}>
          B
        </button>
        <button role="button" onClick={() => addWolf(mockNewWolf)}>
          C
        </button>
        <button role="button" onClick={() => updateWolf(mockWolf, mockWolf.id)}>
          D
        </button>
        <button role="button" onClick={() => loadPartialWolves()}>
          E
        </button>
        <button role="button" onClick={() => filterTerritory('Asturias')}>
          F
        </button>
        <span>{loadState}</span>
      </>
    );
  }

  describe('When we press a button to run the hook', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <MockComponent></MockComponent>
        </Provider>
      );
    });

    test('Then, when we push button A, loadWolves should have been called', async () => {
      const hookButtons = screen.getAllByRole('button');

      await userEvent.click(hookButtons[0]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, when we push button B, eraseWolf should have been called', async () => {
      const hookButtons = screen.getAllByRole('button');
      await userEvent.click(hookButtons[1]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, when we push button C, addWolf should have been called', async () => {
      const hookButtons = screen.getAllByRole('button');
      await userEvent.click(hookButtons[2]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, when we push button D, update should have been called', async () => {
      const hookButtons = screen.getAllByRole('button');
      await userEvent.click(hookButtons[3]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, when we push button E, loadPartialWolf should have been called', async () => {
      const hookButtons = screen.getAllByRole('button');
      await userEvent.click(hookButtons[4]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, when we push button F, filterTerritory should have been called', async () => {
      const hookButtons = screen.getAllByRole('button');
      await userEvent.click(hookButtons[5]);

      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
