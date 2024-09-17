import styled from "styled-components";

const Layout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.svg`
  height: 25%;
`;

const TextContainer = styled.div``;
const Text = styled.p``;

export default function ConstructionPage() {
  return (
    <Layout>
      <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.81,2 12.5,2H11.5Z" />
      </Image>
      <TextContainer>
        <Text>This page is under construction.</Text>
        <Text> Please come back another time.</Text>
      </TextContainer>
    </Layout>
  );
}
