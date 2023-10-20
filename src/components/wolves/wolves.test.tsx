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
jest.mock('../../config.ts', () => ({
  localUrl: '',
}));
describe('Given the component Wolves', () => {
  const mockloadPartialWolves = jest.fn().mockImplementation(() => {});
  describe('When we render it', () => {
    test('Then, the component should be in the document before the wolves loading', () => {
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

    test('Then, the component should be in the document before the wolves loading', () => {
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

    test('Then, the component should have error in the wolves loading', () => {
      (useWolves as jest.Mock).mockReturnValue({
        loadPartialWolves: mockloadPartialWolves,
        loadState: 'error',
        wolvesToPublic: [],
      });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves></Wolves>
          </Provider>
        </MemoryRouter>
      );
      const pElement = screen.getByText(/Ups/);
      expect(pElement).toBeInTheDocument();
    });

    test('Then, the function filterTerritory should be called', () => {
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

    test('Then, the function handleNextPage and hanlePreviousPage should update currentPage', () => {
      (useWolves as jest.Mock).mockReturnValue({
        loadPartialWolves: mockloadPartialWolves,
        loadState: 'loaded',
        wolvesToPublic: [
          { id: '01' },
          { id: '02' },
          { id: '03' },
          { id: '04' },
          { id: '05' },
          { id: '06' },
          { id: '07' },
          { id: '08' },
          { id: '09' },
          { id: '10' },
          { id: '11' },
          { id: '12' },
          { id: '13' },
          { id: '14' },
          { id: '15' },
        ],
        filterTerritory: jest.fn(),
      });
      const scrollIntoViewMock = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves></Wolves>
          </Provider>
        </MemoryRouter>
      );

      const buttonNext = screen.getByText('>');
      fireEvent.click(buttonNext);

      const buttonPrev = screen.getByText('<');
      expect(buttonPrev).toBeInTheDocument();
      expect(buttonNext).toBeInTheDocument();

      fireEvent.click(buttonPrev);
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });
});
