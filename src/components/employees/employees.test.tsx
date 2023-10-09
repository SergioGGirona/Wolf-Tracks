import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { appStore } from '../store/store';
import { Employees } from './employees';

jest.mock('../employee/employee');
jest.mock('../../hooks/use.users');
jest.mock('../../config.ts', () => ({
  localUrl: '',
}));
describe('Given the component Employees', () => {
  const mockEmployees = jest.fn().mockImplementation(() => {});
  describe('When we render it', () => {
    test('The component should be in the document before the employees loading', () => {
      (useUsers as jest.Mock).mockReturnValue({
        loadEmployees: mockEmployees,
        employees: [{ id: '01' }],
      });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Employees></Employees>
          </Provider>
        </MemoryRouter>
      );
      const hElement = screen.getByRole('list');
      expect(hElement).toBeInTheDocument();
    });
  });
});
