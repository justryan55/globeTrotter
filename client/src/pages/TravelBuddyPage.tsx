import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import FriendFinder from "../components/FriendFinder";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;

  @media (max-width: 768px) {
    grid-template-columns: 5fr;
  }
`;

export default function TravelBuddyPage() {
  return (
    <PageLayout>
      <NavigationBar />
      <FriendFinder />
    </PageLayout>
  );
}
