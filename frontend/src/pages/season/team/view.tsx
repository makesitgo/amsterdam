import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ExpandableCard from '@leafygreen-ui/expandable-card';
import { H3 } from '@leafygreen-ui/typography';

import { PlayerMatch, Team, TeamMatch, TeamMatchup, TeamRecord, TeamResult } from '../../../types';

import { PlayerTeamResults } from '../player';

import MatchView from './match_view';

const emptyTeamResult = (): TeamResult => ({ xref: 0, name: '', games_won: 0, matches_won: 0 });

const Matches = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  justify-content: center;
  max-width: 100%;
`;

interface Props {
  linkToPlayers?: string;
  playerMatchesByTeamXref: Record<number, PlayerMatch[]>;
  team?: Team;
  teamMatchesById: Record<string, TeamMatch>;
  teamRecordsByXref: Record<number, TeamRecord>;
}

function TeamView({ linkToPlayers, playerMatchesByTeamXref, team, teamMatchesById, teamRecordsByXref }: Props) {
  const [playerMatchesById, setPlayerMatchesById] = useState<Record<string, PlayerMatch[]>>({});
  useEffect(() => {
    const playerMatchesById = (playerMatchesByTeamXref[team?.xref || 0] || []).reduce<Record<string, PlayerMatch[]>>(
      (acc, playerMatch) => ({
        ...acc,
        [playerMatch.match_id]: [...(acc[playerMatch.match_id] || []), playerMatch],
      }),
      {},
    );
    Object.entries(playerMatchesById).forEach(([matchId, playerMatches]) => {
      playerMatches.sort((m1, m2) => m1.seq - m2.seq);
      playerMatchesById[matchId] = playerMatches;
    });
    setPlayerMatchesById(playerMatchesById);
  }, [team?.xref, playerMatchesByTeamXref]);

  if (!team) {
    return null;
  }

  return (
    <>
      <H3 style={{ marginTop: '1rem' }}>Player Results</H3>
      <PlayerTeamResults
        linkToPlayers={linkToPlayers}
        playerMatches={playerMatchesByTeamXref[team.xref] || []}
        selfTeamXref={team.xref}
      />
      <H3 style={{ marginTop: '1rem' }}>Team Results</H3>
      <Matches>
        {team.schedule.map(({ display, match_id, opp = { name: 'TBD', xref: 0 } }) => {
          const teamMatchup = newTeamMatchup(team.xref, teamMatchesById[match_id || ''] || { teams: [] });
          return (
            <ExpandableCard
              key={display}
              title={`${display}: vs. ${opp.name}${opp.xref === 0 ? '' : ` (${teamRecord(teamRecordsByXref[opp.xref])})`}`}
              description={!match_id ? '' : matchDescription(teamMatchup)}
            >
              {!match_id && (
                <PlayerTeamResults
                  linkToPlayers={linkToPlayers}
                  playerMatches={playerMatchesByTeamXref[opp.xref] || []}
                  selfTeamXref={opp.xref}
                />
              )}
              {match_id && (
                <MatchView
                  linkToPlayers={linkToPlayers}
                  playerMatches={playerMatchesById[match_id || ''] || []}
                  selfTeamXref={team.xref}
                />
              )}
            </ExpandableCard>
          );
        })}
      </Matches>
    </>
  );
}

export default TeamView;

function matchDescription({ self, opp }: TeamMatchup) {
  return `${self.win ? '✅ Win' : '💩 Loss'}: ${self.matches_won}-${opp.matches_won}, ${self.games_won}-${
    opp.games_won
  }`;
}

function newTeamMatchup(selectedTeamXref: number, teamMatch: Pick<TeamMatch, 'teams'>): TeamMatchup {
  const self = teamMatch.teams.find(t => t.xref === selectedTeamXref) || emptyTeamResult();
  const opp = teamMatch.teams.find(t => t.xref !== selectedTeamXref) || emptyTeamResult();
  return { self, opp };
}

function teamRecord(tr = { wins: 0, losses: 0 }) {
  return `${tr.wins}-${tr.losses}`;
}
