import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';

import { PlainButton } from '../../../components';
import { emptyPlayerResult, PlayerMatch, PlayerResult } from '../../../types';

interface Props {
  linkToPlayers?: string;
  playerMatches: PlayerMatch[];
  selfTeamXref: number;
}

interface Stats extends Pick<PlayerResult, 'xref' | 'name' | 'handicap'> {
  doubles: number;
  wins: number;
  losses: number;
  gamesWon: number;
  gamesLost: number;
  gamePct: number;
}

const emptyStats = (xref = 0, name = ''): Stats => ({
  xref,
  name,
  handicap: 0,
  doubles: 0,
  wins: 0,
  losses: 0,
  gamesWon: 0,
  gamesLost: 0,
  gamePct: 0,
});

function PlayerTeamResults({ linkToPlayers = 'players', playerMatches, selfTeamXref }: Props) {
  const navTo = useNavigate();
  const stats: (Stats & { noLink?: boolean })[] = useMemo(() => {
    const playerWeeks: Record<string, Record<number, number>> = {};
    const totals = {
      wins: 0,
      losses: 0,
      gamesWon: 0,
      gamesLost: 0,
    };
    const stats = Object.entries(
      playerMatches.reduce<Record<number, Stats & { noLink?: boolean }>>((acc, playerMatch) => {
        const self = playerMatch.players.find(p => p.team.xref === selfTeamXref) || emptyPlayerResult();
        const opp = playerMatch.players.find(p => p.team.xref !== selfTeamXref) || emptyPlayerResult();

        if (playerMatch.type !== 'TB') {
          if (!playerWeeks[self.xref]) {
            playerWeeks[self.xref] = {};
          }
          if (!playerWeeks[self.xref][playerMatch.week_num]) {
            playerWeeks[self.xref][playerMatch.week_num] = 0;
          }
          playerWeeks[self.xref][playerMatch.week_num]++;
        }

        const stats = acc[self.xref] || emptyStats(self.xref, self.name);
        stats.handicap = self.handicap;
        stats.wins += self.win ? 1 : 0;
        stats.losses += self.loss ? 1 : 0;
        stats.gamesWon += self.games_won;
        stats.gamesLost += opp.games_won;
        totals.wins += self.win ? 1 : 0;
        totals.losses += self.loss ? 1 : 0;
        totals.gamesWon += self.games_won;
        totals.gamesLost += opp.games_won;
        return { ...acc, [self.xref]: stats };
      }, {}),
    ).map(([xref, stats]) => ({
      ...stats,
      gamePct: stats.gamesWon / (stats.gamesWon + stats.gamesLost),
      doubles: Object.values(playerWeeks[xref] || {}).filter(n => n > 1).length,
    }));
    stats.sort((p1, p2) => p2.gamePct - p1.gamePct);
    stats.push({
      noLink: true,
      xref: 0,
      name: 'Totals',
      handicap: ('' as unknown) as number,
      doubles: ('' as unknown) as number,
      gamePct: totals.gamesWon / (totals.gamesWon + totals.gamesLost),
      ...totals,
    });
    return stats;
  }, [playerMatches, selfTeamXref]);

  return (
    <Table
      data={stats}
      columns={[
        <TableHeader label="Name" />,
        <TableHeader label="HCP" />,
        <TableHeader label="DB's" />,
        <TableHeader label="W" />,
        <TableHeader label="L" />,
        <TableHeader label="GF" />,
        <TableHeader label="GA" />,
        <TableHeader label="PCT" />,
      ]}
    >
      {({ datum: pr }) => (
        <Row key={pr.xref}>
          <Cell>
            {pr.noLink ? (
              pr.name
            ) : (
              <PlainButton onClick={() => navTo(linkToPlayers, { state: { xref: pr.xref + '' } })}>
                {pr.name}
              </PlainButton>
            )}
          </Cell>
          <Cell>{pr.handicap}</Cell>
          <Cell>{pr.doubles}</Cell>
          <Cell>{pr.wins}</Cell>
          <Cell>{pr.losses}</Cell>
          <Cell>{pr.gamesWon}</Cell>
          <Cell>{pr.gamesLost}</Cell>
          <Cell>{pr.gamePct.toFixed(3)}</Cell>
        </Row>
      )}
    </Table>
  );
}

export default PlayerTeamResults;
