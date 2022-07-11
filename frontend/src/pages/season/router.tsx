import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { LoadingSpinner } from '../../components';
import { AmsterdamKey, PlayerMatch, Season, Team, TeamMatch, TeamPlayer, TeamRecord } from '../../types';

import Admin from './admin';
import Dashboard from './dashboard';
import PlayerDashboard from './player';
import TeamDashboard from './team';

interface Props {
  seasons: Season[];
  loadPlayerMatches: (seasonXref: number) => Promise<PlayerMatch[]>;
  loadTeams: (seasonXref: number) => Promise<Team[]>;
  loadTeamMatches: (seasonXref: number) => Promise<TeamMatch[]>;
  saveDivisions: (seasonXref: number, divisions: Season['divisions']) => Promise<void>;
  saveTeams: (seasonXref: number, teams: Omit<Team, '_id' | 'season_xref' | 'schedule'>[]) => Promise<void>;
}

interface MatchStats extends AmsterdamKey {
  wins: number;
  losses: number;
  gamesWon: number;
  gamesTotal: number;
}

export const emptyMatchStats = (xref = 0, name = ''): MatchStats => ({
  xref,
  name,
  wins: 0,
  losses: 0,
  gamesWon: 0,
  gamesTotal: 0,
});

function TeamRouter({ seasons, loadPlayerMatches, loadTeams, loadTeamMatches, saveDivisions, saveTeams }: Props) {
  const { year, term, type } = useParams();

  const season = useMemo(() => {
    return seasons.find(s => s.year + '' === year && s.term === term && s.type === type);
  }, [seasons, year, term, type]);

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsByXref, setTeamsByXref] = useState<Record<number, Team>>({});
  useEffect(() => {
    if (!season) {
      return;
    }
    loadTeams(season.xref).then(teams => {
      setTeams(teams);
      setTeamsByXref(teams.reduce((acc, team) => ({ ...acc, [team.xref]: team }), {}));
    });
  }, [loadTeams, season]);

  const [teamMatchesById, setTeamMatchesById] = useState<Record<string, TeamMatch>>({});
  const [teamRecordsByXref, setTeamRecordsByXref] = useState<Record<number, TeamRecord>>({});
  useEffect(() => {
    if (!season) {
      return;
    }
    loadTeamMatches(season.xref).then(teamMatches => {
      setTeamMatchesById(
        teamMatches.reduce<Record<string, TeamMatch>>((acc, teamMatch) => ({ ...acc, [teamMatch._id]: teamMatch }), {}),
      );

      setTeamRecordsByXref(
        Object.entries(
          teamMatches.reduce<Record<number, MatchStats>>((outer, teamMatch) => {
            var gamesTotal = 0;
            const matchStats = teamMatch.teams.reduce<Record<number, MatchStats>>((inner, team) => {
              const teamStats: MatchStats = outer[team.xref] || emptyMatchStats(team.xref, team.name);
              teamStats.wins += team.win ? 1 : 0;
              teamStats.losses += team.loss ? 1 : 0;
              teamStats.gamesWon += team.games_won;
              gamesTotal += team.games_won;
              return { ...inner, [team.xref]: teamStats };
            }, {});
            Object.values(matchStats).forEach(teamStats => {
              teamStats.gamesTotal += gamesTotal;
            });
            return { ...outer, ...matchStats };
          }, {}),
        ).reduce(
          (acc, [xref, teamStats]) => ({
            ...acc,
            [xref]: {
              xref: teamStats.xref,
              name: teamStats.name,
              rank: 0,
              wins: teamStats.wins,
              losses: teamStats.losses,
              pct: teamStats.gamesWon / teamStats.gamesTotal,
            },
          }),
          {},
        ),
      );
    });
  }, [loadTeamMatches, season]);

  const [playerMatches, setPlayerMatches] = useState<PlayerMatch[]>([]);
  const [playerMatchesByXref, setPlayerMatchesByXref] = useState<Record<number, PlayerMatch[]>>({});
  const [playerMatchesByTeamXref, setPlayerMatchesByTeamXref] = useState<Record<number, PlayerMatch[]>>({});
  const [playersByTeamXref, setPlayersByTeamXref] = useState<Record<number, TeamPlayer[]>>({});
  useEffect(() => {
    if (!season) {
      return;
    }
    loadPlayerMatches(season.xref).then(playerMatches => {
      setPlayerMatches(playerMatches);

      const playerMatchesByXref = playerMatches.reduce<Record<number, PlayerMatch[]>>(
        (outer, playerMatch) => ({
          ...outer,
          ...playerMatch.players.reduce(
            (inner, player) => ({
              ...inner,
              [player.xref]: [...(outer[player.xref] || []), playerMatch],
            }),
            {},
          ),
        }),
        {},
      );
      Object.values(playerMatchesByXref).forEach(playerMatches => {
        playerMatches.sort((pm1, pm2) => {
          const date = pm2.date.getTime() - pm1.date.getTime()
          if (date) {
            return date
          }
          return pm2.seq - pm1.seq
        });
      });
      setPlayerMatchesByXref(playerMatchesByXref);

      setPlayerMatchesByTeamXref(
        playerMatches.reduce<Record<number, PlayerMatch[]>>(
          (outer, playerMatch) => ({
            ...outer,
            ...playerMatch.players.reduce(
              (inner, player) => ({
                ...inner,
                [player.team.xref]: [...(outer[player.team.xref] || []), playerMatch],
              }),
              {},
            ),
          }),
          {},
        ),
      );

      setPlayersByTeamXref(
        Object.entries(
          playerMatches.reduce<Record<number, Record<number, TeamPlayer>>>(
            (outer, playerMatch) => ({
              ...outer,
              ...playerMatch.players.reduce(
                (inner, player) => ({
                  ...inner,
                  [player.team.xref]: {
                    ...(outer[player.team.xref] || {}),
                    [player.xref]: player,
                  },
                }),
                {},
              ),
            }),
            {},
          ),
        ).reduce((acc, [teamXref, playersMap]) => {
          const players = Object.values(playersMap);
          players.sort((p1, p2) => p1.xref - p2.xref);
          return { ...acc, [teamXref]: players };
        }, {}),
      );
    });
  }, [loadPlayerMatches, season]);

  if (!season) {
    return <LoadingSpinner />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            season={season}
            playerMatches={playerMatches}
            playerMatchesByTeamXref={playerMatchesByTeamXref}
            teamsByXref={teamsByXref}
            teamMatchesById={teamMatchesById}
            teamRecordsByXref={teamRecordsByXref}
          />
        }
      />
      <Route
        path="admin"
        element={
          <Admin
            season={season}
            teams={teams}
            saveDivisions={divisions => saveDivisions(season.xref, divisions)}
            saveTeams={teams => saveTeams(season.xref, teams)}
          />
        }
      />
      <Route
        path="players"
        element={
          <PlayerDashboard
            playerMatchesByXref={playerMatchesByXref}
            playersByTeamXref={playersByTeamXref}
            teamsByXref={teamsByXref}
            teamMatchesById={teamMatchesById}
          />
        }
      />
      <Route
        path=":xref"
        element={
          <TeamDashboard
            playerMatchesByTeamXref={playerMatchesByTeamXref}
            teamsByXref={teamsByXref}
            teamMatchesById={teamMatchesById}
            teamRecordsByXref={teamRecordsByXref}
          />
        }
      />
    </Routes>
  );
}

export default TeamRouter;
