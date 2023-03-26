import React from "react";

const Pagination = ({ handler, currentPage }) => {
  return (
    <nav aria-label="Page navigation example">
      <span>page {currentPage}</span>
      <ul
        className="pagination  justify-content-center"
        onClick={(e) => {
          if (e.target.dataset.value) handler(Number(e.target.dataset.value));
        }}
      >
        <li
          className="page-item"
          onClick={() => {
            if (currentPage > 1) handler(--currentPage);
          }}
        >
          <span className="page-link" aria-label="Previous">
            &laquo;
          </span>
        </li>
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <span className="page-link" data-value={currentPage - 1}>
            {currentPage - 1}
          </span>
        </li>
        <li className="page-item active">
          <span className="page-link" data-value={currentPage}>
            {currentPage}
          </span>
        </li>
        <li className="page-item">
          <span className="page-link" data-value={currentPage + 1}>
            {currentPage + 1}
          </span>
        </li>
        <li
          className="page-item"
          onClick={() => {
            handler(++currentPage);
          }}
        >
          <span className="page-link" aria-label="Next">
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
