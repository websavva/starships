import * as React from "react";
import styled, { css } from "styled-components";
import { useState, useEffect, useCallback } from "react";

import { colors } from "styles/colors";
import { maxWidth } from "ui_components/styles/mq";
import Card from "ui_components/Card";

import { debounce } from "utils/debounce";

export interface SearchFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onChange" | "onSubmit"> {
  value: string;

  disabled?: boolean;

  onChange: (value: string) => void;
}

const SearchFormContainer = styled.form`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  color: ${colors.primary.toString()};
  position: relative;

  ${maxWidth(
    "sm",
    css`
      gap: 1rem;
    `
  )}
`;

const SearchInput = styled.input`
  font-size: 2rem;
  flex: 1;
  border-bottom: 1px solid ${colors.tertiary.toString()};
  padding: 0.5rem 1rem;
  background: transparent;
  color: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;

  &::placeholder {
    text-transform: uppercase;
    font-size: 1.1em;

    ${maxWidth(
      "sm",
      css`
        font-size: 0.9em;
      `
    )}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${maxWidth(
    "sm",
    css`
      font-size: 1.6rem;
    `
  )}
`;

const ClearButton = styled.button`
  border-radius: 5px;
  padding: .5rem 2rem;
  filter: brightness(160%);
  background: ${colors.secondary.toString()};
  font-size: 1.7rem;
  text-transform: uppercase;
  font-weight: 400;
  border: none;
  cursor: pointer;
  color: inherit;

  ${maxWidth(
    "sm",
    css`
      padding: 0.5rem;
      font-size: 1.3rem;
    `
  )}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SearchForm: React.FC<SearchFormProps> = ({
  value,
  disabled,
  onChange,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const debouncedOnChange = useCallback(debounce(onChange, 700), [onChange]);

  useEffect(() => {
    if (localValue !== value) {
      debouncedOnChange(localValue);
    }

    return () => {
      debouncedOnChange.cancel();
    };
  }, [localValue, debouncedOnChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    setLocalValue(e.target.value);
  };

  const handleClear = () => {
    setLocalValue("");
  };

  return (
    <Card
      as={SearchFormContainer}
      $clipHeight="60%"
      $clipWidth="5rem"
      onSubmit={handleSubmit}
      {...props}
    >
      <SearchInput
        type="text"
        value={localValue}
        onInput={handleInputChange}
        placeholder="Enter starship's name or model"
        disabled={disabled}
      />
      {localValue && (
        <ClearButton type="button" disabled={disabled} onClick={handleClear}>
          Clear
        </ClearButton>
      )}
    </Card>
  );
};

export default SearchForm;
