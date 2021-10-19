import React from 'react';
import styles from './grid-item.module.css';

export const GridItem: React.FC = ({ children }) => (
  <li className={styles.gridItem}>{children}</li>
);
