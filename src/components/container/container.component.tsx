import React from 'react';
import styles from './container.module.css';
import cx from 'classnames';

interface ContainerProps {
  shallow?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  shallow = false,
  children,
}) => {
  const className = cx(styles.container, { [styles.shallow]: shallow });

  return <div className={className}>{children}</div>;
};
