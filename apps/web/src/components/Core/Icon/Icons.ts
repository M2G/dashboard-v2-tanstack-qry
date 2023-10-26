import type { IconComponent } from '@/components/Core/Icon/Icons.types';
import IconNames from '@/components/Core/Icon/Icons.types';
import { ReactComponent as IconBin } from '@/assets/icons/bin.svg';
import { ReactComponent as IconPencil } from '@/assets/icons/pencil.svg';
import { ReactComponent as IconArrowUp } from '@/assets/icons/arrow-up.svg';
import { ReactComponent as IconArrowDown } from '@/assets/icons/arrow-down.svg';

const Icons: {
  [key in IconNames]: IconComponent;
} = {
  [IconNames.DELETE]: IconBin as unknown as IconComponent,
  [IconNames.EDIT]: IconPencil as unknown as IconComponent,
  [IconNames.ARROW_DOWN]: IconArrowDown as unknown as IconComponent,
  [IconNames.ARROW_UP]: IconArrowUp as unknown as IconComponent,
};

export default Icons;
