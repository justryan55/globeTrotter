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

type Post = {
  postId: string;
  postedBy: string;
  createdAt: Date;
  content: string;
  postUserId: string;
  userId: string;
  fetchPosts: () => void;
};

export default function FeedCard() {
  const [posts, setPosts] = useState({
    usersPosts: [],
    friendsPosts: [],
  });

  const [user] = useContext(UserContext);
  const userid = user.userId;

  const fetchPosts = async () => {
    const res = await fetchData(`${userid}/getPosts`, "GET");
    const data = await res?.json();

    setPosts({
      usersPosts: data.usersPosts,
      friendsPosts: data.friendsPosts,
    });
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
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  const allPosts = [...posts.usersPosts, ...posts.friendsPosts];

  return (
    <Layout>
      <Header>Feed</Header>
      <Line />
      <CreateNewPost onPostCreated={fetchPosts} />
      <SubLayout>
        {/* Currently not working due to posts.friendPosts arrays being empty but still showing  */}
        {allPosts.length === 0 ? (
          <p>There are no posts in your feed.</p>
        ) : (
          allPosts &&
          allPosts.map((post: Post) => {
            if (
              !post ||
              !post.postId ||
              !post.postedBy ||
              !post.createdAt ||
              !post.content
            ) {
              return null;
            }

            return (
              <Post
                key={post.postId}
                postId={post.postId}
                name={post.postedBy}
                timestamp={formatTimestamp(post.createdAt)}
                content={post.content}
                postUserId={post.userId}
                fetchPosts={fetchPosts}
              />
            );
          })
        )}
      </SubLayout>
    </Layout>
  );
}
