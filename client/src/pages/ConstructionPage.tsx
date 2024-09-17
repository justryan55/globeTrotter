import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import ConstructionSign from "../components/ConstructionSign";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;
`;

export default function ConstructionPage() {
  return (
    <PageLayout>
      <NavigationBar />
      <ConstructionSign />
    </PageLayout>
  );
}
