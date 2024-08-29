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

export default function Post({ profileImage, name, timestamp, content }) {
  const [user] = useContext(UserContext);

  return (
    <>
      <Layout>
        <PostDetails>
          <UserImg src={profileImage} />
          <Poster>
            <Name>{name}</Name>
            <Timestamp>{timestamp}</Timestamp>
          </Poster>
        </PostDetails>
        <PostContent>{content}</PostContent>
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
