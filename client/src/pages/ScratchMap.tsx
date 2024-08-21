import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;
`;

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const CountryCard = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default function ScratchMap() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data = await res.json();
        setCountries(data);
      };

      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = (country) => {
    console.log(country);
  };

  return (
    <PageLayout>
      <NavigationBar />
      <CardLayout>
        {countries.map((country) => {
          const countryName = country.name.common;
          return (
            <CountryCard
              onClick={() => {
                handleClick(countryName);
              }}
            >
              {countryName}
            </CountryCard>
          );
        })}
      </CardLayout>
    </PageLayout>
  );
}
