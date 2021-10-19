import React from 'react';
import { Container } from '../container/container.component';
import styles from './layout.module.css';
import { Logo } from '../logo/logo.component';
import { Navigation } from '../navigation/navigation.component';

export const Layout: React.FC = ({ children }) => (
  <>
    <header className={styles.header}>
      <Container shallow>
        <div className={styles.wrapper}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>

          <div>
            <Navigation />
          </div>
        </div>
      </Container>
    </header>

    <Container>{children}</Container>

    <footer className={styles.footer}>
      <Container>
        Built by{' '}
        <a
          href="https://github.com/petewritescode"
          target="_blank"
          rel="noreferrer"
        >
          Pete Williams
        </a>
      </Container>
    </footer>
  </>
);
