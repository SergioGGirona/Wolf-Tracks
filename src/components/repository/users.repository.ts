import { User, UserLogin } from '../../model/user';
import { Payload } from '../../types/payload';
import { Repository } from './repository';

export class UsersRepository implements Repository<User> {
  constructor(public urlBase: string) {}

  async getAll(): Promise<User[]> {
    const request = await fetch(this.urlBase);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);

    const data = await request.json();
    return data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(item: FormData): Promise<User> {
    const request = await fetch(`${this.urlBase}/register`, {
      method: 'POST',
      body: item,
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async login(item: UserLogin): Promise<Payload> {
    const request = await fetch(`${this.urlBase}/login`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }
}
