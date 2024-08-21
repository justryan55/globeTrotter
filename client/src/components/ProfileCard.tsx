import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-basis: 25%;
  &:hover {
    cursor: pointer;
  }
`;

const SubLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AvatarImg = styled.img`
  height: 150px;
`;

const Header = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
`;

const Text = styled.p`
  text-align: center;
`;

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
`;

const SecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const Counter = styled.div`
  margin-top: 10px;
`;

const CounterTitle = styled.p`
  margin-top: 5px;
  font-weight: 500;
`;

const LocationLayout = styled.div`
  display: flex;
  gap: 10px;
`;

const LocationIcon = styled.img``;

export default function ProfileCard() {
  const [user] = useContext(UserContext);

  return (
    <Layout>
      <AvatarImg src="/images/avatar.png" />
      <Header>
        {user.firstName} {user.lastName}
      </Header>
      <LocationLayout>
        <LocationIcon src="images/map-pin.svg" />
        <Text>Current Location</Text>
      </LocationLayout>
      <Text>
        A travel enthusiast sharing my adventures, tips, and travel stories to
        inspire your next journey.
      </Text>
      <FirstRow>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Countries</CounterTitle>
        </Column>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Cities</CounterTitle>
        </Column>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Contributions</CounterTitle>
        </Column>
      </FirstRow>
      <SecondRow>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Followers</CounterTitle>
        </Column>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Following</CounterTitle>
        </Column>
      </SecondRow>
    </Layout>
  );
}

// Itinerary creator, google map restaurant tool, map selector
