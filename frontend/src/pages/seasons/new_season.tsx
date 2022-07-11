import React, { useState } from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import FormFooter from '@leafygreen-ui/form-footer';
import { Option, Select } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';
import { Body } from '@leafygreen-ui/typography';

import { isLeagueType, isSeasonTerm, DayOfWeek, LeagueType, Season, SeasonTerm } from '../../types';

interface Props {
  saveSeason: (season: Omit<Season, '_id'>) => Promise<void>;
}

function NewSeason({ saveSeason }: Props) {
  const [yearInput, setYearInput] = useState('');
  const [termInput, setTermInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [xrefInput, setXrefInput] = useState('');
  const [name, setName] = useState('');
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [numWeeksInput, setNumWeeksInput] = useState('');
  const [errMsg, setErrMsg] = useState('');
  return (
    <>
      <Select label="Year" placeholder="Choose a year..." value={yearInput} onChange={setYearInput}>
        <Option value="2022">2022</Option>
      </Select>
      <Select label="Term" placeholder="Choose a term..." value={termInput} onChange={setTermInput}>
        <Option value="winter">Winter</Option>
        <Option value="spring">Spring</Option>
        <Option value="summer">Summer</Option>
        <Option value="fall">Fall</Option>
      </Select>
      <Select label="League type" placeholder="Choose a league..." value={typeInput} onChange={setTypeInput}>
        <Option value="team_8ball">Team 8 Ball</Option>
      </Select>
      <TextInput
        label="Amsterdam Key"
        description="Enter the Amsterdam site season id"
        onChange={e => setXrefInput(e.target.value)}
        value={xrefInput}
      />
      <TextInput
        label="Name"
        description="Enter the season name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <div>
        <Body>Select the nights the league plays on</Body>
        <div>
          <Checkbox label="Monday" checked={monday} onChange={e => setMonday(e.target.checked)} />
          <Checkbox label="Tuesday" checked={tuesday} onChange={e => setTuesday(e.target.checked)} />
          <Checkbox label="Wednesday" checked={wednesday} onChange={e => setWednesday(e.target.checked)} />
          <Checkbox label="Thursday" checked={thursday} onChange={e => setThursday(e.target.checked)} />
          <Checkbox label="Friday" checked={friday} onChange={e => setFriday(e.target.checked)} />
          <Checkbox label="Saturday" checked={saturday} onChange={e => setSaturday(e.target.checked)} />
          <Checkbox label="Sunday" checked={sunday} onChange={e => setSunday(e.target.checked)} />
        </div>
      </div>
      <TextInput
        label="Season length"
        description="Enter the number of weeks of the regular season"
        onChange={e => setNumWeeksInput(e.target.value)}
        value={numWeeksInput}
      />
      <FormFooter
        primaryButton={{
          text: 'Save',
          onClick: async e => {
            e.stopPropagation();

            var year = 0;
            try {
              year = parseInt(yearInput, 10);
            } catch (e) {
              setErrMsg(`invalid year value: ${e}`);
              return;
            }

            var term: SeasonTerm = 'winter';
            if (isSeasonTerm(termInput)) {
              term = termInput;
            } else {
              setErrMsg(`invalid season term: ${termInput}`);
              return;
            }

            var type: LeagueType = 'team_8ball';
            if (isLeagueType(typeInput)) {
              term = termInput;
            } else {
              setErrMsg(`invalid league type: ${termInput}`);
              return;
            }

            var xref = 0;
            try {
              xref = parseInt(xrefInput, 10);
            } catch (e) {
              setErrMsg(`invalid amsterdam key: ${e}`);
              return;
            }

            var numWeeks = 0;
            try {
              numWeeks = parseInt(numWeeksInput, 10);
            } catch (e) {
              setErrMsg(`invalid amsterdam key: ${e}`);
              return;
            }

            const nights: DayOfWeek[] = [];
            if (monday) {
              nights.push('monday');
            }
            if (tuesday) {
              nights.push('tuesday');
            }
            if (wednesday) {
              nights.push('wednesday');
            }
            if (thursday) {
              nights.push('thursday');
            }
            if (friday) {
              nights.push('friday');
            }
            if (saturday) {
              nights.push('saturday');
            }
            if (sunday) {
              nights.push('sunday');
            }

            try {
              await saveSeason({
                year,
                term,
                type,
                xref,
                name,
                num_weeks: numWeeks,
                nights,
                divisions: nights.reduce((acc, night) => ({ ...acc, [night]: [] }), {}),
              });
            } catch ({ error }) {
              setErrMsg(`failed to save season: ${error}`);
            }
          },
        }}
        errorMessage={errMsg}
      />
    </>
  );
}

export default NewSeason;
