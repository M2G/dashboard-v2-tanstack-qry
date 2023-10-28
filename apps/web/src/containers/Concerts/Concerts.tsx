import { Field } from 'ui';
import InfiniteScroll from '@/components/Core/InfiniteScroll';
import TopLineLoading from '@/components/Loading/TopLineLoading';
import NoData from '@/components/NoData';
import { getConcertsAction } from '@/store/concerts/actions';
import { IConcert } from '@/store/concerts/types';

import { debounce } from 'lodash';

import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const search = watch('search');

  const { data, refetch, isLoading } = useConcertList({
    filters: search,
    page: pagination.page,
    pageSize: 5,
  });

  console.log('query query  query query', data);

  const debouncedSearch = useRef(
    debounce((filters: string): void => {
      refetch();
    }, WAIT),
  ).current;

  function handleChange(value: string): void {
    debouncedSearch(value);
  }

  useEffect((): (() => void) => {
    handleChange(search);
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  const loadMore = useCallback((): void => {
    setPagination((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));

    /* dispatch(
      getConcertsAction({
        page: pagination.page,
        pageSize: 5,
      }),
    );*/
  }, [
    // dispatch,
    pagination.page,
  ]);

  // if (loading) return <TopLineLoading />;

  const concert = useMemo(
    () => data?.data?.data?.results,
    [data?.data?.data?.results],
  );

  useEffect((): void => {
    setState(
      (prevState: { concert: IConcert[] }) =>
        ({
          concert:
            concert && prevState?.concert && !search
              ? [...prevState?.concert, ...concert]
              : concert && prevState?.concert && search
              ? [...concert]
              : [],
        } as any),
    );
  }, [concert, search]);

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

  const concerts = useMemo(
    () => data?.data?.data?.results,
    [data?.data?.data?.results],
  );

  if (isLoading) return <TopLineLoading />;

  return (
    <div className="o-zone c-home">
      <div className="o-grid">
        <div className="flex items-center">
          <form className="relative w-full">
            <Field
              className="focus:shadow-none;
              mb-2.5 block w-full rounded-sm
              border-[hsla(0deg,0%,100%,0.1)] border-gray-300 bg-gray-50 bg-transparent text-sm text-[color:var(--color-text-heading)] text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              id="simple-search"
              label="Search branch name..."
              name="search"
              required
              type="text"
              {...{ control, errors, register }}
            />
          </form>
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
