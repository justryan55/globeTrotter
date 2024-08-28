import styled from "styled-components";
import Post from "./Post";

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
  return (
    <Layout>
      <Header>Feed</Header>
      <Line />
      <SubLayout>
        <Post />
      </SubLayout>
    </Layout>
  );
}
