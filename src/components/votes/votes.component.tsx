import React from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VoteDirection } from '../../types/vote-direction.type';
import styles from './votes.module.css';
import { VoteButton } from './vote-button.component';

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
}) => (
  <div className={styles.votes}>
    <VoteButton
      icon={faArrowUp}
      label="Vote up"
      isActive={voteDirection === 'up'}
      onClick={onUpvote}
    />

    <div className={styles.count}>{count}</div>

    <VoteButton
      icon={faArrowDown}
      label="Vote down"
      isActive={voteDirection === 'down'}
      onClick={onDownvote}
    />
  </div>
);
