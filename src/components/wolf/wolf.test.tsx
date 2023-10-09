import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Wolf } from '../../model/wolf';
import { appStore } from '../store/store';
import Wolves from './wolf';

describe('Given the component Wolf', () => {
  describe('When we render it', () => {
    const newWolfTest = {
      codeName: 'Luffy',
      id: '01',
      images: [{ url: 'test' }],
    } as unknown as Wolf;

    test('The component should be in the document', () => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves wolf={newWolfTest}></Wolves>
          </Provider>
        </MemoryRouter>
      );
      const element = screen.getAllByRole('listitem');
      expect(element[0]).toBeInTheDocument();
    });
    test('The be in the document', () => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Wolves wolf={newWolfTest}></Wolves>
          </Provider>
        </MemoryRouter>
      );
      expect(newWolfTest.codeName).toMatch('Luffy');
    });
  });
});
