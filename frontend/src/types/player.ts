import { AmsterdamKey } from './amsterdam';

export interface Player extends AmsterdamKey {
  _id: string;
  aka: string[];
}

export interface TeamPlayer extends AmsterdamKey {
  team: AmsterdamKey
}
