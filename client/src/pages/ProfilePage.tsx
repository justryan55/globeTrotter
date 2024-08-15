import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import ProfileCard from "../components/ProfileCard";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;
`;

const CardContainer = styled.div`
  max-width: 33%;
`;

export default function ProfilePage() {
  return (
    <PageLayout>
      <NavigationBar />
      <CardContainer>
        <ProfileCard />
      </CardContainer>
    </PageLayout>
  );
}
