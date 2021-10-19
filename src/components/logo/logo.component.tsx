import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import styles from './logo.module.css';

export const Logo: React.FC = () => (
  <Link to="/" className={styles.logo}>
    <div className={styles.icon}>
      <FontAwesomeIcon icon={faCat} />
    </div>

    <div className={styles.copy}>Snapcat</div>
  </Link>
);
