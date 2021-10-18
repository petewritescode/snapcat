import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favouritesSelectors } from '../../store/favourites/favourites.selectors';
import { favouritesActions } from '../../store/favourites/favourites.slice';
import { imagesSelectors } from '../../store/images/images.selectors';
import { votesSelectors } from '../../store/votes/votes.selectors';
import { votesActions } from '../../store/votes/votes.slice';
import { VoteDirection } from '../../types/vote-direction.type';
import { Loader } from '../loader/loader.component';

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
  const votes = useSelector(votesSelectors.getActiveVotes);
  const scores = useSelector(votesSelectors.getScores);

  const error = imagesError || favouritesError || votesError;

  if (imagesLoading) {
    return <Loader />;
  }

  if (error) {
    return <>ERROR!</>;
  }

  if (!images.length) {
    return <>TODO No images yet</>;
  }

  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
      {images.map(({ id, url }) => {
        const favourite = favourites.find(({ imageId }) => imageId === id);
        const vote = votes.find(({ imageId }) => imageId === id);

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
          <li key={id}>
            <div
              style={{
                margin: 20,
                width: 250,
                height: 250,
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                border: '1px solid black',
              }}
            >
              <button onClick={handleFavourite}>
                {favourite ? 'UNFAV' : 'FAV'}
              </button>

              <hr />

              <button onClick={handleVote('up')}>
                {vote?.direction === 'up' ? 'X' : ''} UP
              </button>

              {scores[id] || '0'}

              <button onClick={handleVote('down')}>
                {vote?.direction === 'down' ? 'X' : ''} Down
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
