import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import { fetchData } from "../services/helpers";

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

const EditBio = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }
`;

const Bio = styled.p``;

const LocationIcon = styled.img``;

export default function ProfileCard() {
  const [user] = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState({ content: "Add a bio" });

  const userId = user.userId;

  const fetchBio = async () => {
    const res = await fetchData(`${userId}/getUserBio`, "GET");
    const data = await res?.json();
    const bio = data.content;
    setBio({ content: bio });
  };

  useEffect(() => {
    fetchBio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editBio = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing((prev) => !prev);
      updateBio();
    }
  };

  const updateBio = async () => {
    const res = await fetchData(`${userId}/updateBio`, "PUT", bio);
    const data = await res?.json();
  };

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
        {isEditing ? (
          <EditBio
            value={bio.content}
            onChange={(e) => setBio({ content: e.target.value })}
            onKeyDown={handleSubmit}
          />
        ) : (
          <Bio onClick={editBio}>{bio.content}</Bio>
        )}
        {/* A travel enthusiast sharing my adventures, tips, and travel stories to
        inspire your next journey. */}
      </Text>
      <FirstRow>
        <Column>
          <Counter>{user.countriesVisited.length}</Counter>
          <CounterTitle>Countries</CounterTitle>
        </Column>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Followers</CounterTitle>
        </Column>
        <Column>
          <Counter>{user.friends.length}</Counter>
          <CounterTitle>Following</CounterTitle>
        </Column>
      </FirstRow>
      {/* <SecondRow>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Cities</CounterTitle>
        </Column>
        <Column>
          <Counter>0</Counter>
          <CounterTitle>Contributions</CounterTitle>
        </Column>
      </SecondRow> */}
    </Layout>
  );
}

// Itinerary creator, google map restaurant tool, map selector
