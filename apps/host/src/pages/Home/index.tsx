import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import styled from "styled-components";

import { GetStarshipsResponse, starshipsApi, type Starship } from "api/index";
import { Logo } from "ui_components/Logo";
import StarshipItem from "ui_components/StarshipItem";
import Card from "ui_components/Card";
import Spinner from "ui_components/Spinner";
import Pagination from "ui_components/Pagination";

import {
  searchParamsToParams,
  paramsToSearchParams,
} from "utils/search-params";

import SearchForm from "./SearchForm";
import { getDefaultHomePageParams } from "./config";

const StarshipsList = styled.ul`
  list-style: none;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    appearance: none;
  }

  & > * + * {
    margin-top: 1.5rem;
  }
`;

const StarshipsListContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const HomeContainer = styled.section`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem 0;
`;

const StarshipsListCard = styled(Card)`
  padding: 1.5rem 2rem;
  min-height: 30rem;
  height: calc(100vh - 16rem);
  overflow: hidden;
`;

const StarshipsLogo = styled(Logo)`
  width: 20rem;
  height: auto;
  display: block;
  margin: 0 auto;
`;

const StarshipsSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StarshipsSearchForm = styled(SearchForm)`
  margin: 2rem 0;
`;

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return searchParamsToParams(getDefaultHomePageParams(), searchParams);
  }, [searchParams]);

  const { page, search } = params;

  const [starshipsResponse, setStarshipsResponse] =
    useState<GetStarshipsResponse | null>(null);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);

    starshipsApi
      .getStarships({ page, search: search || null })
      .then(setStarshipsResponse)
      .finally(() => {
        setPending(false);
      });
  }, [page, search]);

  const {
    results: starships = [],
    next: nextPageUrl,
    previous: previousPageUrl,
  } = starshipsResponse || {};

  const hasNextPage = Boolean(nextPageUrl);
  const hasPreviousPage = Boolean(previousPageUrl);

  const switchPage = (page: number) => {
    const filteredParams = paramsToSearchParams(
      { page, search },
      getDefaultHomePageParams()
    );
    setSearchParams(filteredParams);
  };

  const onNextPage = () => {
    switchPage(page + 1);
  };

  const onPreviousPage = () => {
    switchPage(page - 1);
  };

  const onSearchChange = useCallback(
    (name: string) => {
      const filteredParams = paramsToSearchParams(
        { search: name },
        getDefaultHomePageParams()
      );

      setSearchParams(filteredParams);
    },
    [setSearchParams]
  );

  return (
    <HomeContainer>
      <div>
        <StarshipsLogo />

        <StarshipsSearchForm value={search} onChange={onSearchChange} />

        <StarshipsListCard $clipHeight="35%" $clipWidth="13%">
          {pending ? (
            <StarshipsSpinnerContainer>
              <Spinner />
            </StarshipsSpinnerContainer>
          ) : (
            <StarshipsListContainer>
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

              <Pagination
                hasNext={hasNextPage}
                hasPrevious={hasPreviousPage}
                page={page}
                onNext={onNextPage}
                onPrevious={onPreviousPage}
              />
            </StarshipsListContainer>
          )}
        </StarshipsListCard>
      </div>
    </HomeContainer>
  );
};

export default Home;
