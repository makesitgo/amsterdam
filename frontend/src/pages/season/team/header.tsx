import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { H2 } from '@leafygreen-ui/typography';

import { Team, TeamRecord } from '../../../types';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageHeader = styled.div`
  align-self: stretch;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 5px;
`;

interface Props {
  modalView?: boolean;
  team?: Team;
  teamRecord?: TeamRecord;
}

function teamRecordDisplay(tr = { wins: 0, losses: 0 }) {
  return `${tr.wins}-${tr.losses}`;
}

function TeamHeader({ modalView, team, teamRecord }: Props) {
  if (!team) {
    return null;
  }

  const title = `${team.name} (${teamRecordDisplay(teamRecord)})`;

  if (modalView) {
    return (
      <ModalHeader>
        <H2>{title}</H2>
        <Link to={team.xref + ''}>Detailed View</Link>
      </ModalHeader>
    );
  }

  return (
    <PageHeader>
      <H2 style={{ gridColumn: 2 }}>{title}</H2>
      <Link to={'..'} style={{ marginLeft: 'auto', textAlign: 'right' }}>
        Back to Standings
      </Link>
    </PageHeader>
  );
}

export default TeamHeader;
