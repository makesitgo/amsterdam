import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';

import { PlainButton } from '../../../components';
import { emptyPlayerResult, PlayerMatch } from '../../../types';

const StyledRow = styled(Row, {
  shouldForwardProp: prop => prop !== 'win' && prop !== 'loss',
})<{ win?: boolean; loss?: boolean }>`
  ${({ theme, win, loss }) =>
    win
      ? {
          backgroundColor: theme.colors.lg.green.light2,
        }
      : loss
      ? {
          backgroundColor: theme.colors.lg.red.light2,
        }
      : {}}
`;

interface Props {
  linkToPlayers?: string;
  playerMatches: PlayerMatch[];
  selfTeamXref: number;
}

function MatchView({ linkToPlayers = 'players', playerMatches, selfTeamXref }: Props) {
  const navTo = useNavigate();
  return (
    <Table
      data={playerMatches}
      columns={[
        <TableHeader label="Player" />,
        <TableHeader label="HCP" />,
        <TableHeader label="Games" />,
        <TableHeader label="Opponent" />,
        <TableHeader label="HCP" />,
        <TableHeader label="Games" />,
      ]}
    >
      {({ datum: pm }) => {
        const self = pm.players.find(p => p.team.xref === selfTeamXref) || emptyPlayerResult();
        const opp = pm.players.find(p => p.team.xref !== selfTeamXref) || emptyPlayerResult();
        return (
          <StyledRow key={pm._id} win={self.win} loss={self.loss}>
            <Cell>
              <PlainButton onClick={() => navTo(linkToPlayers, { state: { xref: self.xref + '' } })}>
                {self.name}
              </PlainButton>
            </Cell>
            <Cell>{self.handicap}</Cell>
            <Cell>{self.games_won}</Cell>
            <Cell>
              <PlainButton onClick={() => navTo(linkToPlayers, { state: { xref: opp.xref + '' } })}>
                {opp.name}
              </PlainButton>
            </Cell>
            <Cell>{opp.handicap}</Cell>
            <Cell>{opp.games_won}</Cell>
          </StyledRow>
        );
      }}
    </Table>
  );
}

export default MatchView;
