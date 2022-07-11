import { AmsterdamKey, DayOfWeek } from './amsterdam';

export interface Team {
  _id: string;
  xref: number;
  name: string;
  season_xref: number;
  night: DayOfWeek;
  division_name: string;
  schedule: {
    display: string;
    date: Date;
    opp: AmsterdamKey;
    match_id?: string;
  }[];
}

export interface TeamRecord extends AmsterdamKey {
  rank: number;
  wins: number;
  losses: number;
  pct: number;
}
