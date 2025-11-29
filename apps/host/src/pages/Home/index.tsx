import * as React from 'react';
import { useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import styled, { css } from 'styled-components';

import { maxWidth } from 'ui_components/styles/mq';
import { Logo } from 'ui_components/Logo';
import StarshipItem from 'ui_components/StarshipItem';
import Card from 'ui_components/Card';
import Spinner from 'ui_components/Spinner';
import Pagination from 'ui_components/Pagination';
import MessageBox from 'ui_components/MessageBox';
import ErrorAlert from 'ui_components/ErrorAlert';

import { useApi } from 'hooks/use-api';

import {
  searchParamsToParams,
  paramsToSearchParams,
} from 'utils/search-params';

import SearchForm from './SearchForm';
import { getDefaultHomePageParams } from './config';

const StarshipsList = styled.ul`
  list-style: none;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    appearance: none;
  }

  & > * + * {
    margin-top: 1.5rem;
  }

  ${maxWidth(
    'md',
    css`
      & > * + * {
        margin-top: 1rem;
      }
    `,
  )}
`;

const StarshipsListContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const HomeContainer = styled.section`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem;
`;

const StarshipsListCard = styled(Card)`
  padding: 1.5rem 2rem;
  min-height: 30rem;
  height: calc(100dvh - 25rem);
  overflow: hidden;

  --clip-width: 10rem;

  ${maxWidth(
    'md',
    css`
      padding: 1.5rem 1rem;
      --clip-width: 5rem;
      max-height: 70rem;
    `,
  )}
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
  align-self: center;
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

  const {
    data: starshipsResponse,
    error,
    isPending,
    isInitial,

    makeApiCall,
    cancelApiCall,
  } = useApi('getStarships');

  useEffect(() => {
    const params = paramsToSearchParams(
      { page, search },
      getDefaultHomePageParams(),
    );

    makeApiCall(params);

    return () => {
      cancelApiCall();
    };
  }, [page, search, makeApiCall, cancelApiCall]);

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
      getDefaultHomePageParams(),
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
        getDefaultHomePageParams(),
      );

      setSearchParams(filteredParams);
    },
    [setSearchParams],
  );

  const onClearSearch = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <HomeContainer>
      <StarshipsLogo />

      <StarshipsSearchForm
        value={search}
        onClear={onClearSearch}
        onChange={onSearchChange}
        disabled={isPending || isInitial}
      />

      <StarshipsListCard $clipHeight="35%" $clipWidth="var(--clip-width)">
        {isPending || isInitial ? (
          <StarshipsSpinnerContainer>
            <Spinner />
          </StarshipsSpinnerContainer>
        ) : error ? (
          <ErrorAlert>{error.message}</ErrorAlert>
        ) : starships.length > 0 ? (
          <StarshipsListContainer>
            <StarshipsList>
              {starships.map((starship) => (
                <li key={starship.id}>
                  <Link to={`/starships/${starship.id}`}>
                    <StarshipItem name={starship.name} model={starship.model} />
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
        ) : (
          <MessageBox>No starships found</MessageBox>
        )}
      </StarshipsListCard>
    </HomeContainer>
  );
};

export default Home;
