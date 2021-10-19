import React from 'react';
import styles from './image.module.css';
import { Favourite } from '../favourite/favourite.component';
import { Votes } from '../votes/votes.component';
import { VoteDirection } from '../../types/vote-direction.type';

interface ImageProps {
  url: string;
  isFavourite: boolean;
  onFavouriteClick: () => void;
  voteCount: number;
  onUpvote: () => void;
  onDownvote: () => void;
  voteDirection?: VoteDirection;
}

export const Image: React.FC<ImageProps> = ({
  url,
  isFavourite,
  onFavouriteClick,
  voteCount,
  onUpvote,
  onDownvote,
  voteDirection,
}) => (
  <div className={styles.image} style={{ backgroundImage: `url(${url})` }}>
    <div className={styles.favourite}>
      <Favourite isFavourite={isFavourite} onClick={onFavouriteClick} />
    </div>

    <div className={styles.votes}>
      <Votes
        count={voteCount}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        voteDirection={voteDirection}
      />
    </div>
  </div>
);
