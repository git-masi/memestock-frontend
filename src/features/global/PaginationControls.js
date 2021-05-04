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
    <div>
      {numPages > 1 && (
        <div className={styles.container}>
          <button
            className={styles.arrow}
            value={1}
            onClick={handleClick}
            disabled={isFirstPage}
          >
            {'<<'}
          </button>

          <button
            className={styles.arrow}
            value={displayPage - 1}
            onClick={handleClick}
            disabled={isFirstPage}
          >
            {'<'}
          </button>

          {createPageNumberButtons(numPages, displayPage, handleClick)}

          <button
            className={styles.arrow}
            value={displayPage + 1}
            onClick={handleClick}
            disabled={isLastPage}
          >
            {'>'}
          </button>

          <button
            className={styles.arrow}
            value={numPages}
            onClick={handleClick}
            disabled={isLastPage}
          >
            {'>>'}
          </button>
        </div>
      )}
    </div>
  );
}

function createPageNumberButtons(numPages, currentPage, clickFn) {
  const numButtons = numPages >= 5 ? 5 : numPages;
  const buttons = [];
  const mid = Math.floor(numButtons / 2);
  let start = 1;

  if (currentPage > numPages - mid) {
    start = numPages - numButtons + 1;
  } else if (currentPage > 3 && numPages > numButtons) {
    start = currentPage - mid;
  }

  let curr = start;

  while (buttons.length < numButtons) {
    buttons.push(
      <button
        className={`${styles.page} ${
          curr === currentPage ? styles.currentPage : ''
        }`}
        value={curr}
        onClick={clickFn}
        key={curr}
      >
        {curr}
      </button>
    );

    curr++;
  }

  return buttons;
}
