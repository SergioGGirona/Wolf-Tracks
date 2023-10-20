import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { appStore } from '../store/store';
import Contact from './contact.form';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn(() => ({
    suscribeVisitor: jest.fn(),
  })),
}));

jest.mock('sweetalert2');

jest.mock('../../config.ts', () => ({
  localUrl: '',
}));

describe('Given the component Form', () => {
  describe('When we render it', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Contact></Contact>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, the back button should be in the document', () => {
      const element = screen.getByText(/Volver/);
      expect(element).toBeInTheDocument();
    });

    test('Then, the form should be completed and call the handleSubmit function', async () => {
      const formElement = screen.getByRole('form');
      await fireEvent.submit(formElement);

      expect(Swal.fire).toHaveBeenCalled();
    });
  });
});
