import React from 'react';
import styles from './grid.module.css';

export const Grid: React.FC = ({ children }) => (
  <ul className={styles.grid}>{children}</ul>
);
