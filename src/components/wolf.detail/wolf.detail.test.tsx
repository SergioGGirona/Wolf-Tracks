import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { WolfDetail } from './wolf.detail';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useWolves } from '../../hooks/use.wolves';
import { Wolf } from '../../model/wolf';
import { appStore } from '../store/store';

jest.mock('../../hooks/use.wolves');
jest.mock('sweetalert2');

describe('Given the component WolfDetail', () => {
  describe('When we render it with male and alfa', () => {
    Swal.fire = jest.fn().mockResolvedValue({ isConfirmed: true });

    const newWolfTest = {
      codeName: 'Chopper',
      id: '01',
      images: [{ url: 'test' }],
      age: 1,
      comments: 'test',
      isAlpha: true,
      isFemale: false,
      pack: 'As01',
      tracks: ['3243, 2302'],
      territory: 'Galicia',
    } as Wolf;

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <WolfDetail wolf={newWolfTest}></WolfDetail>
          </Provider>
        </MemoryRouter>
      );
    });

    const loadWolves = jest.fn();
    const deleteWolfMock = jest.fn();
    (useWolves as jest.Mock).mockReturnValue({
      addWolf: loadWolves,
      eraseWolf: deleteWolfMock,
    });

    test('Then, the codeName item should be in the document', () => {
      const element = screen.getByText(/Chopper/);
      expect(element).toBeInTheDocument();
    });

    test('Then, if we click the button to expand the component, it should render all the wolf info', async () => {
      const element = screen.getByRole('button');
      await fireEvent.click(element);
      const spanElement = screen.getByText('As01');

      expect(spanElement).toBeInTheDocument();

      await fireEvent.click(element);
      const elementName = screen.getByText(/Chopper/);

      expect(elementName).toBeInTheDocument();
    });
    test('Then, if we click the button to contract the component, it should render less info', async () => {
      const element = screen.getByRole('button');
      await fireEvent.click(element);

      const buttons = screen.getAllByRole('button');
      await fireEvent.click(buttons[0]);

      await fireEvent.click(buttons[1]);
      jest.mock('sweetalert2', () => ({
        fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
      }));
      expect(Swal.fire).toBeTruthy();

      await fireEvent.click(buttons[2]);

      const mockName = screen.getByText(/Chopper/);
      expect(mockName).toBeInTheDocument();
    });
  });
  describe('When we render it with female and noalfa', () => {
    const newWolfMock = {
      codeName: 'Nami',
      id: '01',
      images: [{ url: 'test' }],
      age: 1,
      isAlpha: false,
      isFemale: true,
      comments: 'test',
      pack: 'As01',
      tracks: ['3243, 2302'],
      territory: 'Galicia',
    } as Wolf;

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <WolfDetail wolf={newWolfMock}></WolfDetail>
          </Provider>
        </MemoryRouter>
      );
    });

    const loadWolves = jest.fn();
    const deleteWolfMock = jest.fn();
    (useWolves as jest.Mock).mockReturnValue({
      addWolf: loadWolves,
      eraseWolf: deleteWolfMock,
    });

    test('Then, the codeName item should be in the document', () => {
      const element = screen.getByText(/Nami/);
      expect(element).toBeInTheDocument();
    });

    test('Then, eraseWolf has been called after fire sweet alert', async () => {
      const buttons = screen.getAllByRole('button');
      await fireEvent.click(buttons[0]);

      expect(deleteWolfMock).toHaveBeenCalled();
    });
  });
});
