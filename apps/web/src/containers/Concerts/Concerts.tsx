import { Field } from 'ui';
import InfiniteScroll from '@/components/Core/InfiniteScroll';
import TopLineLoading from '@/components/Loading/TopLineLoading';
import NoData from '@/components/NoData';
import { IConcert } from '@/store/concerts/types';

import { debounce } from 'lodash';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useConcertList from '@/containers/Concerts/hooks';

import ConcertList from './ConcertList';
import chunk from './helpers';

const WAIT = 500;

function Concerts(): JSX.Element {
  const [state, setState] = useState({ concert: [] });
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 5,
  });

  const [term, setTerm] = useState('');

  const { data, isLoading, refetch } = useConcertList({
    filters: term,
    page: pagination.page,
    pageSize: 5,
  });

  const debouncedSearch = useRef(
    debounce((_: string): void => {
      refetch();
    }, WAIT),
  ).current;

  function handleChange({
    target: { value = '' },
  }: {
    target: { value: string };
  }): void {
    debouncedSearch(value);
    setTerm(value);
  }

  useEffect(
    () => (): void => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  const loadMore = useCallback((): void => {
    setPagination((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
    refetch();
  }, [refetch]);

  const concerts = useMemo(() => data?.data?.data, [data?.data?.data]);

  const concert = useMemo(() => concerts?.results, [concerts?.results]);

  useEffect((): void => {
    setState(
      (prevState: { concert: IConcert[] }) =>
        ({
          concert:
            concert && prevState?.concert && !term
              ? [...prevState?.concert, ...concert]
              : concert && prevState?.concert && term
              ? [...concert]
              : [],
        } as any),
    );
  }, [concert, term]);

  const concertList: IConcert[] = useMemo(() => {
    const initialValue = {};
    return Object.values(
      state?.concert?.reduce((obj, item: { datetime: string }) => {
        const id = new Date(item.datetime).getTime();
        return {
          ...obj,
          [id]: item,
        };
      }, initialValue),
    );
  }, [state?.concert]);

  if (isLoading) return <TopLineLoading />;

  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <div className="flex items-center">
          <input
            className="placeholder:text-grey-dark -ml-px mb-px w-full rounded-none border-b border-[hsla(0deg,0%,100%,0.1)] bg-transparent p-2 text-[rgb(113_113_122/var(--tw-text-opacity))] focus:shadow-none focus:outline-none"
            id="simple-search"
            name="search"
            onChange={handleChange}
            placeholder="Search branch name..."
            required
            type="text"
          />
        </div>
        {concertList?.length > 0 ? (
          <InfiniteScroll
            hasMore={!!concerts?.pageInfo?.next}
            loading={concert?.loading}
            onLoadMore={loadMore}>
            {chunk(concertList, 4)?.map((nodes) => (
              <div
                className="o-grid__row"
                key={`concert_${nodes?.[0]?.datetime}`}>
                {nodes?.map((node: IConcert) => (
                  <ConcertList
                    city={node?.city}
                    display_name={node?.display_name}
                    key={node?.concert_id}
                    uri={node?.uri}
                  />
                ))}
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}

export default Concerts;
