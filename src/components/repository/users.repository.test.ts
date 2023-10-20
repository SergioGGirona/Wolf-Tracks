import { UserLogin } from '../../model/user.js';
import { Suscriptor } from '../../types/suscriptor.js';
import { UsersRepository } from './users.repository.js';

describe('Given the class ApiUserRepository', () => {
  describe('When it is instantiated', () => {
    const repo = new UsersRepository('');
    const user = { username: 'Luffy' } as unknown as FormData;
    const user2 = { username: 'Zoro' } as unknown as UserLogin;

    test('Then, getAll method should return user[]', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(['Test']),
      });
      await repo.getAll();
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, create method should return user', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(['Test']),
      });
      await repo.create(user);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, login method should return user', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(['Test']),
      });
      await repo.login(user2);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, suscribe method should have been called', async () => {
      const suscriptor: Suscriptor = { userName: 'Luffy', email: 'test' };
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });
      await repo.suscribe(suscriptor);
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('When it is instantiated with errors', () => {
    const errorRepo = new UsersRepository('');
    const data = { username: 'Luffy' } as unknown as FormData;
    const data2 = { username: 'Zoro' } as unknown as UserLogin;

    test('Then, it should throw error in getAll method', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(errorRepo.getAll()).rejects.toThrow();
    });

    test('Then, it should throw error in create method', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('error'),
      });

      expect(errorRepo.create(data)).rejects.toThrow();
    });

    test('Then, it should throw error in create method', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('error'),
      });

      expect(errorRepo.login(data2)).rejects.toThrow();
    });

    test('Then, it should throw error in suscribe method', async () => {
      const suscriptor: Suscriptor = { userName: 'Luffy', email: 'test' };

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue({}),
      });
      expect(errorRepo.suscribe(suscriptor)).rejects.toThrow();
    });
  });
});
