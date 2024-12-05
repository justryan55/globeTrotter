import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import Messenger from "../components/Messenger";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;

  @media (max-width: 768px) {
    grid-template-columns: 5fr;
  }
`;

export default function HomePage() {
  return (
    <PageLayout>
      <NavigationBar />
      <Messenger />
    </PageLayout>
  );
}
