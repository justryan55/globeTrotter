import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import Avvvatars from "avvvatars-react";
import { fetchCountriesVisited } from "../services/helpers";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: rgb(249, 249, 249);
  width: 80%;
  padding: 0.5rem;
  border: 1px rgb(192, 192, 192, 0.5) solid;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
`;

const SecondRow = styled.div`
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

const Text = styled.p`
  padding-left: 20px;
  font-weight: 500;
`;

const Counter = styled.div`
  margin-top: 10px;
`;

const CounterTitle = styled.p`
  margin-top: 5px;
  font-weight: 500;
`;

const AvatarImg = styled.img`
  height: 70px;
  padding-right: 20px;
`;

export default function UserSnapshot() {
  const [user] = useContext(UserContext);
  const [countriesVisited, setCountriesVisited] = useState([]);
  const displayName = user.firstName[0] + user.lastName[0];
  const name = user.firstName + " " + user.lastName;

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetchCountriesVisited(user.userId);
      const data = await res?.json();
      setCountriesVisited(data.message);
      user.countriesVisited = data.message;
    };

    fetchCountries();
  }, []);

  return (
    <Layout>
      <Box>
        <FirstRow>
          <Avvvatars value={name} size={100} displayValue={displayName} />
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </FirstRow>
        <SecondRow>
          <Column>
            <Counter>{user.countriesVisited.length}</Counter>
            <CounterTitle>Countries</CounterTitle>
          </Column>
          <Column>
            <Counter>{user.followers.length}</Counter>
            <CounterTitle>Followers</CounterTitle>
          </Column>
          <Column>
            <Counter>{user.friends.length}</Counter>
            <CounterTitle>Following</CounterTitle>
          </Column>
        </SecondRow>
      </Box>
    </Layout>
  );
}
