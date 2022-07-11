import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Option, Select } from '@leafygreen-ui/select';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';
import Toggle from '@leafygreen-ui/toggle';
import { Subtitle } from '@leafygreen-ui/typography';

import { emptyPlayerResult, PlayerHandicap, PlayerMatch, PlayerMatchType } from '../../../types';

const StyledPlayerSplits = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 720px;
  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Control = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
`;

const StyledRow = styled(Row, {
  shouldForwardProp: prop => prop !== 'noBorder',
})<{ noBorder: boolean }>`
  ${({ theme, noBorder }) =>
    !noBorder && {
      borderTop: `1px solid ${theme.colors.lg.gray.light1}`,
    }}
`;

interface Props {
  handicaps: PlayerHandicap[];
  matches: PlayerMatch[];
  xref: string;
}

interface Splits {
  matchups: Record<number, Split>;
  races: Record<'long' | 'short', Split>;
  rounds: Record<PlayerMatchType, Split>;
  total: Split;
}

interface Split {
  wins: number;
  losses: number;
  gamesWon: number;
  gamesLost: number;
  diffWins: number;
  diffLosses: number;
  weeks: number[];
}

const emptySplit = (): Split => ({
  wins: 0,
  losses: 0,
  gamesWon: 0,
  gamesLost: 0,
  diffWins: 0,
  diffLosses: 0,
  weeks: [],
});

interface SplitData extends Split {
  name: string;
}

function PlayerSplits({ handicaps, matches, xref }: Props) {
  const handicapSet = useMemo(() => {
    const set: Record<number, true> = {};
    return handicaps
      .filter(({ value }) => {
        if (set[value]) {
          return false;
        }
        set[value] = true;
        return true;
      })
      .map(({ value }) => value + '');
  }, [handicaps]);

  const [selectedHandicap, setSelectedHandicap] = useState('');
  const [showExpandedView, setShowExpandedView] = useState(false);
  const [excludeForfeits, setExcludeForfeits] = useState(true);

  const [splits, setSplits] = useState<(SplitData & { noBorder: boolean })[]>([]);
  useEffect(() => {
    const splits = matches.reduce<Splits>(
      (acc, match) => {
        const self = match.players.find(p => p.xref + '' === xref) || emptyPlayerResult();
        const opp = match.players.find(p => p.xref + '' !== xref) || emptyPlayerResult();

        if (excludeForfeits && match.forfeit) {
          return acc;
        }

        if (selectedHandicap && self.handicap + '' !== selectedHandicap) {
          return acc;
        }

        let race: keyof Splits['races'];
        if (self.handicap + opp.handicap > 10) {
          race = 'long';
        } else {
          race = 'short';
        }
        if (self.win) {
          acc.races[race].wins++;
          acc.races[race].diffWins += self.games_won - opp.games_won;
        } else {
          acc.races[race].losses++;
          acc.races[race].diffLosses += opp.games_won - self.games_won;
        }
        acc.races[race].gamesWon += self.games_won;
        acc.races[race].gamesLost += opp.games_won;
        acc.races[race].weeks.unshift(match.week_num);

        if (self.win) {
          acc.rounds[match.type].wins++;
          acc.rounds[match.type].diffWins += self.games_won - opp.games_won;
        } else {
          acc.rounds[match.type].losses++;
          acc.rounds[match.type].diffLosses += opp.games_won - self.games_won;
        }
        acc.rounds[match.type].gamesWon += self.games_won;
        acc.rounds[match.type].gamesLost += opp.games_won;
        acc.rounds[match.type].weeks.unshift(match.week_num);

        const matchup = acc.matchups[opp.handicap - self.handicap] || emptySplit();
        if (self.win) {
          matchup.wins++;
          matchup.diffWins += self.games_won - opp.games_won;
        } else {
          matchup.losses++;
          matchup.diffLosses += opp.games_won - self.games_won;
        }
        matchup.gamesWon += self.games_won;
        matchup.gamesLost += opp.games_won;
        matchup.weeks.unshift(match.week_num);
        acc.matchups[opp.handicap - self.handicap] = matchup;

        if (self.win) {
          acc.total.wins++;
          acc.total.diffWins += self.games_won - opp.games_won;
        } else {
          acc.total.losses++;
          acc.total.diffLosses += opp.games_won - self.games_won;
        }
        acc.total.gamesWon += self.games_won;
        acc.total.gamesLost += opp.games_won;
        acc.total.weeks.unshift(match.week_num);

        return acc;
      },
      {
        matchups: {},
        races: {
          long: emptySplit(),
          short: emptySplit(),
        },
        rounds: {
          R1: emptySplit(),
          R2: emptySplit(),
          TB: emptySplit(),
        },
        total: emptySplit(),
      },
    );

    let matchups: SplitData[];
    if (!showExpandedView) {
      matchups = Object.entries(
        Object.entries(splits.matchups).reduce(
          (acc, [matchup, split]) => {
            let key: keyof typeof acc;
            if (matchup > '0') {
              key = 'up';
            } else if (matchup < '0') {
              key = 'down';
            } else {
              key = 'even';
            }

            acc[key].wins += split.wins;
            acc[key].losses += split.losses;
            acc[key].gamesWon += split.gamesWon;
            acc[key].gamesLost += split.gamesLost;
            acc[key].diffWins += split.diffWins;
            acc[key].diffLosses += split.diffLosses;
            acc[key].weeks.push(...split.weeks);
            acc[key].weeks.sort((w1, w2) => w1 - w2);

            return acc;
          },
          { up: emptySplit(), even: emptySplit(), down: emptySplit() },
        ),
      ).map(([name, split]) => ({ name: basicMatchupDisplay(name), ...split }));
    } else {
      matchups = Object.entries(splits.matchups).map(([name, split]) => ({ name, ...split }));
      matchups.sort((m1, m2) => parseInt(m2.name, 10) - parseInt(m1.name, 10));
      matchups = matchups.map(({ name, ...matchup }) => ({ name: detailedMatchupDisplay(name), ...matchup }));
    }

    setSplits([
      { name: 'Totals', ...splits.total, noBorder: false },
      ...Object.entries(splits.races)
        .filter(([type, split]) => split.weeks.length)
        .map(([name, split], i) => ({ name: raceDisplay(name), ...split, noBorder: i !== 0 })),
      ...Object.entries(splits.rounds)
        .filter(([type, split]) => type !== 'TB' || split.weeks.length)
        .map(([name, split], i) => ({ name: roundDisplay(name), ...split, noBorder: i !== 0 })),
      ...matchups.filter(split => split.weeks.length).map((split, i) => ({ ...split, noBorder: i !== 0 })),
    ]);
  }, [matches, selectedHandicap, showExpandedView, excludeForfeits, xref]);

  return (
    <StyledPlayerSplits>
      <Controls>
        <Subtitle style={{ flex: 1 }}>Player Splits</Subtitle>
        <Select
          label="As Rank"
          placeholder="All"
          name="splits_handicap"
          style={{ width: '90px' }}
          value={selectedHandicap}
          onChange={val => setSelectedHandicap(val || '')}
        >
          {handicapSet.map(handicap => (
            <Option key={handicap} value={handicap}>
              {handicap}
            </Option>
          ))}
        </Select>
        <Control>
          <Label id="splits_expanded_label" htmlFor="splits_expanded_toggle">
            Detailed View
          </Label>
          <Toggle
            id="splits_expanded_toggle"
            aria-labelledby="splits_expanded_label"
            checked={showExpandedView}
            onChange={checked => setShowExpandedView(checked)}
          />
        </Control>
        <Control>
          <Label id="splits_forfeits_label" htmlFor="splits_forfeits_toggle">
            Exclude Forfeits
          </Label>
          <Toggle
            id="splits_forfeits_toggle"
            aria-labelledby="splits_forfeits_label"
            checked={excludeForfeits}
            onChange={checked => setExcludeForfeits(checked)}
          />
        </Control>
      </Controls>
      <Table
        data={splits}
        columns={[
          <TableHeader label="Split" />,
          <TableHeader label="Wins" />,
          <TableHeader label="Losses" />,
          <TableHeader label="Games For" />,
          <TableHeader label="Games Against" />,
          <TableHeader label="Win Margin" />,
          <TableHeader label="Loss Margin" />,
          <TableHeader label="Weeks" />,
        ]}
      >
        {({ datum: split }) => (
          <StyledRow key={split.name} noBorder={split.noBorder}>
            <Cell>{split.name}</Cell>
            <Cell>{split.wins}</Cell>
            <Cell>{split.losses}</Cell>
            <Cell>{split.gamesWon}</Cell>
            <Cell>{split.gamesLost}</Cell>
            <Cell>{!split.wins ? '' : (split.diffWins / split.wins).toFixed(2)}</Cell>
            <Cell>{!split.losses ? '' : (split.diffLosses / split.losses).toFixed(2)}</Cell>
            <Cell>{split.weeks.join(', ')}</Cell>
          </StyledRow>
        )}
      </Table>
    </StyledPlayerSplits>
  );
}

export default PlayerSplits;

function basicMatchupDisplay(matchup: string) {
  if (matchup === 'up') {
    return 'Getting balls';
  }
  if (matchup === 'down') {
    return 'Giving balls';
  }
  return 'Straight up';
}

function detailedMatchupDisplay(matchup: string) {
  if (matchup === '0') {
    return 'Straight up';
  }

  let prefix = 'Getting ';
  let value = matchup;
  if (matchup.charAt(0) === '-') {
    prefix = 'Giving ';
    value = matchup.substring(1);
  }

  return prefix + value;
}

function raceDisplay(type: string) {
  return type.charAt(0).toUpperCase() + type.substring(1) + ' race';
}

function roundDisplay(type: string) {
  if (type === 'R1') {
    return 'Playing first';
  }
  if (type === 'R2') {
    return 'Playing second';
  }
  return 'Fifth set';
}
