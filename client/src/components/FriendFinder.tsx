import { useContext, useEffect, useState } from "react";
import { fetchData } from "../services/helpers";
import styled from "styled-components";
import FollowFriend from "./FollowFriend";
import { UserContext } from "../services/AuthContext";
import Avvvatars from "avvvatars-react";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 1px rgb(0, 0, 0, 0.3) solid;
  width: 100%;
  max-width: 300px;

  padding: 2rem;
  margin: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.div`
  display: flex;
  gap: 5px;
`;

const Layout = styled.div`
  margin: 3rem;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const Header = styled.p`
  padding-left: 30px;
  font-size: 1.25rem;
  font-weight: 500;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

type User = {
  id: string;
  firstName: string;
  lastName: string;
  userId: string;
};

export default function FriendFinder() {
  const [users, setUsers] = useState<User[]>([]);
  const user = useContext(UserContext);
  const userId = user && user[0] ? user[0].userId : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetchData(`/${userId}/getUsers`, "GET");
      const data = await res?.json();
      setUsers(data.message);
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Layout>
      <Header>Find a Travel Buddy</Header>
      <Line />
      <Container>
        {users.map((user: User) => (
          <User key={user.id} onClick={() => handleClick(user.id)}>
            <Avvvatars
              value={`${user.firstName[0]}${user.lastName[0]}`}
              size={100}
            />
            <Name>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
            </Name>
            <FollowFriend Id={user.id} />
          </User>
        ))}
      </Container>
    </Layout>
  );
}
