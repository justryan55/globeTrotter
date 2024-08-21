import styled from "styled-components";

const Layout = styled.div`
  margin: 3rem 3rem 3rem 0rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-basis: 25%;
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

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

export default function ProfileFeed() {
  return (
    <Layout>
      <Header>
        <HeaderText>Posts</HeaderText>
        <HeaderText>Comments</HeaderText>
        <HeaderText>Likes</HeaderText>
        <HeaderText>Itineraries</HeaderText>
      </Header>
      <SubLayout></SubLayout>
    </Layout>
  );
}
