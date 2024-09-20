import { useContext, useEffect, useState } from "react";
import { fetchData } from "../services/helpers";
import styled from "styled-components";
import FollowFriend from "./FollowFriend";
import { UserContext } from "../services/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
  border: 1px rgb(0, 0, 0, 0.3) solid;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */

  width: 25%;
  height: 25%;
  padding: 2rem;
  margin: 1rem;
`;

const Name = styled.div`
  display: flex;
  gap: 5px;
`;

const ProfileImage = styled.img`
  width: 100px;
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
};

export default function FriendFinder() {
  const [users, setUsers] = useState([]);
  const user = useContext(UserContext);
  const userId = user && user[0] ? user[0].userId : null;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetchData(`/${userId}/getUsers`, "GET");
      const data = await res?.json();
      setUsers(data.message);
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Header>Find a Travel Buddy</Header>
      <Line />
      <Container>
        {users.map((user: User) => (
          <User key={user.id}>
            <ProfileImage src="../images/avatar.png" />
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
