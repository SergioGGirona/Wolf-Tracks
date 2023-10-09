import { WolvesRepository } from './wolves.repository';

describe('Given the class Wolves Repository', () => {
  describe('When we instantiate it without errors', () => {
    const mockRepo = new WolvesRepository('');
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([{}, {}]),
      });
    });
    const mockUser = {
      id: '01',
      codeName: 'Chopper',
    };
    const mockToken = 'Token';

    test('Then, method getAll should have been called', () => {
      mockRepo.getAll();
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method getById should have been called', () => {
      mockRepo.getById(mockUser.id);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method create should have been called', () => {
      mockRepo.create(mockUser as unknown as FormData, mockToken);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method update should have been called', () => {
      mockRepo.update(mockUser.id, mockUser, mockToken);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, method delete should have been called', () => {
      mockRepo.delete(mockUser.id, mockToken);
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then, method getPartialAll should have been called', () => {
      mockRepo.getPartialAll();
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with errors', () => {
    const mockErrorRepo = new WolvesRepository('');
    const mockUser = {
      id: '01',
      codeName: 'Chopper',
    };
    const mockToken = 'Token';

    test('Then, method getAll should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.getAll()).rejects.toThrow();
    });

    test('Then, method getById should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.getById(mockUser.id)).rejects.toThrow();
    });

    test('Then, method create should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(
        mockErrorRepo.create(mockUser as unknown as FormData, mockToken)
      ).rejects.toThrow();
    });

    test('Then, method update should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(
        mockErrorRepo.update(mockUser.id, mockUser, mockToken)
      ).rejects.toThrow();
    });

    test('Then, method delete should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.delete(mockUser.id, mockToken)).rejects.toThrow();
    });

    test('Then, method delete should return an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn(),
      });

      expect(mockErrorRepo.getPartialAll()).rejects.toThrow();
    });
  });
});
