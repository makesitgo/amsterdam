import React from 'react';
import Spinner from 'react-spinners/PulseLoader';
import styled from '@emotion/styled';
import Banner from '@leafygreen-ui/banner';

const StyledLoading = styled.div`
  margin: 0 auto;
  max-width: 62%;
  @media (max-width: 720px) {
    max-width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
}

function Loading(_: Props) {
  return (
    <StyledLoading>
      <Banner variant="info" style={{ margin: '1rem 0' }}>
        Please wait while we load the season data.
      </Banner>
      <Spinner color="gray" />
    </StyledLoading>
  );
}

export default Loading;
