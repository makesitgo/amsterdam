import React from 'react';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { Body, H2, H3 } from '@leafygreen-ui/typography';

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  justify-content: center;
`;

const StyledOrderedList = styled.ol`
  list-style: auto;
`;

const StyledUnorderedList = styled.ol`
  list-style: disc;
  margin-left: 1rem;
`;

function HomePage() {
  return (
    <StyledMain>
      <H2>Welcome to Amsterdam Billiards Information</H2>
      <Card>
        <Button href="http://amsterdambilliards.com/" target="_blank" rel="noopener noreferrer">
          Official Amsterdam Billiards & Bar website
        </Button>
        <Button href="/amsterdam/seasons/2022/fall/team_8ball">Team 8-Ball League Site</Button>
      </Card>
      <H3>Why You Should Join an Amsterdam Billiards League:</H3>
      <StyledOrderedList>
        <li>
          <Body>The leagues are for players of all levels, including beginners and Pros</Body>
        </li>
        <li>
          <Body>You'll have fun</Body>
        </li>
        <li>
          <Body>You'll improve your pool game</Body>
        </li>
        <li>
          <Body>It's a great way to meet other pool players</Body>
        </li>
        <li>
          <Body>The leagues are co-ed</Body>
        </li>
        <li>
          <Body>They're inexpensive</Body>
        </li>
        <li>
          <Body>The prizes are great</Body>
        </li>
        <li>
          <Body>
            They're easy to join (just sign up in the club at the front desk or by clicking 'Register Now!' on this
            page)
          </Body>
        </li>
        <li>
          <Body>You get a lot of free stuff:</Body>
          <StyledUnorderedList>
            <li>
              <Body>Play pool for free for a week</Body>
            </li>
            <li>
              <Body>3 hours of free play every week while the league lasts</Body>
            </li>
            <li>
              <Body>Get a dollar off all drinks while you're playing in the leagues</Body>
            </li>
            <li>
              <Body>Mid-Season league party</Body>
            </li>
            <li>
              <Body>League Finals & Registration signup party</Body>
            </li>
          </StyledUnorderedList>
        </li>
      </StyledOrderedList>
      <Button href="https://amsterdambilliards.com/leagues/" target="_blank" rel="noopener noreferrer">
        Register Now!
      </Button>
    </StyledMain>
  );
}

export default HomePage;
