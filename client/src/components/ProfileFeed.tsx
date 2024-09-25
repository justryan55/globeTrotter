import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { UserContext } from "../services/AuthContext";
import Post from "./Post";

const Layout = styled.div`
  margin: 3rem 3rem 3rem 0rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-basis: 25%;
  max-height: 100vh;

  @media (max-width: 768px) {
    margin: 3rem;
  }
`;

const SubLayout = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
`;

const PostContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const HeaderText = styled.p`
  padding: 30px;
  font-size: 1.25rem;
  border-right: 1px rgb(0, 0, 0, 0.25) solid;
  border-bottom: 1px rgb(0, 0, 0, 0.25) solid;

  &:hover {
    border-bottom: 1px rgb(0, 0, 0, 1) solid;
    cursor: pointer;
  }
`;

const HeaderTextCross = styled.p`
  padding: 30px;
  font-size: 1.25rem;
  border-right: 1px rgb(0, 0, 0, 0.25) solid;
  border-bottom: 1px rgb(0, 0, 0, 0.25) solid;

  &:hover {
    border-bottom: 1px rgb(0, 0, 0, 1) solid;
    cursor: url("../images/slash.svg"), auto;
  }
`;

const NoPostText = styled.p`
  text-align: center;
`;

type PostType = {
  postId: string;
  name: string;
  timestamp: string;
  content: string;
  createdAt: Date;
  postedBy: string;
  postUserId: string;
  fetchPosts: () => void;
};

export default function ProfileFeed() {
  const [content, setContent] = useState([]);
  const [user] = useContext(UserContext) || [];

  const userid = user?.userId;

  const handlePostClick = async () => {
    const res = await fetchData(`${userid}/getPosts`, "GET");
    const data = await res?.json();

    setContent(data.usersPosts);
  };

  const formatTimestamp = (timestamp: Date) => {
    const current = new Date();
    const provided = new Date(timestamp);
    const timeDifference = current.getTime() - provided.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes === 0) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  };

  useEffect(() => {
    handlePostClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Header>
        <HeaderText onClick={handlePostClick}>Posts</HeaderText>
        <HeaderTextCross>Comments</HeaderTextCross>
        <HeaderTextCross>Likes</HeaderTextCross>
        <HeaderTextCross>Itineraries</HeaderTextCross>
      </Header>
      <SubLayout>
        <PostContainer>
          {content.length > 0 ? (
            content.map((post: PostType) => (
              <Post
                key={post.postId}
                postId={post.postId}
                name={post.postedBy}
                timestamp={formatTimestamp(post.createdAt)}
                content={post.content}
                postUserId={post.postUserId}
                fetchPosts={handlePostClick}
              />
            ))
          ) : (
            <NoPostText>You have made no posts.</NoPostText>
          )}
        </PostContainer>
      </SubLayout>
    </Layout>
  );
}
