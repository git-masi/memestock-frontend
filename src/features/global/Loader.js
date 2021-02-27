// Modules
import React from 'react';

// Styles
import styles from './Loader.module.css';

function Loader(props) {
  const { children, heading } = props;
  return (
    <div className={styles.container}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {children ? (
        children
      ) : (
        <h3 className={styles.heading}>
          {heading ? heading : 'Processing...'}
        </h3>
      )}
    </div>
  );
}

export default Loader;
