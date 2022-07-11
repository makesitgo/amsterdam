import React from 'react';
import styled from '@emotion/styled';
import { Body, Overline } from '@leafygreen-ui/typography';

import { AmsterdamKey, PlayerHandicap, PlayerRecord } from '../../../types';

const StyledPlayerDetails = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 90px 270px;
`;

interface Props {
  handicaps: PlayerHandicap[];
  record: PlayerRecord;
  team: AmsterdamKey;
}

function PlayerDetails({ handicaps, record, team }: Props) {
  return (
    <StyledPlayerDetails>
      <Overline>Record:</Overline>
      <Body>{`${record.wins}-${record.losses}, ${streakDisplay(record.streak)}`}</Body>
      <Overline>Plays for:</Overline>
      <Body>{team.name}</Body>
      <Overline>Handicap:</Overline>
      <div>
        {handicaps.map(({ value, lastWeek }) => (
          <Body key={!lastWeek ? 'current' : lastWeek}>{`${value}${
            !lastWeek ? '' : ` (until: Week ${lastWeek})`
          }`}</Body>
        ))}
      </div>
    </StyledPlayerDetails>
  );
}

export default PlayerDetails;

function streakDisplay(streak: number) {
  const prefix = streak > 0 ? 'W' : 'L';
  return prefix + Math.abs(streak);
}
