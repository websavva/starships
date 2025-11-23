import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

import ShipInfoCard from "@/components/ShipInfoCard";
import styled from "styled-components";

const idRegex = /^\d+$/;

export const Ship = styled((props: React.HTMLAttributes<HTMLDivElement>) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isIdInvalid = !idRegex.test(id!);

  useEffect(() => {
    if (isIdInvalid) {
      navigate("/");
    }
  }, [navigate, isIdInvalid]);

  if (isIdInvalid) {
    return null;
  }

  return (
    <section {...props}>
      <ShipInfoCard id={+id!} className="ship-info-card" />
    </section>
  );
})`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  ${ShipInfoCard} {
    width: 80%;
    min-height: 50rem;
    padding: 5rem 2rem;
  }
`;

export default Ship;
