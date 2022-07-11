import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import Modal from '@leafygreen-ui/modal';
import { H2, Subtitle } from '@leafygreen-ui/typography';

import { useAtlas } from '../../realm';
import { Season } from '../../types';

import NewSeason from './new_season';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  seasons: Season[];
  saveSeason: (season: Omit<Season, '_id'>) => Promise<void>;
}

function SeasonsDashboard({ seasons, saveSeason }: Props) {
  const navTo = useNavigate();
  const { data } = useAtlas();

  const [modalOpen, setModalOpen] = useState(false);

  if (!data) {
    return null;
  }

  return (
    <StyledPage>
      <H2 style={{ marginBottom: '1rem' }}>Pick a season:</H2>
      <CardList>
        {seasons.map(season => (
          <Card
            style={{ minWidth: '360px' }}
            key={season.xref}
            onClick={() => navTo(`${season.year}/${season.term}/${season.type}`)}
          >
            <CardTitle>
              <Subtitle>{season.name}</Subtitle>
              <Menu
                align="bottom"
                justify="start"
                trigger={
                  <Button type="button" size="xsmall" onClick={e => e.stopPropagation()} name="options">
                    <Icon glyph="Ellipsis" />
                  </Button>
                }
              >
                <MenuItem onClick={() => console.log(`psyche! like i'd let you do this...`)}>Delete season</MenuItem>
              </Menu>
            </CardTitle>
          </Card>
        ))}
        <Card style={{ minWidth: '180px' }} onClick={() => setModalOpen(true)}>
          Create a new season...
        </Card>
      </CardList>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <NewSeason saveSeason={s => saveSeason(s).then(() => setModalOpen(false))} />
      </Modal>
    </StyledPage>
  );
}

export default SeasonsDashboard;
