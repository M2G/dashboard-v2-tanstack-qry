import type IconNames from 'ui/components/atoms/Icon/Icons.types';

import { Icon } from 'ui';

interface IAction {
  actions: [
    {
      action: () => void;
      icon?: string;
      id: string;
    },
  ];
}

function Action({ actions }: IAction): JSX.Element[] | undefined {
  return actions?.map(({ action, icon, id }) => (
    <div className="cursor-pointer px-2" key={`actionCol__${id}`}>
      <div aria-hidden="true" id={id} onClick={action}>
        <Icon
          as={icon as IconNames}
          className="fill-grey-dark w-4 cursor-pointer"
        />
      </div>
    </div>
  ));
}

export default Action;
