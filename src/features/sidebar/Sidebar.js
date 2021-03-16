// Modules
import React, { useState } from 'react';

// Styles
import styles from './Sidebar.module.css';

// Components
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentsDollar,
  faHistory,
  faPlusCircle,
  faCog,
  faChartLine,
  faChevronCircleLeft,
  faChevronCircleRight,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {openSidebar ? (
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            onClick={() => setOpenSidebar(false)}
            className={[styles.icon, styles.chevron].join(' ')}
            size="2x"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            onClick={() => setOpenSidebar(true)}
            className={[styles.icon, styles.chevron].join(' ')}
            size="2x"
          />
        )}

        {/* todo: conditionally render based on global singed in state */}
        <NavLink to="/sign-in" className={styles.link}>
          <span>Sign In</span>
          <FontAwesomeIcon
            icon={faSignInAlt}
            className={styles.icon}
            size="2x"
          />
        </NavLink>

        <NavLink to="/feed" className={styles.link}>
          Feed
          <FontAwesomeIcon
            icon={faCommentsDollar}
            className={styles.icon}
            size="2x"
          />
        </NavLink>

        <NavLink to="/visualize" className={styles.link}>
          Visualize
          <FontAwesomeIcon
            icon={faChartLine}
            className={styles.icon}
            size="2x"
          />
        </NavLink>

        <NavLink to="/history" className={styles.link}>
          History
          <FontAwesomeIcon icon={faHistory} className={styles.icon} size="2x" />
        </NavLink>

        <NavLink to="/new-order" className={styles.link}>
          New Order
          <FontAwesomeIcon
            icon={faPlusCircle}
            className={styles.icon}
            size="2x"
          />
        </NavLink>

        <NavLink to="/settings" className={styles.link}>
          Settings
          <FontAwesomeIcon icon={faCog} className={styles.icon} size="2x" />
        </NavLink>
      </div>
    </div>
  );
}
