import Icon from '@/components/Core/Icon';
import type IconNames from '@/components/Core/Icon/Icons.types';

interface IAction {
  actions: [
    {
      id: string;
      action: () => void;
      icon?: string;
    },
  ];
}

function Action({ actions }: IAction): JSX.Element[] | undefined {
  return actions?.map(({ id, action, icon }) => (
    <div key={`actionCol__${id}`} className="cursor-pointer px-2">
      <div aria-hidden="true" id={id} onClick={action}>
        <Icon className="fill-grey-dark w-4 cursor-pointer" icon={icon as IconNames} />
      </div>
    </div>
  ));
}

export default Action;
