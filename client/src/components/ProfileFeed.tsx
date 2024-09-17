import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { UserContext } from "../services/AuthContext";
import Post from "./Post";

const Layout = styled.div`
  margin: 3rem 3rem 3rem 0rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-basis: 25%;
  max-height: 90vh;

  &:hover {
    cursor: pointer;
  }
`;

const SubLayout = styled.div`
position: relative
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 70vh;
  overflow-y: scroll;
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
  }
`;

export default function ProfileFeed() {
  const [content, setContent] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const userid = user.userId;
  // const handleClick = (item: string) => {
  //   navigate("/profile/" + item.toLowerCase());
  // };

  const handlePostClick = async () => {
    const res = await fetchData(`${userid}/getPosts`, "GET");
    const data = await res?.json();

    setContent(data.usersPosts);
    console.log(data);
    console.log(content);
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

  return (
    <Layout>
      <Header>
        {/* <HeaderText onClick={() => handleClick("Posts")}>Posts</HeaderText> */}
        <HeaderText onClick={handlePostClick}>Posts</HeaderText>
        <HeaderText>Comments</HeaderText>
        <HeaderText>Likes</HeaderText>
        <HeaderText>Itineraries</HeaderText>
      </Header>
      <SubLayout>
        {content.map((post) => (
          <Post
            key={post.postId}
            postId={post.postId}
            profileImage="/images/avatar.png"
            name={post.postedBy}
            timestamp={formatTimestamp(post.createdAt)}
            content={post.content}
          />
        ))}
      </SubLayout>
    </Layout>
  );
}
