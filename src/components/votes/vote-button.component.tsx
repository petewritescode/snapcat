import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import styles from './vote-button.module.css';

interface VoteButtonProps {
  icon: IconDefinition;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  const className = cx(styles.button, { [styles.active]: isActive });

  return (
    <button className={className} aria-label={label} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    </button>
  );
};
