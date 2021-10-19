import React from 'react';
import styles from './grid.module.css';

export const Grid: React.FC = ({ children }) => (
  <div className={styles.grid}>{children}</div>
);
