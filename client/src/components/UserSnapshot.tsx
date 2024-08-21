import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";

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

  return (
    <Layout>
      <Box>
        <FirstRow>
          <AvatarImg src="/images/avatar.png" />
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </FirstRow>
        <SecondRow>
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
        </SecondRow>
      </Box>
    </Layout>
  );
}
