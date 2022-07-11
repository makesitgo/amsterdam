import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Modal from '@leafygreen-ui/modal';
import { Table, TableHeader, Row, Cell } from '@leafygreen-ui/table';
import { H2, H3 } from '@leafygreen-ui/typography';

import { PlainButton } from '../../components';
import { dayOfWeek, PlayerMatch, Season, Team, TeamMatch, TeamRecord } from '../../types';

import { TeamHeader, TeamView } from './team'

const Leagues = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Divisions = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

const Division = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

interface Props {
  season: Season;
  playerMatches: PlayerMatch[];
  playerMatchesByTeamXref: Record<number, PlayerMatch[]>;
  teamsByXref: Record<number, Team>;
  teamMatchesById: Record<string, TeamMatch>;
  teamRecordsByXref: Record<number, TeamRecord>;
}

function TeamDashboard({
  playerMatchesByTeamXref,
  season,
  teamsByXref,
  teamMatchesById,
  teamRecordsByXref,
}: Props) {
  const navTo = useNavigate();

  const [teamXrefsByDivision, setTeamXrefsByDivision] = useState<Record<string, number[]>>({});
  useEffect(() => {
    setTeamXrefsByDivision(
      Object.values(teamsByXref).reduce<Record<string, number[]>>(
        (acc, team) => ({
          ...acc,
          [team.division_name]: [...(acc[team.division_name] || []), team.xref],
        }),
        {},
      ),
    );
  }, [teamsByXref]);

  const [divisions, setDivisions] = useState<Record<string, TeamRecord[]>>({});
  useEffect(() => {
    setDivisions(
      Object.entries(teamXrefsByDivision).reduce((acc, [divisionName, xrefs]) => {
        const teamRecords = xrefs.map(
          xref => teamRecordsByXref[xref] || { xref: 0, name: '', rank: 0, wins: 0, losses: 0, pct: 0 },
        );
        teamRecords.sort((tr1, tr2) =>
          tr1.wins === tr2.wins
            ? tr1.losses === tr2.losses
              ? tr2.pct - tr1.pct
              : tr1.losses - tr2.losses
            : tr2.wins - tr1.wins,
        );
        return {
          ...acc,
          [divisionName]: teamRecords.map((tr, i) => ({ ...tr, rank: i + 1 })),
        };
      }, {}),
    );
  }, [teamXrefsByDivision, teamRecordsByXref]);

  const [modalTeam, setModalTeam] = useState(0);

  const isMobile = useMediaQuery({ query: '(max-width: 720px)' });

  return (
    <>
      <Leagues>
        {season.nights.map(night => (
          <Divisions key={night}>
            <H2 style={{ marginBottom: '1rem' }}>{dayOfWeek(night)}</H2>
            {season.divisions[night]!.map(divisionName => (
              <Division key={divisionName}>
                {divisions[divisionName] && (
                  <>
                    <H3>{divisionName}</H3>
                    <Table
                      data={divisions[divisionName]}
                      columns={[
                        <TableHeader label="Place" />,
                        <TableHeader label="Team Name" />,
                        <TableHeader label="W's" />,
                        <TableHeader label="L's" />,
                        <TableHeader label="PCT." />,
                      ]}
                    >
                      {({ datum: ts }) => (
                        <Row key={ts.xref}>
                          <Cell>{ts.rank}</Cell>
                          <Cell>
                            <PlainButton onClick={() => (isMobile ? navTo(ts.xref + '') : setModalTeam(ts.xref))}>
                              {ts.name}
                            </PlainButton>
                          </Cell>
                          <Cell>{ts.wins}</Cell>
                          <Cell>{ts.losses}</Cell>
                          <Cell>{ts.pct.toFixed(3)}</Cell>
                        </Row>
                      )}
                    </Table>
                  </>
                )}
              </Division>
            ))}
          </Divisions>
        ))}
      </Leagues>
      <Modal
        open={!!modalTeam}
        setOpen={open => {
          if (!open) {
            setModalTeam(0);
          }
        }}
      >
        <>
          <TeamHeader modalView team={teamsByXref[modalTeam]} teamRecord={teamRecordsByXref[modalTeam]} />
          <TeamView
            playerMatchesByTeamXref={playerMatchesByTeamXref}
            team={teamsByXref[modalTeam]}
            teamMatchesById={teamMatchesById}
            teamRecordsByXref={teamRecordsByXref}
          />
        </>
      </Modal>
    </>
  );
}

export default TeamDashboard;
