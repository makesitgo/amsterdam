import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import ExpandableCard from '@leafygreen-ui/expandable-card';
import FormFooter from '@leafygreen-ui/form-footer';
import TextInput from '@leafygreen-ui/text-input';
import { Subtitle } from '@leafygreen-ui/typography';

import { dayOfWeek, DayOfWeek, Team, Season } from '../../types';

const NightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NightControl = styled.div`
  display: flex;
  flex-direction: column;
  :not(:first-of-type) {
    margin-left: 2rem;
  }
`;

const NightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TeamInputs = styled.div`
  display: flex;
`;

interface Props {
  season: Season;
  teams: Team[];
  saveDivisions: (divisions: Season['divisions']) => Promise<void>;
  saveTeams: (teams: Omit<Team, '_id' | 'season_xref' | 'schedule'>[]) => Promise<void>;
}

function SeasonAdmin({ season, teams, saveDivisions, saveTeams }: Props) {
  const navTo = useNavigate();

  const [divisionsOpen, setDivisionsOpen] = useState(
    !Object.values(season.divisions).reduce((tot, divs) => (tot += divs.length), 0),
  );
  const [divisionsErrMsg, setDivisionsErrMsg] = useState('');
  const [divisions, setDivisions] = useState<Partial<Record<DayOfWeek, string[]>>>(
    season.nights.reduce((acc, night) => {
      const existingDivisions = season.divisions[night] || [];
      return {
        ...acc,
        [night]: existingDivisions.length > 0 ? existingDivisions : [''],
      };
    }, {}),
  );

  const [teamsOepn, setTeamsOpen] = useState(
    !!Object.values(season.divisions).reduce((tot, divs) => (tot += divs.length), 0),
  );
  const [teamsErrMsg, setTeamsErrMsg] = useState('');
  const [teamsByDivision, setTeamsByDivision] = useState<
    Partial<Record<DayOfWeek, Record<string, { xref: string; name: string }[]>>>
  >({});
  useEffect(() => {
    setTeamsByDivision(
      Object.entries(divisions).reduce(
        (acc, [night, divisions]) => ({
          ...acc,
          [night]: divisions.reduce((inner, division) => {
            const existingTeams = teams
              .filter(t => t.division_name === division)
              .map(t => ({ xref: t.xref + '', name: t.name }));
            return {
              ...inner,
              [division]: existingTeams.length > 0 ? existingTeams : [{ xref: '', name: '' }],
            };
          }, {}),
        }),
        {},
      ),
    );
  }, [season, teams, divisions]);

  return (
    <>
      <Button variant="primaryOutline" onClick={() => navTo('..')}>
        Back to Dashboard
      </Button>
      <ExpandableCard
        title="Admin: Divisions"
        description="Make sure the league divisions are correct"
        isOpen={divisionsOpen}
        onClick={() => setDivisionsOpen(!divisionsOpen)}
      >
        <NightContainer>
          {season.nights.map(night => (
            <NightControl key={night}>
              <NightHeader>
                <Subtitle>{dayOfWeek(night)}</Subtitle>
                <Button
                  size="xsmall"
                  onClick={() => setDivisions({ ...divisions, [night]: [...(divisions[night] || []), ''] })}
                >
                  +
                </Button>
              </NightHeader>
              {(divisions[night] || []).map((val, idx) => (
                <TextInput
                  style={{ marginBottom: '0.5rem' }}
                  key={val + idx}
                  label={`Division #${idx}`}
                  value={val}
                  onChange={e =>
                    setDivisions({
                      ...divisions,
                      [night]: (divisions[night] || []).map((v, i) => {
                        if (i === idx) {
                          return e.target.value;
                        }
                        return v;
                      }),
                    })
                  }
                />
              ))}
            </NightControl>
          ))}
        </NightContainer>
        <FormFooter
          primaryButton={{
            text: 'Save',
            onClick: async e => {
              try {
                saveDivisions(divisions);
                setDivisionsOpen(false);
                setTeamsOpen(true);
                setDivisionsErrMsg('');
              } catch ({ error }) {
                setDivisionsErrMsg(`failed to save divisions: ${error}`);
              }
            },
          }}
          errorMessage={divisionsErrMsg}
        />
      </ExpandableCard>
      <ExpandableCard
        title="Admin: Teams"
        description="Make sure the league teams are correct"
        isOpen={teamsOepn}
        onClick={() => setTeamsOpen(!teamsOepn)}
      >
        {Object.entries(teamsByDivision).map(([night, divisions]) => (
          <NightContainer key={night}>
            {Object.entries(divisions).map(([divisionName, teams]) => (
              <NightControl key={divisionName}>
                <NightHeader>
                  <Subtitle>{divisionName}</Subtitle>
                  <Button
                    size="xsmall"
                    onClick={() =>
                      setTeamsByDivision({
                        ...teamsByDivision,
                        [night]: {
                          ...(teamsByDivision[night as DayOfWeek] || {}),
                          [divisionName]: [
                            ...((teamsByDivision[night as DayOfWeek] || {})[divisionName] || []),
                            { xref: '', name: '' },
                          ],
                        },
                      })
                    }
                  >
                    +
                  </Button>
                </NightHeader>
                {teams.map((team, idx) => (
                  <TeamInputs key={idx}>
                    <TextInput
                      label={`Team #${idx} Key`}
                      value={team.xref}
                      onChange={e =>
                        setTeamsByDivision({
                          ...teamsByDivision,
                          [night]: {
                            ...(teamsByDivision[night as DayOfWeek] || {}),
                            [divisionName]: ((teamsByDivision[night as DayOfWeek] || {})[divisionName] || []).map(
                              (v, i) => {
                                if (i === idx) {
                                  return { ...v, xref: e.target.value };
                                }
                                return v;
                              },
                            ),
                          },
                        })
                      }
                    />
                    <TextInput
                      label={`Team #${idx} Name`}
                      value={team.name}
                      onChange={e =>
                        setTeamsByDivision({
                          ...teamsByDivision,
                          [night]: {
                            ...(teamsByDivision[night as DayOfWeek] || {}),
                            [divisionName]: ((teamsByDivision[night as DayOfWeek] || {})[divisionName] || []).map(
                              (v, i) => {
                                if (i === idx) {
                                  return { ...v, name: e.target.value };
                                }
                                return v;
                              },
                            ),
                          },
                        })
                      }
                    />
                  </TeamInputs>
                ))}
              </NightControl>
            ))}
          </NightContainer>
        ))}
        <FormFooter
          primaryButton={{
            text: 'Save',
            onClick: async e => {
              try {
                await saveTeams(
                  Object.entries(teamsByDivision)
                    .flatMap(([night, divisionTeams]) =>
                      Object.entries(divisionTeams).flatMap(([divisionName, teams]) => {
                        return teams.map(team => ({
                          xref: parseInt(team.xref, 10),
                          name: team.name,
                          night: night as DayOfWeek,
                          division_name: divisionName,
                        }));
                      }),
                    )
                    .filter(team => !!team.xref),
                );
                setTeamsOpen(false);
                setTeamsErrMsg('');
              } catch ({ error }) {
                setTeamsErrMsg(`failed to save teams: ${error}`);
              }
            },
          }}
          errorMessage={teamsErrMsg}
        />
      </ExpandableCard>
    </>
  );
}

export default SeasonAdmin;
