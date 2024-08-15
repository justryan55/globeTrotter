import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import Card from "../components/Card";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function ExplorePage() {
  return (
    <PageLayout>
      <NavigationBar />
      <CardContainer>
        <Card
          title="Itinerary Creator"
          image="/images/list.svg"
          description="Plan your next adventure."
        />
        <Card
          title="Restaurant Finder"
          image="/images/search.svg"
          description="Identify the top-rated restaurants in your area."
        />
        <Card
          title="Scratch Map"
          image="/images/earth-outline.svg"
          description="Highlight all the places you have travelled."
        />
        <Card
          title="Find a Travel Buddy"
          image="/images/users.svg"
          description="Find a travel buddy for your next adventure."
        />
      </CardContainer>
    </PageLayout>
  );
}

// Itinerary creator, google map restaurant tool, map selector
