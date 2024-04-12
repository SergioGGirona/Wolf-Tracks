import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Info } from './main.info';

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
describe('Given the component Info', () => {
  describe('When we render it', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Info></Info>
        </MemoryRouter>
      );
    });

    test('the component should be in the document', () => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
    });

    test('and user press button suscribe, it should call its function', () => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockedNavigator).toHaveBeenCalled();
    });
  });
});
