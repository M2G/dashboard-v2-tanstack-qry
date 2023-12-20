import Icon from '@/components/Core/Icon';
import type IconNames from '@/components/Core/Icon/Icons.types';

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
          className="fill-grey-dark w-4 cursor-pointer"
          icon={icon as IconNames}
        />
      </div>
    </div>
  ));
}

export default Action;
