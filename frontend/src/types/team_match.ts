import { AmsterdamKey } from './amsterdam'

export interface TeamMatch {
  _id: string;
  season_xref: number;
  week_num: number;
  date: Date;
  teams: TeamResult[];
  fifth_set?: boolean;
}

export interface TeamResult extends AmsterdamKey {
  games_won: number;
  matches_won: number;
  win?: boolean;
  loss?: boolean;
}

export interface TeamMatchup {
  self: TeamResult;
  opp: TeamResult;
}
