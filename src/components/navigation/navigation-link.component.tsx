import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import cx from 'classnames';
import styles from './navigation-link.module.css';

interface NavigationLinkProps {
  to: string;
  icon: IconDefinition;
  label: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  icon,
  label,
}) => {
  const route = useRouteMatch();
  const isActive = route.path === to;
  const className = cx(styles.link, { [styles.linkActive]: isActive });

  return (
    <Link to={to} className={className}>
      <FontAwesomeIcon icon={icon} className={styles.icon} /> {label}
    </Link>
  );
};
