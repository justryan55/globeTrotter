import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import GoogleMapComponent from "../components/GoogleMapComponent";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;

  @media (max-width: 768px) {
    grid-template-columns: 5fr;
  }
`;

export default function RestaurantFinder() {
  return (
    <PageLayout>
      <NavigationBar />
      <div>
        <GoogleMapComponent />
      </div>
    </PageLayout>
  );
}
