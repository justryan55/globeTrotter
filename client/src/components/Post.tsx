import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import LikeButton from "./LikeButtonPost";
import CommentButton from "./CommentButton";
import CommentComponent from "./CommentComponent";

const Container = styled.div`
  box-sizing: border-box;

  width: 100%;
  margin-bottom: 4rem;
  padding: 1rem;
  border: 0.5px rgb(0, 0, 0, 0.2) solid;
`;

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  box-sizing: border-box;
  /* border: 0.5px rgb(0, 0, 0, 0.2) solid; */
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

const ActionButton = styled.svg`
  &:hover {
    cursor: url("../images/slash.svg"), auto;
  }
`;

type Post = {
  postId: string;
  profileImage: string;
  name: string;
  timestamp: string;
  content: string;
};

export default function Post({
  postId,
  profileImage,
  name,
  timestamp,
  content,
}: Post) {
  const [user] = useContext(UserContext);

  return (
    postId && (
      <Container>
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
              <LikeButton postId={postId} />
            </ActionButtonContainer>
            <ActionButtonContainer>
              <CommentButton postId={postId} />
            </ActionButtonContainer>
            <ActionButtonContainer>
              <ActionButton
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
        <CommentComponent postId={postId} />
      </Container>
    )
  );
}
