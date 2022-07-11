import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAtlas } from '../../realm';
import { Season, Team } from '../../types';

import SeasonPage from '../season';

import Dashboard from './dashboard';

function SeasonsRouter() {
  const { data } = useAtlas();

  const [seasons, setSeasons] = useState<Season[]>([]);
  useEffect(() => {
    if (!data) {
      return;
    }
    data.seasons().find().then(setSeasons);
  }, [data]);

  if (!data) {
    return null; // unreachable in a protected route
  }

  const loadPlayerMatches = (seasonXref: number) => data.playerMatches().find({ season_xref: seasonXref });

  const loadTeams = (seasonXref: number) => data.teams().find({ season_xref: seasonXref });

  const loadTeamMatches = (seasonXref: number) => data.teamMatches().find({ season_xref: seasonXref });

  const saveDivisions = (seasonXref: number, divisions: Season['divisions']) =>
    data
      .seasons()
      .updateOne({ xref: seasonXref }, { $set: { divisions } })
      .then(({ modifiedCount }) => {
        if (modifiedCount !== 1) {
          throw new Error('failed to update season ' + seasonXref);
        }
        setSeasons(
          seasons.map(season => {
            if (season.xref !== seasonXref) {
              return season;
            }
            return { ...season, divisions };
          }),
        );
      });

  const saveSeason = (season: Omit<Season, '_id'>) =>
    data
      .seasons()
      .insertOne(season)
      .then(({ insertedId }) => setSeasons([...seasons, { ...season, _id: insertedId }]));

  const saveTeams = (seasonXref: number, teams: Omit<Team, '_id' | 'season_xref' | 'schedule'>[]) =>
    data
      .teams()
      .insertMany(teams.map(team => ({ ...team, season_xref: seasonXref, schedule: [] })))
      .then(() => {});

  return (
    <Routes>
      <Route path="/" element={<Dashboard seasons={seasons} saveSeason={saveSeason} />} />
      <Route
        path=":year/:term/:type/*"
        element={
          <SeasonPage
            seasons={seasons}
            loadPlayerMatches={loadPlayerMatches}
            loadTeams={loadTeams}
            loadTeamMatches={loadTeamMatches}
            saveDivisions={saveDivisions}
            saveTeams={saveTeams}
          />
        }
      />
    </Routes>
  );
}

export default SeasonsRouter;
