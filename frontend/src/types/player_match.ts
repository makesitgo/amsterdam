import { AmsterdamKey } from './amsterdam';
import { TeamPlayer } from './player';

export type PlayerMatchType = 'R1' | 'R2' | 'TB';

export interface PlayerMatch {
  _id: string;
  match_id: string;
  season_xref: number;
  week_num: number;
  date: Date;
  type: PlayerMatchType;
  seq: number;
  players: PlayerResult[];
  forfeit?: boolean;
}

export interface PlayerMatches extends TeamPlayer {
  matches: PlayerMatch[];
}

export interface PlayerResult extends AmsterdamKey {
  team: AmsterdamKey;
  handicap: number;
  games_won: number;
  win?: boolean;
  loss?: boolean;
}

export const emptyPlayerResult = (): PlayerResult => ({
  xref: 0,
  name: '',
  team: { xref: 0, name: '' },
  handicap: 0,
  games_won: 0,
});

export interface PlayerMatchup {
  self: PlayerResult;
  opp: PlayerResult;
}

export interface PlayerHandicap {
  value: number;
  lastWeek?: number;
}

export const emptyPlayerHandicap = (value = 0): PlayerHandicap => ({ value });

export interface PlayerRecord {
  wins: number;
  losses: number;
  streak: number;
}

export const emptyPlayerRecord = (): PlayerRecord => ({ wins: 0, losses: 0, streak: 0 });
