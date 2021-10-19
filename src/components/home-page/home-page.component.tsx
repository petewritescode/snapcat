import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { favouritesSelectors } from '../../store/favourites/favourites.selectors';
import { favouritesActions } from '../../store/favourites/favourites.slice';
import { imagesSelectors } from '../../store/images/images.selectors';
import { votesSelectors } from '../../store/votes/votes.selectors';
import { votesActions } from '../../store/votes/votes.slice';
import { VoteDirection } from '../../types/vote-direction.type';
import { GridItem } from '../grid/grid-item.component';
import { Grid } from '../grid/grid.component';
import { Image } from '../image/image.component';
import { Loader } from '../loader/loader.component';
import styles from './home-page.module.css';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const imagesLoading = useSelector(imagesSelectors.getLoading);
  const imagesError = useSelector(imagesSelectors.getError);
  const images = useSelector(imagesSelectors.getImages);
  const favouritesLoading = useSelector(favouritesSelectors.getLoading);
  const favouritesError = useSelector(favouritesSelectors.getError);
  const favourites = useSelector(favouritesSelectors.getActiveFavourites);
  const votesLoading = useSelector(votesSelectors.getLoading);
  const votesError = useSelector(votesSelectors.getError);
  const votes = useSelector(votesSelectors.getUserVotes);
  const voteCounts = useSelector(votesSelectors.getVoteCounts);

  const error = imagesError || favouritesError || votesError;

  if (imagesLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        Oops! Something went wrong while loading your images. Please refresh the
        page.
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className={styles.message}>
        You don't have any images yet. <Link to="/upload">Upload one now</Link>.
      </div>
    );
  }

  return (
    <Grid>
      {images.map(({ id, url }) => {
        const favourite = favourites.find(({ imageId }) => imageId === id);
        const vote = votes.find(
          ({ imageId, isCurrentUser }) => imageId === id && isCurrentUser
        );

        const handleFavourite = () => {
          if (favouritesLoading) {
            return;
          }

          const action = favourite?.id
            ? favouritesActions.deleteFavourite(favourite.id)
            : favouritesActions.addFavourite(id);

          dispatch(action);
        };

        const handleVote = (direction: VoteDirection) => () => {
          if (votesLoading) {
            return;
          }

          const action =
            vote?.id && vote.direction === direction
              ? votesActions.deleteVote(vote.id)
              : votesActions.addVote(id, direction);

          dispatch(action);
        };

        return (
          <GridItem key={id}>
            <Image
              url={url}
              isFavourite={Boolean(favourite)}
              onFavouriteClick={handleFavourite}
              voteCount={voteCounts[id] || 0}
              onUpvote={handleVote('up')}
              onDownvote={handleVote('down')}
              voteDirection={vote?.direction}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};
