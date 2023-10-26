import PropTypes from 'prop-types';
import { ReactNode } from 'react';

interface RowProps {
  tag?: 'div';
  children: ReactNode;
  className?: string;
}

/**
 * The basiciest layout component to display content in a flexRow.
 * By default, it will display its content in a row with wrap.
 * You can override this behavior by passing a `className` prop.
 *
 * @param tag - The tag to use for the Row. Defaults to `div`.
 * @param children - The content to display.
 *
 * @returns {JSX.Element}
 */
export function Row({ tag = 'div', children, ...rest }: RowProps) {
  const DynamicTag = `${tag}` as keyof JSX.IntrinsicElements;

  return (
    <DynamicTag {...rest} className={[rest.className ? rest.className : 'col-span-full'].join(' ')}>
      {children}
    </DynamicTag>
  );
}

Row.propTypes = {
  tag: PropTypes.oneOf(['div']),
  children: PropTypes.node.isRequired,
};
