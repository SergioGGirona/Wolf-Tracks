import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { User } from '../../model/user';
import { appStore } from '../store/store';
import { Employee } from './employee';

describe('Given the component Wolf', () => {
  describe('When we render it', () => {
    const userTest = {
      userName: 'Luffy',
      id: '01',
      avatar: [{ url: 'test' }],
    } as unknown as User;

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Employee user={userTest}></Employee>
          </Provider>
        </MemoryRouter>
      );
    });
    test('Then, the component li should be in the document', () => {
      const element = screen.getAllByRole('listitem');
      expect(element[0]).toBeInTheDocument();
    });
    test('Then the user should be in the document', () => {
      expect(userTest.userName).toMatch('Luffy');
    });
  });
});
