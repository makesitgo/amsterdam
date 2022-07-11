import React from 'react';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';

const StyledButton = styled(Button)`
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.lg.blue.base};
  &:hover {
    background: none;
    box-shadow: none;
    text-decoration: underline;
  }
`;

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

function PlainButton({ children, ...rest }: Props) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default PlainButton;
