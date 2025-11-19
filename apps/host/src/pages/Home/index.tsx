import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import styled from "styled-components";

import { GetStarshipsResponse, starshipsApi, type Starship } from "api/index";
import { Logo } from "ui_components/Logo";
import StarshipItem from "ui_components/StarshipItem";
import Card from "ui_components/Card";
import Spinner from "ui_components/Spinner";
import Pagination from "ui_components/Pagination";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
  margin: 2rem auto;
`;

const StarshipsListCard = styled(Card)`
  padding: 1.5rem 2rem;
`;

const StarshipsLogo = styled(Logo)`
  width: 20rem;
  height: auto;
  display: block;
  margin: 0 auto 3rem auto;
`;

const StarshipsSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [starshipsResponse, setStarshipsResponse] =
    useState<GetStarshipsResponse | null>(null);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);

    starshipsApi
      .getStarships({ page })
      .then(setStarshipsResponse)
      .finally(() => {
        setPending(false);
      });
  }, [page]);

  const {
    results: starships = [],
    next: nextPageUrl,
    previous: previousPageUrl,
  } = starshipsResponse || {};

  const hasNextPage = Boolean(nextPageUrl);
  const hasPreviousPage = Boolean(previousPageUrl);

  return (
    <HomeContainer>
      <div>
        <StarshipsLogo />

        <StarshipsListCard $clipHeight="35%" $clipWidth="13%">
          {pending ? (
            <StarshipsSpinnerContainer>
              <Spinner />
            </StarshipsSpinnerContainer>
          ) : (
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
              {
                <Pagination
                  hasNext={hasNextPage}
                  hasPrevious={hasPreviousPage}
                  page={page}
                  onNext={() =>
                    setSearchParams({ page: (page + 1).toString() })
                  }
                  onPrevious={() =>
                    setSearchParams({ page: (page - 1).toString() })
                  }
                />
              }
            </StarshipsList>
          )}
        </StarshipsListCard>
      </div>
    </HomeContainer>
  );
};

export default Home;
