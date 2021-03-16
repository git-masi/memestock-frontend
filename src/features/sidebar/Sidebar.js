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
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={styles.container}>
      {openSidebar && (
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          onClick={() => setOpenSidebar(false)}
          size="2x"
        />
      )}

      {!openSidebar && (
        <FontAwesomeIcon
          icon={faChevronCircleRight}
          onClick={() => setOpenSidebar(true)}
          size="2x"
        />
      )}

      <div className={styles.linkWrapper}>
        <NavLink to="/sign-up" className={styles.link}>
          Sign Up
        </NavLink>

        <NavLink to="/sign-in" className={styles.link}>
          Sign In
        </NavLink>

        <NavLink to="/feed" className={styles.link}>
          <FontAwesomeIcon icon={faCommentsDollar} />
          Feed
        </NavLink>

        <NavLink to="/visualize" className={styles.link}>
          <FontAwesomeIcon icon={faChartLine} />
          Visualize
        </NavLink>

        <NavLink to="/history" className={styles.link}>
          <FontAwesomeIcon icon={faHistory} />
          History
        </NavLink>

        <NavLink to="/new-order" className={styles.link}>
          <FontAwesomeIcon icon={faPlusCircle} />
          New Order
        </NavLink>

        <NavLink to="/settings" className={styles.link}>
          <FontAwesomeIcon icon={faCog} />
          Settings
        </NavLink>
      </div>
    </div>
  );
}
