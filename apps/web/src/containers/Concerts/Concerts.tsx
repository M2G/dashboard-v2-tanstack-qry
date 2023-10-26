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
import { connect, useDispatch, useSelector } from 'react-redux';

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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getConcertsAction({
        page: 1,
        pageSize: 5,
      }),
    );
  }, [dispatch]);

  const concert = useSelector(
    (stateSelector: { concert: IConcert }) => stateSelector.concert,
  );

  const debouncedSearch = useRef(
    debounce((filters: string): void => {
      dispatch(
        getConcertsAction({
          filters,
          page: pagination.page,
          pageSize: 5,
        }),
      );
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

    dispatch(
      getConcertsAction({
        page: pagination.page,
        pageSize: 5,
      }),
    );
  }, [dispatch, pagination.page]);

  // if (loading) return <TopLineLoading />;

  // if (!concerts) return <NoData />;

  useEffect((): void => {
    setState(
      (prevState: { concert: IConcert[] }) =>
        ({
          concert:
            concert?.data?.results && prevState?.concert && !search
              ? [...prevState?.concert, ...concert?.data?.results]
              : concert?.data?.results && prevState?.concert && search
              ? [...concert?.data?.results]
              : [],
        } as any),
    );
  }, [concert?.data?.results, search]);

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

  const concerts = useMemo(() => concert?.data, [concert?.data]);

  if (concert?.loading) return <TopLineLoading />;

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
        <InfiniteScroll
          hasMore={!!concerts?.pageInfo?.next}
          loading={concert?.loading}
          onLoadMore={loadMore}>
          {concertList?.length > 0 &&
            chunk(concertList, 4)?.map((nodes) => (
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
      </div>
    </div>
  );
}

const mapStateToProps = (state: {
  concert: { data: IConcert[]; loading: boolean };
}) => ({
  concert: state.concert.data,
  loading: state.concert.loading,
});

export default connect(mapStateToProps)(Concerts);
