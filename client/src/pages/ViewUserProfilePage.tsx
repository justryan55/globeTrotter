import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import ViewUserProfileCard from "../components/ViewUserProfileCard";
import ViewUserProfileFeed from "../components/ViewUserProfileFeed";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;

  @media (max-width: 768px) {
    grid-template-columns: 5fr;
  }
`;

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const CardContainer = styled.div`
  max-width: 100%;
`;

export default function ViewUserProfilePage() {
  return (
    <PageLayout>
      <NavigationBar />
      <CardLayout>
        <CardContainer>
          <ViewUserProfileCard />
        </CardContainer>
        <ViewUserProfileFeed />
      </CardLayout>
    </PageLayout>
  );
}
