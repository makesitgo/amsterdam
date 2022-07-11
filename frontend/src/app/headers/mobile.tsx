import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Menu, MenuSeparator, MenuItem } from '@leafygreen-ui/menu';
import { H1 } from '@leafygreen-ui/typography';

import { useRealm } from '../../realm';

import Logo from './logo';

const StyledHeader = styled.header`
  margin-top: 0.5rem;
  display: flex;
  justify-items: space-between;
  align-items: center;
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, user } = useRealm();

  return (
    <StyledHeader>
      <Logo />
      <H1 style={{ flex: 1 }}>Amsterdam Billiards</H1>
      <Menu
        align="bottom"
        justify="end"
        open={menuOpen}
        trigger={
          <IconButton size="xlarge" aria-label="User Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon glyph="Ellipsis" />
          </IconButton>
        }
      >
        <MenuItem href="/amsterdam">Standings</MenuItem>
        <MenuItem href="/amsterdam/team">Team Results</MenuItem>
        <MenuItem href="/amsterdam/players">Individual Results</MenuItem>
        <MenuSeparator />
        {!user && <MenuItem href="/amsterdam/login">Login</MenuItem>}
        {user && (
          <MenuItem
            onClick={logout}
            description={user.providerType === 'anon-user' ? 'As guest' : user.profile.email || user.id}
          >
            Logout
          </MenuItem>
        )}
      </Menu>
    </StyledHeader>
  );
}

export default Header;
