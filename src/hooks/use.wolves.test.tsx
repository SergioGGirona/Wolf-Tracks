import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';
import { appStore } from '../components/store/store';
import { Wolf } from '../model/wolf';
import { useWolves } from './use.wolves';

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
          1
        </button>
        <button role="button" onClick={() => eraseWolf(mockWolf)}>
          2
        </button>
        <button role="button" onClick={() => addWolf(mockNewWolf)}>
          3
        </button>
        <button role="button" onClick={() => updateWolf(mockWolf, mockWolf.id)}>
          4
        </button>
        <button role="button" onClick={() => loadPartialWolves()}>
          5
        </button>
        <button role="button" onClick={() => filterTerritory('Asturias')}>
          6
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

    test('Then, if we click button 1, loadWolves should have been called', async () => {
      const buttons = screen.getAllByRole('button');

      await userEvent.click(buttons[0]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, if we click button 2, eraseWolf should have been called', async () => {
      const buttons = screen.getAllByRole('button');

      await userEvent.click(buttons[1]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, if we click button 3, addWolf should have been called', async () => {
      const buttons = screen.getAllByRole('button');

      await userEvent.click(buttons[2]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, if we click button 4, update should have been called', async () => {
      const buttons = screen.getAllByRole('button');

      await userEvent.click(buttons[3]);

      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, if we click button 5, loadPartialWolf should have been called', async () => {
      const buttons = screen.getAllByRole('button');

      await userEvent.click(buttons[4]);

      expect(useDispatch()).toHaveBeenCalled();
    });
    test('Then, if we click button 6, filterTerritory should have been called', async () => {
      const buttons = screen.getAllByRole('button');

      await userEvent.click(buttons[5]);

      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
