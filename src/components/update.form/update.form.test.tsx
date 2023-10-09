import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useWolves } from '../../hooks/use.wolves'; // Import useWolves hook here
import { appStore } from '../store/store';
import UpdateForm from './update.form';

jest.mock('../../hooks/use.wolves', () => ({
  useWolves: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '01',
  }),
}));

const mockWolf = {
  id: '01',
  nickname: 'Chopper',
  codeName: 'TES-01',
  age: 1,
  isAlpha: true,
  comments: 'Comment',
  tracks: ['01', '02'],
};
describe('Given the component UpdateWolf,', () => {
  describe('When we instantiate it with a wolf id', () => {
    (useWolves as jest.Mock).mockReturnValue({
      wolves: [mockWolf],
      updateWolf: jest.fn(),
    });

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <UpdateForm></UpdateForm>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, it should render UpdateForm', () => {
      const element = screen.getByText(/Actualiza la información/);
      expect(element).toBeInTheDocument();
    });

    test('Then, the form should be completed and call the register function', async () => {
      const formElements = screen.getAllByRole('form');

      await fireEvent.submit(formElements[0]);
      expect(useWolves().updateWolf).toHaveBeenCalled();
    });
    test('Then, if we call Handle Coordinates function it should call updateWolf', async () => {
      const formElements = screen.getAllByRole('form');
      const input = screen.getByPlaceholderText(/coordenadas/);

      await userEvent.type(input, 'track test');
      await fireEvent.submit(formElements[1]);
      expect(useWolves().updateWolf).toHaveBeenCalled();
    });
    test('Then, if we call Handle Coordinates without coordinates, it should return', async () => {
      const formElements = screen.getAllByRole('form');

      await fireEvent.submit(formElements[1]);
      expect(useWolves().updateWolf).toHaveBeenCalled();
    });
  });
});
