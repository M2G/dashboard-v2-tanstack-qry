import type { JSX } from 'react';

import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { INPUT_NAME, PLACEHOLDER_SEARCH } from './constants';

interface UserFiltersProps {
  currentTerm?: string;
  onSearchTerm: (searchTerm: string) => void;
}

function UserFilters({ currentTerm, onSearchTerm }: UserFiltersProps): JSX.Element {
  const { t } = useTranslation();
  const [term, setTerm] = useState(currentTerm);
  const debouncedSearch = useRef(
    debounce((criteria: string): void => {
      onSearchTerm(criteria);
    }, 400),
  ).current;

  useEffect(
    () => (): void => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  function handleChange({ target: { value = '' } }: { target: { value: string } }): void {
    debouncedSearch(value);
    setTerm(value);
  }

  return (
    <input
      aria-label="Search"
      className="placeholder:text-grey-dark -ml-px mb-px w-full rounded-none border-b border-[hsla(0deg,0%,100%,0.1)] bg-transparent p-2 text-[rgb(113_113_122/var(--tw-text-opacity))] focus:shadow-none focus:outline-none"
      name={INPUT_NAME.SEARCH}
      onChange={handleChange}
      placeholder={PLACEHOLDER_SEARCH}
      type="search"
      value={term}
    />
  );
}

export default UserFilters;
