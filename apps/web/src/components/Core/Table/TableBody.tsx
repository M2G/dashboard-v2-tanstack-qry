import { memo, useContext } from 'react';
import { TableContext } from '@/components/Core/Table/TableWrapper';

interface ITableBody {
  id: number | string;
}

interface ITableRow {
  id: number | string;
  data: any;
}

function TableRow({ data, id }: ITableRow): JSX.Element {
  return (
    <tbody>
      {data?.map((row: { display: any }[], indexRow: number) => (
        <tr
          className="border-semi-10-contrast border-b-solid border-b-[1px]"
          key={`bodyTable__${id}__${indexRow}` as string}>
          {row?.map(({ display }: any, indexCol: number) => (
            <td
              className="border-semi-10-contrast border-b-solid border-b-[1px]"
              key={`bodyTable__${id}__${indexCol}` as any}>
              {display}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

const MemoizedTableRow = memo(TableRow);

function TableBody({ id }: ITableBody): JSX.Element {
  const { getSortedTable } = useContext(TableContext);
  return (
    getSortedTable?.length && <MemoizedTableRow data={getSortedTable} id={id} />
  );
}

export default TableBody;
