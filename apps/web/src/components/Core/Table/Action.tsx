import { memo } from 'react';
import { Icon } from 'ui';
import type IconNames from 'ui/components/atoms/Icon/Icons.types';

interface IAction {
  action: () => void;
  icon?: string;
  id: string;
}

interface IAction {
  actions: IAction[];
}

function Action({ id, action, icon }: IAction): JSX.Element {
  return (
    <div className="cursor-pointer px-2" key={`actionCol__${id}`}>
      <div aria-hidden="true" id={id} onClick={action}>
        <Icon
          as={icon as IconNames}
          className="fill-grey-dark w-4 cursor-pointer"
        />
      </div>
    </div>
  );
}

const MomoizedAction = memo(Action);

function Actions({ actions }: IAction): JSX.Element[] | undefined {
  return actions?.map(({ action, icon, id }) => (
    <MomoizedAction
      action={action}
      icon={icon}
      id={id}
      key={`actionCol__${id}`}
    />
  ));
}

export default Actions;
