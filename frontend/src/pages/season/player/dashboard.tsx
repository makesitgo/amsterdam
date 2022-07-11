import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Combobox, ComboboxGroup, ComboboxOption } from '@leafygreen-ui/combobox';

import {
  emptyPlayerHandicap,
  emptyPlayerRecord,
  emptyPlayerResult,
  AmsterdamKey,
  PlayerHandicap,
  PlayerMatch,
  PlayerRecord,
  Team,
  TeamPlayer,
  TeamMatch,
} from '../../../types';

import PlayerDetails from './details';
import PlayerMatches from './matches';
import PlayerSplits from './splits';

const Dashboard = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCombobox = styled(Combobox)`
  margin-bottom: 1rem;
  max-width: 360px;
  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

interface Props {
  playerMatchesByXref: Record<string, PlayerMatch[]>;
  playersByTeamXref: Record<number, TeamPlayer[]>;
  teamsByXref: Record<string, Team>;
  teamMatchesById: Record<string, TeamMatch>;
}

function PlayerDashboard({ playerMatchesByXref, playersByTeamXref, teamsByXref }: Props) {
  const location = useLocation();
  const xref = (location as any).state?.xref;

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>();
  useEffect(() => {
    setSelectedPlayer(xref);
  }, [xref]);

  const [playerMatches, setPlayerMatches] = useState<PlayerMatch[]>([]);
  const [playerTeam, setPlayerTeam] = useState<AmsterdamKey>(emptyPlayerResult());
  const [playerRecord, setPlayerRecord] = useState<PlayerRecord>(emptyPlayerRecord());
  const [playerHandicaps, setPlayerHandicaps] = useState<PlayerHandicap[]>([]);
  useEffect(() => {
    if (!selectedPlayer) {
      setPlayerMatches([]);
      return;
    }

    const playerMatches = playerMatchesByXref[selectedPlayer] || [];
    setPlayerMatches(playerMatches);

    if (!playerMatches.length) {
      return;
    }

    const reversed = [...playerMatches];
    reversed.sort((m1, m2) => {
      const date = m1.date.getTime() - m2.date.getTime();
      if (date === 0) {
        return m1.seq - m2.seq;
      }
      return date;
    });

    const handicaps: PlayerHandicap[] = [];

    setPlayerRecord(
      reversed.reduce((acc, match, i) => {
        const result = match.players.find(p => p.xref + '' === selectedPlayer) || emptyPlayerResult();

        if (i === 0) {
          setPlayerTeam(result.team);
          handicaps.push(emptyPlayerHandicap(result.handicap));
        } else {
          if (handicaps[0].value !== result.handicap) {
            handicaps[0].lastWeek = reversed[i - 1].week_num;
            handicaps.unshift(emptyPlayerHandicap(result.handicap));
          }
        }

        if (result.win) {
          acc.wins++;
          if (acc.streak > 0) {
            acc.streak++;
          } else {
            acc.streak = 1;
          }
        } else {
          acc.losses++;
          if (acc.streak < 0) {
            acc.streak--;
          } else {
            acc.streak = -1;
          }
        }

        return acc;
      }, emptyPlayerRecord()),
    );

    setPlayerHandicaps(handicaps);
  }, [selectedPlayer, playerMatchesByXref]);

  return (
    <Dashboard>
      <Link to={'..'}>
        Back to Standings
      </Link>
      <StyledCombobox
        label="Player Name"
        description="Choose a player to view stats"
        placeholder="Select a player..."
        value={selectedPlayer}
        onChange={setSelectedPlayer}
      >
        {Object.entries(playersByTeamXref).map(([teamXref, players]) => (
          <ComboboxGroup key={teamXref} label={teamsByXref[teamXref].name}>
            {players.map(player => (
              <ComboboxOption key={player.xref} value={player.xref + ''} displayName={player.name} />
            ))}
          </ComboboxGroup>
        ))}
      </StyledCombobox>
      {selectedPlayer && <PlayerDetails handicaps={playerHandicaps} record={playerRecord} team={playerTeam} />}
      {selectedPlayer && <PlayerMatches matches={playerMatches} xref={selectedPlayer} />}
      {selectedPlayer && <PlayerSplits handicaps={playerHandicaps} matches={playerMatches} xref={selectedPlayer} />}
    </Dashboard>
  );
}

export default PlayerDashboard;
