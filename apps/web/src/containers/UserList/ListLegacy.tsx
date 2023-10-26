import type { JSX } from 'react';

import PageSize from '@/components/Core/Pagination/PageSize';
import Pagination from '@/components/Core/Pagination/PaginationLegacy';
import TableWrapper from '@/components/Core/Table';

interface ListProps {
  count: number;
  currentPageSize: number;
  currentPage: number;
  data: any;
  header: any;
  id: string;
  rows: any;
  setCurrentPage: (page: number) => void;
  setCurrentPageSize: (pageSize: number) => void;
}

function List({
  count,
  currentPage,
  currentPageSize,
  data,
  header,
  id,
  rows,
  setCurrentPage,
  setCurrentPageSize,
}: ListProps): JSX.Element {
  const perPage = currentPageSize;
  return (
    <>
      <TableWrapper header={header} id={id} rows={rows} />
      <div className="w-100 flex items-center justify-end">
        <PageSize currentPageSize={currentPageSize} setCurrentPageSize={setCurrentPageSize} />
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          setCurrentPage={setCurrentPage}
          totalItems={count}
        />
      </div>
    </>
  );
}

export default List;
