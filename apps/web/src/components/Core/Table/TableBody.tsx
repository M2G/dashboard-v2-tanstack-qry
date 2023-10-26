import { useContext } from 'react';
import { TableContext } from '@/components/Core/Table/TableWrapper';

interface ITableBody {
  id: number | string;
}

function TableBody({ id }: ITableBody): JSX.Element {
  const { getSortedTable } = useContext(TableContext);
  return (
    <tbody>
      {getSortedTable?.map((row: { display: any }[], indexRow: number) => (
        <tr
          className="border-semi-10-contrast border-b-solid border-b-[1px]"
          key={`bodyTable__${id}__${indexRow}` as any}>
          {row?.map(({ display }: any, indexCol: any) => (
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

export default TableBody;
