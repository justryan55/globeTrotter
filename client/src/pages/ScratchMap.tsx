import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import { fetchData } from "../services/helpers";

const PageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #f8f8ff;
`;

const CardLayout = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: scroll;
`;

const CountryCard = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  &:hover {
    font-weight: 500;
    cursor: pointer;
  }
`;

type Country = {
  countryName: string;
  countryCode: string;
};

export default function ScratchMap() {
  const [countries, setCountries] = useState<string[]>([]);
  const [countriesVisited, setCountriesVisited] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetchData(`getCountry`, "GET");

        if (!res?.ok) {
          throw new Error(`Response status: ${res?.status}`);
        }

        const data = await res?.json();
        setCountries(data.payload.countries);
      };

      const getCountriesVisitedByUser = async () => {
        const res = await fetchData(`getCountriesVisited`, "GET");

        if (!res?.ok) {
          throw new Error(`Response status: ${res?.status}`);
        }

        const data = await res.json();
        const countriesVisitedByUser = data.payload.countriesVisitedByUser;
        setCountriesVisited(countriesVisitedByUser);
      };

      getData();
      getCountriesVisitedByUser();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const hasVisited = (countryName: string) => {
    return countriesVisited.includes(countryName);
  };

  const handleClick = async ({ countryName, countryCode }: Country) => {
    try {
      // todo
      // 2024-09-09
      // So the order of operations here is interesting, and I wonder if its on purpose. Typically the easilest
      // way to do this would be to do the POST first, if that is successful then modify the internal state. What
      // you have done (and not saying it is wrong, but want to point out how its a different and more complicated
      // approach that can be prone to race conditions) is

      if (!hasVisited(countryName)) {
        setCountriesVisited((prevVisited) => [...prevVisited, countryName]);
      }

      // todo
      // 2024-09-09
      // Also what happens if you click the country accidently. It saves to the DB and there is no way to
      // undo it? How could you fix this? So you could create a function here that does the oposite,
      // and then a backend route to also do the opposite. You'll probably find you're dulicating a lot
      // of code. These functions would be called something like 'addVistedCountry' and 'removeVisitedCountry'.
      // So what would you call the function if it was the same, and how would you do it? Lets chat about this,
      // it happens a lot and good to understand how this kind of "abstraction" works.

      const res = await fetchData(`addCountry`, "POST", {
        countryName,
        countryCode,
      });

      if (!res?.ok) {
        setCountriesVisited((prevVisited) =>
          prevVisited.filter((name) => name !== countryName)
        );
        throw new Error(`Response status: ${res?.status}`);
      }

      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <NavigationBar />
      <CardLayout>
        {countries.map((country) => {
          const countryName = country.name;
          const countryCode = country.code;
          return (
            <CountryCard
              onClick={() => {
                handleClick({ countryName, countryCode });
              }}
            >
              {countryName} -
              {hasVisited(countryName) ? (
                <span style={{ color: "green", fontWeight: "500" }}>
                  Visited
                </span>
              ) : (
                <span style={{ color: "red" }}> Not Visited</span>
              )}
            </CountryCard>
          );
        })}
      </CardLayout>
    </PageLayout>
  );
}
