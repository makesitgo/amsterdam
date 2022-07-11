import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';

import { PlainButton } from '../../../components';
import { emptyPlayerResult, monthName, rankPlace, PlayerMatch } from '../../../types';

const StyledRow = styled(Row, {
  shouldForwardProp: prop => prop !== 'win' && prop !== 'loss' && prop !== 'noBorder',
})<{ win?: boolean; loss?: boolean; noBorder: boolean }>`
  ${({ theme, noBorder }) =>
    !noBorder && {
      borderTop: `1px solid ${theme.colors.lg.gray.light1}`,
    }}
  ${({ theme, win, loss }) =>
    win
      ? {
          backgroundColor: theme.colors.lg.green.light2 + ' !important',
        }
      : loss
      ? {
          backgroundColor: theme.colors.lg.red.light2 + ' !important',
        }
      : {}}
`;

interface Props {
  matches: PlayerMatch[];
  xref: string;
}

function PlayerDashboard({ matches, xref }: Props) {
  const navTo = useNavigate();
  const [styledMatches, setStyledMatches] = useState<(PlayerMatch & { noBorder: boolean })[]>([]);
  useEffect(() => {
    const weekSet: Record<number, true> = {};
    setStyledMatches(
      matches.map(match => {
        let noBorder = false;
        if (weekSet[match.week_num]) {
          noBorder = true;
        } else {
          weekSet[match.week_num] = true;
        }

        return { ...match, noBorder };
      }),
    );
  }, [matches]);
  return (
    <Table
      data={styledMatches}
      columns={[
        <TableHeader label="Week" />,
        <TableHeader label="Date" />,
        <TableHeader label="Matchup" />,
        <TableHeader label="Opp Player" />,
        <TableHeader label="Opp Team" />,
        <TableHeader label="Round" />,
        <TableHeader label="Games Won" />,
        <TableHeader label="Games Lost" />,
        <TableHeader label="Notes" />,
      ]}
    >
      {({ datum: pm }) => {
        const self = pm.players.find(p => p.xref + '' === xref) || emptyPlayerResult();
        const opp = pm.players.find(p => p.xref + '' !== xref) || emptyPlayerResult();

        return (
          <StyledRow key={pm.match_id+pm.type} win={self.win} loss={self.loss} noBorder={pm.noBorder}>
            <Cell>{pm.week_num}</Cell>
            <Cell>{`${monthName(pm.date.getMonth())} ${rankPlace(pm.date.getDate())}`}</Cell>
            <Cell>{`${self.handicap} vs ${opp.handicap}`}</Cell>
            <Cell>
              <PlainButton onClick={() => navTo('.', { state: { xref: opp.xref + '' } })}>{opp.name}</PlainButton>
            </Cell>
            <Cell>
              <PlainButton onClick={() => navTo(`../${opp.team.xref}`)}>{opp.team.name}</PlainButton>
            </Cell>
            <Cell>{pm.type}</Cell>
            <Cell>{self.games_won}</Cell>
            <Cell>{opp.games_won}</Cell>
            <Cell>{pm.forfeit ? 'Forfeit' : ''}</Cell>
          </StyledRow>
        );
      }}
    </Table>
  );
}

export default PlayerDashboard;
