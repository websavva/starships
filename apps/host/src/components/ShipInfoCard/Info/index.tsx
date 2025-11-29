import * as React from 'react';
import styled, { css } from 'styled-components';
import { useMemo } from 'react';

import { maxWidth } from 'ui_components/styles/mq';
import type { Starship } from 'api';
import Accordion from 'ui_components/Accordion';

import { formatStarship } from './utils';
import SummaryCard from './SummaryCard';
import {
  Details,
  DetailsColumn,
  DetailsColumnHeading,
  DetailsColumnItem,
  DetailsColumnList,
  DetailsColumnListLinks,
} from './Details';

export interface InfoProps extends React.HTMLAttributes<HTMLDivElement> {
  starship: Starship;
}

const Heading = styled.div`
  font-weight: 600;
  font-size: 2.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2rem;

  ${maxWidth(
    'sm',
    css`
      font-size: 2rem;
    `,
  )}
`;

const Footer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-around;
  width: 100%;
  margin-top: 4rem;

  ${maxWidth(
    'lg',
    css`
      flex-direction: column;
      gap: 2rem;
    `,
  )}
`;

const Info = styled(({ starship, ...props }: InfoProps) => {
  const sections = useMemo(() => {
    const {
      length,
      crew,
      passengers,
      cargo_capacity,
      MGLT,

      hyperdrive_rating,
      consumables,
      cost_in_credits,

      pilots,
      films,

      url: _,
      name: _1,
      id: _2,

      ...basics
    } = formatStarship(starship);

    return {
      basics: Object.values(basics),

      tech: [length, crew, passengers, cargo_capacity, MGLT],

      cards: [hyperdrive_rating, consumables, cost_in_credits],

      list: [pilots, films],
    };
  }, [starship]);

  return (
    <div {...props}>
      <Heading>{starship.name}</Heading>

      <Details>
        <DetailsColumn>
          <DetailsColumnHeading>Basics</DetailsColumnHeading>

          <DetailsColumnList>
            {sections.basics.map(({ label, value }) => (
              <DetailsColumnItem key={label}>
                <span>{label}:</span>
                <span>{value}</span>
              </DetailsColumnItem>
            ))}
          </DetailsColumnList>
        </DetailsColumn>

        <DetailsColumn>
          <DetailsColumnHeading>Characteristics</DetailsColumnHeading>

          <DetailsColumnList>
            {sections.tech.map(({ label, value }) => (
              <DetailsColumnItem key={label}>
                <span>{label}:</span>
                <span>{value}</span>
              </DetailsColumnItem>
            ))}

            {sections.list
              .filter(({ value }) => value.length)
              .map(({ label, value: links }) => (
                <DetailsColumnItem key={label}>
                  <Accordion head={label}>
                    <DetailsColumnListLinks>
                      {links.map(({ value: linkUrl, label: linkLabel }) => (
                        <li key={linkUrl}>
                          <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {linkLabel}
                          </a>
                        </li>
                      ))}
                    </DetailsColumnListLinks>
                  </Accordion>
                </DetailsColumnItem>
              ))}
          </DetailsColumnList>
        </DetailsColumn>
      </Details>

      <Footer>
        {sections.cards.map(({ label, value }) => (
          <SummaryCard key={label} label={label} value={value} />
        ))}
      </Footer>
    </div>
  );
})`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3rem;

  ${maxWidth(
    'sm',
    css`
      padding: 0 1rem;
    `,
  )}
`;

export default Info;
