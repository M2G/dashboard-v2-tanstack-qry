import { useMemo } from 'react';
import { Icon } from 'ui';
import IconNames from 'ui/components/atoms/Icon/Icons.types';

enum SortDirection {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

interface ITableHeaderCell {
  currentSortedData: any;
  isSortable: any;
  label: any;
  onSort: any;
}

function TableHeaderCell({
  currentSortedData,
  isSortable,
  label,
  onSort,
}: ITableHeaderCell): JSX.Element {
  const onSortClick = () => {
    onSort(
      !currentSortedData ||
        currentSortedData.direction === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING,
    );
  };

  const sortedClass = useMemo(
    () =>
      currentSortedData?.direction === SortDirection.ASCENDING
        ? IconNames.ARROW_DOWN
        : IconNames.ARROW_UP,
    [currentSortedData],
  );

  return (
    <th className="border-b-0 p-2 pl-0 text-base font-bold">
      {label}
      {isSortable && (
        <button
          className="sort-icon mb-0 rounded-none border-0 bg-transparent px-2 font-bold"
          onClick={onSortClick}>
          <Icon
            as={sortedClass}
            className="fill-grey-dark w-4 cursor-pointer"
          />
        </button>
      )}
    </th>
  );
}

export default TableHeaderCell;
