// Modules
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from './PaginationControls.module.css';

export default function PaginationControls(props) {
  const { changeDisplayPage, paginationSelector } = props;
  const { numPages, displayPage } = useSelector(paginationSelector);
  const dispatch = useDispatch();
  const isFirstPage = displayPage === 1;
  const isLastPage = displayPage === numPages;

  const handleClick = (e) => {
    const value = e?.target?.value;
    dispatch(changeDisplayPage(value));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.arrow}
        value={displayPage - 1}
        onClick={handleClick}
        disabled={isFirstPage}
      >
        {'<'}
      </button>

      <p className={[styles.page, styles.currentPage].join(' ')}>
        {displayPage}
      </p>

      <button
        className={styles.arrow}
        value={displayPage + 1}
        onClick={handleClick}
        disabled={isLastPage}
      >
        {'>'}
      </button>
    </div>
  );
}
