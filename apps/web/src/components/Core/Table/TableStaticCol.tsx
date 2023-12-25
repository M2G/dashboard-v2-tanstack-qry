import type IconNames from 'ui/components/atoms/Icon/Icons.types';
import Action from '@/components/Core/Table/Action';

export interface ITableStaticCol {
  actions: [
    {
      action: () => void;
      icon: IconNames | undefined;
      id: string;
    },
  ];
  id?: string | undefined;
  label?: string | undefined;
}

function TableStaticCol({ actions, id, label }: ITableStaticCol): JSX.Element {
  return (
    label && (
      <div className="flex">
        <div className="labelHandler">
          <label id={id}>{label}</label>
        </div>
        {actions?.length > 0 && Action({ actions })}
      </div>
    )
  );
}

export default TableStaticCol;
