// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-handle'>
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='pagination-button'>
      <img src='/img/left-arrow.svg' draggable='false' alt='left-arrow'></img>
      </button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'activated' : 'not-active'}>
          {number}
        </button>
      ))}
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className='pagination-button'>
      <img src='/img/right-arrow.svg' draggable='false' alt='right-arrow'></img>
      </button>
    </div>
  );
};

export default Pagination;
