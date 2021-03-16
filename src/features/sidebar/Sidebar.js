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
        <p style={{ visibility: 'hidden' }}>hidden</p>
        {openSidebar ? (
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            onClick={() => setOpenSidebar(false)}
            className={styles.icon}
            size="2x"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            onClick={() => setOpenSidebar(true)}
            className={styles.icon}
            size="2x"
          />
        )}

        {/* todo: conditionally render based on global singed in state */}
        <NavLink to="/sign-in" className={styles.link}>
          Sign In
        </NavLink>
        <FontAwesomeIcon icon={faSignInAlt} className={styles.icon} size="2x" />

        <NavLink to="/feed" className={styles.link}>
          Feed
        </NavLink>
        <FontAwesomeIcon
          icon={faCommentsDollar}
          className={styles.icon}
          size="2x"
        />

        <NavLink to="/visualize" className={styles.link}>
          Visualize
        </NavLink>
        <FontAwesomeIcon icon={faChartLine} className={styles.icon} size="2x" />

        <NavLink to="/history" className={styles.link}>
          History
        </NavLink>
        <FontAwesomeIcon icon={faHistory} className={styles.icon} size="2x" />

        <NavLink to="/new-order" className={styles.link}>
          New Order
        </NavLink>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className={styles.icon}
          size="2x"
        />

        <NavLink to="/settings" className={styles.link}>
          Settings
        </NavLink>
        <FontAwesomeIcon icon={faCog} className={styles.icon} size="2x" />
      </div>
    </div>
  );
}
