import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import cx from 'classnames';
import styles from './favourite.module.css';

interface FavouriteProps {
  isFavourite: boolean;
  onClick: () => void;
}

export const Favourite: React.FC<FavouriteProps> = ({
  isFavourite,
  onClick,
}) => {
  const icon = isFavourite ? faHeart : faHeartOutline;
  const classNames = cx(styles.favourite, { [styles.active]: isFavourite });

  return (
    <button className={classNames} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    </button>
  );
};
