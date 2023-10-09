import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useWolves } from '../../hooks/use.wolves';
import { appStore } from '../store/store';
import RegisterWolf from './register.wolf';

jest.mock('../../hooks/use.wolves');

describe('Given the component Form', () => {
  describe('When we render it', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <RegisterWolf></RegisterWolf>
          </Provider>
        </MemoryRouter>
      );
    });

    const addWolfMock = jest.fn();

    (useWolves as jest.Mock).mockReturnValue({ addWolf: addWolfMock });

    test('Then, the title should be in the document', () => {
      const element = screen.getByText(/escuchado/);
      expect(element).toBeInTheDocument();
    });

    test('Then, the Add wolf button should be in the document', () => {
      const element = screen.getByRole('button');
      expect(element.textContent).toBe('Enviar');
    });
    test('Then, the form should be completed and call the register function', async () => {
      const formElement = screen.getByRole('form');

      await fireEvent.submit(formElement);
      expect(useWolves().addWolf).toHaveBeenCalled();
    });
  });
});
