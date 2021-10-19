import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './navigation.module.css';
import cx from 'classnames';

export const Navigation: React.FC = () => {
  const route = useRouteMatch();
  const isUpload = route.path === '/upload';

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            to="/"
            className={cx(styles.link, { [styles.linkActive]: !isUpload })}
          >
            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Home
          </Link>
        </li>

        <li className={styles.item}>
          <Link
            to="/upload"
            className={cx(styles.link, { [styles.linkActive]: isUpload })}
          >
            <FontAwesomeIcon icon={faPlusSquare} className={styles.icon} />{' '}
            Upload
          </Link>
        </li>
      </ul>
    </nav>
  );
};
