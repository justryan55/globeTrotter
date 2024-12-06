/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../services/helpers";
import Avvvatars from "avvvatars-react";
import { useParams } from "react-router";
import FollowFriend from "./FollowFriend";
import MessageFriend from "./MessageFriend";

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

  @media (max-width: 768px) {
    margin: 1rem;
  }
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

const Bio = styled.p``;

const LocationIcon = styled.img``;

const LocationText = styled.p``;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export default function ViewUserProfileCard() {
  const { userId } = useParams();
  const [countriesVisited, setCountriesVisited] = useState([]);
  const [location, setLocation] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const fetchUser = async () => {
    const res = await fetchData(`${userId}/getUser`, "GET");
    const data = await res?.json();
    setBio(data.message.bio);
    setName(data.message.firstName + " " + data.message.lastName);
    setDisplayName(`${data.message.firstName[0]}${data.message.lastName[0]}`);
    setFollowers(data.message.followers);
    setFollowing(data.message.friends);
    setCountriesVisited(data.message.countries_visited);
    setLocation(data.message.currentLocation);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Layout>
      <Avvvatars value={name} size={200} displayValue={displayName} />
      <NameContainer>
        <Header>{name}</Header>
        <BtnDiv>
          {userId && <FollowFriend Id={userId} />}
          {userId && <MessageFriend Id={userId} />}
        </BtnDiv>
      </NameContainer>
      <LocationLayout>
        <LocationIcon src="../images/map-pin.svg" />

        <LocationText>{location}</LocationText>
      </LocationLayout>

      <Text>
        <Bio>{bio}</Bio>
      </Text>
      <FirstRow>
        <Column>
          <Counter>{countriesVisited.length}</Counter>
          <CounterTitle>Countries</CounterTitle>
        </Column>
        <Column>
          <Counter>{followers.length}</Counter>
          <CounterTitle>Followers</CounterTitle>
        </Column>
        <Column>
          <Counter>{following.length}</Counter>
          <CounterTitle>Following</CounterTitle>
        </Column>
      </FirstRow>
    </Layout>
  );
}
