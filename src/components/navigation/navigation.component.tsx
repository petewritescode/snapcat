import React from 'react';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './navigation.module.css';
import { NavigationLink } from './navigation-link.component';

export const Navigation: React.FC = () => (
  <nav className={styles.navigation}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavigationLink to="/" icon={faHome} label="Home" />
      </li>

      <li className={styles.item}>
        <NavigationLink to="/upload" icon={faPlusCircle} label="Add" />
      </li>
    </ul>
  </nav>
);
