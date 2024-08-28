import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  box-sizing: border-box;
  border: 0.5px rgb(0, 0, 0, 0.2) solid;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* grid-column: span 2; */
`;

const UserImg = styled.img`
  height: 80px;
  margin-right: 1rem;
`;

const PostDetails = styled.div`
  display: flex;
`;

const Poster = styled.div``;

const Name = styled.p`
  margin-bottom: 0px;
`;

const Timestamp = styled.p`
  font-size: 0.8rem;
  color: #5e5e5e;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const ActionButton = styled.p`
  text-align: center;
`;

export default function Post() {
  const [user] = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Layout>
        <PostDetails>
          <UserImg src="/images/avatar.png" />
          <Poster>
            <Name>
              {user.firstName} {user.lastName}
            </Name>
            <Timestamp>Posted 5 minutes ago</Timestamp>
          </Poster>
        </PostDetails>
        <PostContent>
          Just got back from an epic hike at Blue Mountain! 🏞️ The view at the
          top was breathtaking, and I even spotted a few deer along the trail.
          🦌 Feeling so refreshed and energized! 💪
        </PostContent>
        <ActionButtons>
          <ActionButton>Like</ActionButton>
          <ActionButton>Comment</ActionButton>
          <ActionButton>Share</ActionButton>
        </ActionButtons>
      </Layout>
      <Layout>
        <PostDetails>
          <UserImg src="/images/avatar.png" />
          <Poster>
            <Name>
              {user.firstName} {user.lastName}
            </Name>
            <Timestamp>Posted 15 minutes ago</Timestamp>
          </Poster>
        </PostDetails>
        <PostContent>
          Now it’s time to unwind with some coffee ☕ and catch up on that book
          I’ve been meaning to finish. 📚 Hope everyone is having a great day!
        </PostContent>
        <ActionButtons>
          <ActionButton>Like</ActionButton>
          <ActionButton>Comment</ActionButton>
          <ActionButton>Share</ActionButton>
        </ActionButtons>
      </Layout>
    </>
  );
}
