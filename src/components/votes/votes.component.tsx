import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VoteDirection } from '../../types/vote-direction.type';
import cx from 'classnames';
import styles from './votes.module.css';

interface VotesProps {
  count: number;
  onUpvote: () => void;
  onDownvote: () => void;
  voteDirection?: VoteDirection;
}

export const Votes: React.FC<VotesProps> = ({
  count,
  onUpvote,
  onDownvote,
  voteDirection,
}) => {
  return (
    <div className={styles.votes}>
      <button
        className={cx(styles.button, {
          [styles.active]: voteDirection === 'up',
        })}
        onClick={onUpvote}
      >
        <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
      </button>
      <div className={styles.count}>{count}</div>
      <button
        className={cx(styles.button, {
          [styles.active]: voteDirection === 'down',
        })}
        onClick={onDownvote}
      >
        <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
      </button>
    </div>
  );
};
