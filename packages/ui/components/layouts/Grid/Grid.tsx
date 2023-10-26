import PropTypes from 'prop-types';
import { ReactNode } from 'react';

interface GridProps {
  tag?: 'div';
  children: ReactNode;
  className?: string;
}

/**
 * The basiciest layout component to display content in a flexGrid.
 * By default, it will display its content in a row with wrap.
 * You can override this behavior by passing a `className` prop.
 *
 * @param tag - The tag to use for the Grid. Defaults to `div`.
 * @param children - The content to display.
 *
 * @returns {JSX.Element}
 */
export function Grid({ children, tag = 'div', ...rest }: GridProps) {
  const DynamicTag = `${tag}` as keyof JSX.IntrinsicElements;

  return (
    <DynamicTag {...rest} className={['grid grid-cols-12 gap-x-2', rest.className].join(' ')}>
      {children}
    </DynamicTag>
  );
}

Grid.propTypes = {
  tag: PropTypes.oneOf(['div']),
  children: PropTypes.node.isRequired,
};
