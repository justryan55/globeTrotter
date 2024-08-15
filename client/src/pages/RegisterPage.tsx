import styled from "styled-components";
import { AuthForm } from "../components/AuthForm";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100vh;
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterPage = () => {
  return (
    <PageLayout>
      <LeftColumn>
        <Image src="/images/welcome-image.jpg" />
      </LeftColumn>
      <RightColumn>
        <AuthForm auth={"register"} />
      </RightColumn>
    </PageLayout>
  );
};

export default RegisterPage;
