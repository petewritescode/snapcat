import React from 'react';
import cx from 'classnames';
import styles from './message.module.css';

interface MessageProps {
  isError?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  isError = false,
  children,
}) => {
  const className = cx(styles.message, { [styles.error]: isError });

  return <div className={className}>{children}</div>;
};
