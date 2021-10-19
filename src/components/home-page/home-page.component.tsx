import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { favouritesSelectors } from '../../store/favourites/favourites.selectors';
import { favouritesActions } from '../../store/favourites/favourites.slice';
import { imagesSelectors } from '../../store/images/images.selectors';
import { votesSelectors } from '../../store/votes/votes.selectors';
import { votesActions } from '../../store/votes/votes.slice';
import { VoteDirection } from '../../types/vote-direction.type';
import { ImageGrid } from '../image-grid/image.grid.component';
import { Loader } from '../loader/loader.component';
import { Message } from '../message/message.component';

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
      <Message isError>
        Oops! Something went wrong while loading your images. Please refresh the
        page.
      </Message>
    );
  }

  if (!images.length) {
    return (
      <Message>
        You don't have any images yet. <Link to="/upload">Upload one now</Link>.
      </Message>
    );
  }

  const handleFavourite = (imageId: string) => () => {
    if (favouritesLoading) {
      return;
    }

    const favourite = favourites.find(
      (favourite) => favourite.imageId === imageId
    );

    const action = favourite?.id
      ? favouritesActions.deleteFavourite(favourite.id)
      : favouritesActions.addFavourite(imageId);

    dispatch(action);
  };

  const handleVote = (imageId: string, direction: VoteDirection) => () => {
    if (votesLoading) {
      return;
    }

    const vote = votes.find((vote) => vote.imageId === imageId);

    const action =
      vote?.id && vote.direction === direction
        ? votesActions.deleteVote(vote.id)
        : votesActions.addVote(imageId, direction);

    dispatch(action);
  };

  return (
    <ImageGrid
      images={images}
      favourites={favourites}
      votes={votes}
      voteCounts={voteCounts}
      onFavourite={handleFavourite}
      onVote={handleVote}
    />
  );
};
