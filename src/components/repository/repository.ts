import { Payload } from '../../types/payload';

export interface Repository<W extends { id: string | number }> {
  getAll(): Promise<W[]>;
  getById?(id: W['id']): Promise<W>;
  create(item: FormData, token: string): Promise<W>;
  update?(id: W['id'], newData: Partial<W>, token: string): Promise<W>;
  login?(newData: Partial<W>): Promise<Payload>;
  delete?(id: W['id'], token: string): Promise<void>;
}
