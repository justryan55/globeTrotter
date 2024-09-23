import styled from "styled-components";
import UserSnapshot from "./UserSnapshot";
import { useNavigate } from "react-router";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 0.5px rgb(0, 0, 0, 0.2) solid;
  border-radius: 1.5rem;
`;

const LogoLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const LogoImg = styled.img`
  height: 3rem;
`;

const LogoText = styled.p`
  padding: 0.751rem;
  font-size: 2rem;
`;

const Line = styled.div`
  width: 80%;
  height: 1px;
  background-color: rgb(0, 0, 0, 0.5);
`;

const LineLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 25px;

  p {
    color: black;
  }

  svg {
    stroke: black;
  }

  &:hover {
    cursor: pointer;

    p {
      color: #3283ae;
    }
    svg {
      stroke: #3283ae;
    }
  }
`;

const MenuImg = styled.svg`
  padding: 1rem;
  opacity: 0.75;
`;

const MenuText = styled.p`
  color: rgb(0, 0, 0, 0.75);
  font-size: 1.25rem;
  padding: 0.5rem;
  font-weight: 500;
`;

export default function NavigationBar() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const handleClick = (item: string) => {
    navigate("/" + item.toLowerCase());
  };

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <Layout>
      <LogoLayout>
        <LogoImg src="/images/globe.svg" />
        <LogoText>Globe Trotter</LogoText>
      </LogoLayout>
      <UserSnapshot />
      <LineLayout>
        <Line />
      </LineLayout>
      <MenuLayout onClick={() => handleClick("Home")}>
        <MenuImg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nav-icon"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </MenuImg>
        <MenuText>Home</MenuText>
      </MenuLayout>
      <MenuLayout onClick={() => handleClick("Explore")}>
        <MenuImg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nav-icon"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </MenuImg>
        <MenuText>Explore</MenuText>
      </MenuLayout>
      <MenuLayout onClick={() => handleClick("Messages")}>
        <MenuImg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nav-icon"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </MenuImg>
        <MenuText>Messages</MenuText>
      </MenuLayout>
      <MenuLayout onClick={() => handleClick("Profile")}>
        <MenuImg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nav-icon"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </MenuImg>

        <MenuText>Profile</MenuText>
      </MenuLayout>

      <MenuLayout onClick={handleLogout}>
        <MenuImg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nav-icon"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </MenuImg>
        <MenuText>Log Out</MenuText>
      </MenuLayout>
    </Layout>
  );
}
