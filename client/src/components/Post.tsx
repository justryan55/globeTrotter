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
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionButton = styled.svg``;

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
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-heart"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-share-2"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>Share
            </ActionButton>
          </ActionButtonContainer>
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
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-heart"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-share-2"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>Share
            </ActionButton>
          </ActionButtonContainer>
        </ActionButtons>
      </Layout>
      <Layout>
        <PostDetails>
          <UserImg src="/images/avatar.png" />
          <Poster>
            <Name>
              {user.firstName} {user.lastName}
            </Name>
            <Timestamp>Posted 45 minutes ago</Timestamp>
          </Poster>
        </PostDetails>
        <PostContent>
          Tried making homemade pizza tonight, and honestly… not too shabby! 🍽️
          Who knew I could pull off a crispy crust like that? 😄 Might have gone
          a little overboard with the cheese, but no regrets. 🧀
        </PostContent>
        <ActionButtons>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-heart"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer>
            <ActionButton
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-share-2"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>Share
            </ActionButton>
          </ActionButtonContainer>
        </ActionButtons>
      </Layout>
    </>
  );
}
