import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 3);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt; Anterior
        </button>
      )}

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`pagination-number ${
            pageNumber === currentPage ? "active" : ""
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
