import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { starshipsApi, type Starship } from "api/index";

import StarshipItem from "ui_components/StarshipItem";
import Card from "ui_components/Card";
import styled from "styled-components";

const StarshipsList = styled.ul`
  list-style: none;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 1.5rem;
  }
`;

const HomeContainer = styled.section`
  max-width: 70rem;
  margin: 0 auto;
`;

const StarshipsListCard = styled(Card)`
  padding: 1.5rem 2rem;
`;

export const Home = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    starshipsApi
      .getStarships()
      .then((response) => {
        return setStarships(response.results);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  return (
    <HomeContainer>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <StarshipsListCard $clipHeight="35%" $clipWidth="13%">
          <StarshipsList>
            {starships.map((starship) => (
              <li key={starship.name}>
                <Link to={`/starship/${starship.name}`}>
                  <StarshipItem
                    key={starship.name}
                    name={starship.name}
                    model={starship.model}
                  />
                </Link>
              </li>
            ))}
          </StarshipsList>
        </StarshipsListCard>
      )}
    </HomeContainer>
  );
};

export default Home;
