import React, { createContext, useContext, useEffect, useState } from 'react';

import { Player, PlayerMatch, Season, Team, TeamMatch } from '../types';

import { useRealm } from './use_realm';

interface AtlasProps {
  data: ReturnType<typeof atlasData> | null;
}

const AtlasContext = createContext<AtlasProps | null>(null);

interface AtlasProviderProps {
  children: React.ReactNode;
}

export const AtlasProvider = ({ children }: AtlasProviderProps) => {
  const { user } = useRealm();

  const [data, setData] = useState<ReturnType<Realm.User['mongoClient']> | null>(null);

  useEffect(() => {
    if (user === null) {
      return;
    }
    setData(user.mongoClient('data'));
  }, [user]);

  return <AtlasContext.Provider value={{ data: atlasData(data) }}>{children}</AtlasContext.Provider>;
};

export const useAtlas = () => {
  const atlas = useContext(AtlasContext);
  if (atlas === null) {
    throw new Error('useAtlas() called outside of a AtlasProvider');
  }
  return atlas;
};

function atlasData(data: ReturnType<Realm.User['mongoClient']> | null) {
  if (!data) {
    return null;
  }
  return {
    players: () => data.db('amsterdam').collection<Player>('players'),
    seasons: () => data.db('amsterdam').collection<Season>('seasons'),
    teams: () => data.db('amsterdam').collection<Team>('teams'),
    teamMatches: () => data.db('amsterdam').collection<TeamMatch>('team_matches'),
    playerMatches: () => data.db('amsterdam').collection<PlayerMatch>('player_matches'),
  };
}
