import React from 'react';
import { Favourite } from '../../types/favourite.type';
import { Image } from '../../types/image.type';
import { VoteCounts } from '../../types/vote-counts.type';
import { VoteDirection } from '../../types/vote-direction.type';
import { Vote } from '../../types/vote.type';
import { GridItem } from '../grid/grid-item.component';
import { Grid } from '../grid/grid.component';
import { ImageCard } from '../image-card/image-card.component';

interface ImageGridProps {
  images: Image[];
  favourites: Favourite[];
  votes: Vote[];
  voteCounts: VoteCounts;
  onFavourite: (imageId: string) => () => void;
  onVote: (imageId: string, direction: VoteDirection) => () => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  favourites,
  votes,
  voteCounts,
  onFavourite,
  onVote,
}) => (
  <Grid>
    {images.map(({ id, url }) => {
      const favourite = favourites.find(({ imageId }) => imageId === id);
      const vote = votes.find(({ imageId }) => imageId === id);

      return (
        <GridItem key={id}>
          <ImageCard
            url={url}
            isFavourite={Boolean(favourite)}
            onFavouriteClick={onFavourite(id)}
            voteCount={voteCounts[id] || 0}
            onUpvote={onVote(id, 'up')}
            onDownvote={onVote(id, 'down')}
            voteDirection={vote?.direction}
          />
        </GridItem>
      );
    })}
  </Grid>
);
