import { DayOfWeek } from './amsterdam';

export type SeasonTerm = 'winter' | 'spring' | 'summer' | 'fall';

export const isSeasonTerm = (v: string): v is SeasonTerm => {
  switch (v) {
    case 'winter':
    case 'spring':
    case 'summer':
    case 'fall':
      return true;
  }
  return false;
};

export type LeagueType = 'team_8ball';

export const isLeagueType = (v: string): v is LeagueType => {
  switch (v) {
    case 'team_8ball':
      return true;
  }
  return false;
};

export interface Season {
  _id: string;
  year: number;
  term: SeasonTerm;
  type: LeagueType;
  xref: number;
  name: string;
  num_weeks: number;
  nights: DayOfWeek[];
  divisions: Partial<Record<DayOfWeek, string[]>>;
}
