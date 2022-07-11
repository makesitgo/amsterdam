import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import TextInput from '@leafygreen-ui/text-input';
import { Body } from '@leafygreen-ui/typography';
import { Navigate } from 'react-router-dom';

import { useRealm } from '../../realm';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginContainer = styled.div`
  min-width: 360px;
  padding: 1rem;
  border: 1px solid;
`;

const LoginAnonContainer = styled.div`
  min-width: 360px;
  padding: 0 1rem 1rem 1rem;
  margin-top: 0.5rem;
`;

function LoginPage() {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, loginAnonymous, user } = useRealm();

  let from = (location as any).state?.from?.pathname || '/';

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <StyledLogin>
      <LoginContainer>
        <Body style={{ marginBottom: '1rem' }}>Please log in using your credentials</Body>
        <TextInput
          label="Username"
          placeholder="your.email@example.com"
          onChange={e => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <TextInput
          label="Password"
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <Button style={{ marginTop: '1rem' }} variant="primary" onClick={() => login(username, password)}>
          Login
        </Button>
      </LoginContainer>
      <LoginAnonContainer>
        <Body style={{ marginBottom: '0.5rem' }}>Or log in as a guest</Body>
        <Button variant="primaryOutline" onClick={() => loginAnonymous()}>
          Login Anonymously
        </Button>
      </LoginAnonContainer>
    </StyledLogin>
  );
}

export default LoginPage;
