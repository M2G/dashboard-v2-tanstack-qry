import PropTypes from 'prop-types';
import { FC, SVGProps } from 'react';

import { AnyComponent } from '@types';

export interface IconProps extends SVGProps<SVGElement> {
  as: AnyComponent;
}

/**
 * Wrapper for icon components to set the default styles
 * and assign currrent colors dynamically
 *
 * @param {IconProps} props
 * @returns {JSX.Element}
 *
 * @example
 * import { ReactComponent as PlusIcon } from "../../../assets/icons";
 * <Icon as={PlusIcon} />
 **/
const Icon: FC<IconProps> = ({ as, ...rest }) => {
  const DynamicIcon = as || (`${as}` as keyof AnyComponent);

  return (
    <DynamicIcon
      {...rest}
      className={['min-w-6 min-h-6 h-6 w-6 fill-current', rest.className].join(
        ' ',
      )}
    />
  );
};

export default Icon;

Icon.propTypes = {
  as: PropTypes.any.isRequired,
};
