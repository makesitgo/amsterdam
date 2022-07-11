import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import { Body, H1 } from '@leafygreen-ui/typography';

import { useRealm } from '../../realm';

import Logo from './logo';

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  margin-top: 0.5rem;
`;

const NavLinks = styled.ul`
  margin-right: auto;
  text-align: left;
  display: flex;
`;

const UserInfo = styled.div`
  margin-left: auto;
  text-align: right;
  padding-right: 0.5rem;
`;

function Header() {
  const navTo = useNavigate();
  const { logout, user } = useRealm();

  return (
    <StyledHeader>
      <NavLinks>
        <Link style={{ margin: '1rem', textDecoration: 'none' }} to="/seasons">
          Seasons
        </Link>
      </NavLinks>
      <span style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navTo('/')}>
        <H1>Amsterdam Billiards</H1>
        <Logo />
      </span>
      {user && (
        <UserInfo>
          <Button variant="primaryOutline" onClick={logout}>
            Logout
          </Button>
          <Body>{user.providerType === 'anon-user' ? 'Guest' : user.profile.email || user.id}</Body>
        </UserInfo>
      )}
    </StyledHeader>
  );
}

export default Header;
