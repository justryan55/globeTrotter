import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import ProfileCard from "../components/ProfileCard";
import ProfileFeed from "../components/ProfileFeed";

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100vw;
  }
`;

const CardContainer = styled.div`
  max-width: 100vw;

  @media (max-width: 768px) {
    max-width: 100vw;
  }
`;

export default function ProfilePage() {
  return (
    <PageLayout>
      <NavigationBar />
      <CardLayout>
        <CardContainer>
          <ProfileCard />
        </CardContainer>
        <CardContainer>
          <ProfileFeed />
        </CardContainer>
      </CardLayout>
    </PageLayout>
  );
}
