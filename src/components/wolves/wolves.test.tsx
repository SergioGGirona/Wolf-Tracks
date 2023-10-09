import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useWolves } from '../../hooks/use.wolves';
import { appStore } from '../store/store';
import Wolf from '../wolf/wolf';
import { Wolves } from './wolves';

jest.mock('../wolf/wolf');
jest.mock('../../hooks/use.wolves');

describe('Given the component Wolves', () => {
  const mockloadPartialWolves = jest.fn().mockImplementation(() => {});
  describe('When we render it', () => {
    test('The component should be in the document before the wolves loading', () => {
      (useWolves as jest.Mock).mockReturnValue({
        loadPartialWolves: mockloadPartialWolves,
        loadState: 'loading',
        wolvesToPublic: [{ id: '01' }],
      });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves></Wolves>
          </Provider>
        </MemoryRouter>
      );
      const hElement = screen.getByRole('heading');
      const waitWlement = screen.getByAltText(/Esperando/);
      expect(hElement).toBeInTheDocument();
      expect(waitWlement).toBeInTheDocument();
    });

    test('The component should be in the document before the wolves loading', () => {
      (useWolves as jest.Mock).mockReturnValue({
        loadPartialWolves: mockloadPartialWolves,
        loadState: 'loaded',
        wolvesToPublic: [{ id: '01' }],
      });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves></Wolves>
          </Provider>
        </MemoryRouter>
      );
      expect(Wolf).toHaveBeenCalled();
    });

    test('The function filterTerritory should be called', () => {
      (useWolves as jest.Mock).mockReturnValue({
        loadPartialWolves: mockloadPartialWolves,
        loadState: 'loaded',
        wolvesToPublic: [{ id: '01' }],
        filterTerritory: jest.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves></Wolves>
          </Provider>
        </MemoryRouter>
      );
      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[0]);
      expect(Wolf).toHaveBeenCalled();
    });
  });
});
