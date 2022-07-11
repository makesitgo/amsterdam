import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { PlayerMatch, Team, TeamMatch, TeamRecord } from '../../../types';

import TeamHeader from './header';
import TeamView from './view';

const Dashboard = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  playerMatchesByTeamXref: Record<number, PlayerMatch[]>;
  teamsByXref: Record<string, Team>;
  teamMatchesById: Record<string, TeamMatch>;
  teamRecordsByXref: Record<string, TeamRecord>;
}

function TeamDashboard({
  playerMatchesByTeamXref,
  teamsByXref,
  teamMatchesById,
  teamRecordsByXref,
}: Props) {
  const { xref } = useParams();
  const [team, setTeam] = useState<Team>();
  const [teamRecord, setTeamRecord] = useState<TeamRecord>();
  useEffect(() => {
    if (!xref) {
      return;
    }
    setTeam(teamsByXref[xref]);
    setTeamRecord(teamRecordsByXref[xref]);
  }, [teamsByXref, teamRecordsByXref, xref]);
  return (
    <Dashboard>
      <TeamHeader team={team} teamRecord={teamRecord} />
      <TeamView
        linkToPlayers="../players"
        playerMatchesByTeamXref={playerMatchesByTeamXref}
        team={team}
        teamMatchesById={teamMatchesById}
        teamRecordsByXref={teamRecordsByXref}
      />
    </Dashboard>
  );
}

export default TeamDashboard;
