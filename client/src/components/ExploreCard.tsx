import { useNavigate } from "react-router";
import styled from "styled-components";

const Layout = styled.div`
  margin: 3rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-basis: 25%;
  max-height: 50vh;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 927px) {
    flex-basis: 80%;
  }
`;

const SubLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.p`
  padding-left: 30px;
  font-size: 1.25rem;
  font-weight: 500;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 200px;
  opacity: 75%;
`;

const Description = styled.p`
  font-size: 1.3rem;
  padding-left: 10px;
`;

type Card = {
  title: string;
  image: string;
  description: string;
  link: string;
};

export default function ExploreCard({ title, image, description, link }: Card) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/explore/${link}`);
  };
  return (
    <Layout onClick={handleClick}>
      <Header>{title}</Header>
      <SubLayout>
        <Line />
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
        <Description>{description}</Description>
      </SubLayout>
    </Layout>
  );
}
