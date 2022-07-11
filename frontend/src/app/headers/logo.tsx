import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MongoDBLogoMark } from '@leafygreen-ui/logo';

const leafAnimation = keyframes`
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(5deg);
  }
`;

const StyledLogo = styled(MongoDBLogoMark)`
  display: inline-block;
  margin: 24px;
  animation: ${leafAnimation} 3s infinite alternate-reverse ease-in-out;
  transform-origin: 50% 100%;
`;

function Logo() {
  return <StyledLogo style={{ marginTop: 0, marginBottom: 0 }} height={48} />;
}

export default Logo;
