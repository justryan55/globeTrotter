import styled from "styled-components";
import Post from "./Post";
import CreateNewPost from "./CreateNewPost";
import { fetchData } from "../services/helpers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../services/AuthContext";

const Layout = styled.div`
  margin: 3rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-basis: 25%;
  overflow-y: scroll;
  &:hover {
    cursor: pointer;
  }
`;

const SubLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export default function FeedCard() {
  const [posts, setPosts] = useState([]);
  const [user] = useContext(UserContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const userid = user.userId;

  const fetchPosts = async () => {
    const res = await fetchData(`${backendURL}/api/${userid}/getPosts`, "GET");
    const data = await res.json();
    setPosts(data.details);
  };

  useEffect(() => {
    fetchPosts();
  }, [userid]);

  return (
    <Layout>
      <Header>Feed</Header>
      <Line />
      <CreateNewPost onPostCreated={fetchPosts} />
      <SubLayout>
        {posts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          posts &&
          posts.map((post) => {
            return (
              <Post
                postId={post.postId}
                profileImage="/images/avatar.png"
                name={post.postedBy}
                timestamp={post.createdAt}
                content={post.content}
              />
            );
          })
        )}
      </SubLayout>
    </Layout>
  );
}
