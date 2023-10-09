import { WithId } from '../types/id.js';
import { ImageData } from '../types/image.js';
import { User } from './user.js';

export type WolfToPublic = WithId & {
  nickname: string;
  territory: 'Asturias' | 'Castilla-León' | 'Galicia';
  images: ImageData[];
};
export type WolfNoId = WolfToPublic & {
  codeName: string;
  age: number;
  pack: 'As01' | 'CL01' | 'CL02' | 'Ga01';
  tracks: string[];
  specialist: User;
  isAlpha: boolean;
  isFemale: boolean;
  comments: string;
};

export type Wolf = WithId & WolfNoId;
