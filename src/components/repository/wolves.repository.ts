import { Wolf, WolfToPublic } from '../../model/wolf';
import { Repository } from './repository';

export class WolvesRepository implements Repository<Wolf> {
  constructor(public urlBase: string) {}

  async getAll(): Promise<Wolf[]> {
    const request = await fetch(this.urlBase);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);

    const data = await request.json();
    return data;
  }

  async getPartialAll(): Promise<WolfToPublic[]> {
    const request = await fetch(this.urlBase);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);

    const data = await request.json();

    const dataToShow = data.map((wolf: Wolf) => ({
      id: wolf.id,
      images: wolf.images,
      territory: wolf.territory,
      nickname: wolf.nickname,
    }));
    return dataToShow;
  }

  async getById(id: string): Promise<Wolf> {
    const url = this.urlBase + '/' + id;
    const request = await fetch(url);
    if (!request.ok)
      throw new Error(`Error ${request.status}: ${request.statusText}`);
    const data = await request.json();
    return data;
  }

  async create(item: FormData, token: string): Promise<Wolf> {
    const request = await fetch(`${this.urlBase}/addWolf`, {
      method: 'POST',
      body: item,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async update(id: string, item: Partial<Wolf>, token: string): Promise<Wolf> {
    const request = await fetch(`${this.urlBase}/update/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
    const data = await request.json();
    return data;
  }

  async delete(id: string, token: string): Promise<void> {
    const url = this.urlBase + '/' + id;
    const request = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!request.ok)
      throw new Error(
        `Error ${request.status}: ${request.statusText}. Try again.`
      );
  }
}
