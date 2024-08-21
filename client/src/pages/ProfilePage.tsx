import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import ProfileCard from "../components/ProfileCard";
import ProfileFeed from "../components/ProfileFeed";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;
`;

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const CardContainer = styled.div`
  max-width: 100%;
`;

export default function ProfilePage() {
  return (
    <PageLayout>
      <NavigationBar />
      <CardLayout>
        <CardContainer>
          <ProfileCard />
        </CardContainer>
        <ProfileFeed />
      </CardLayout>
    </PageLayout>
  );
}
