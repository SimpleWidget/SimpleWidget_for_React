import React, { useState, useEffect } from 'react';
import '../../../theme/pagination.scss';

interface PaginationProps {
  total: number;
  current?: number;
  pageSize?: number;
  showJumpSearch?: boolean;
  onChange?: (page: number) => void;
}

const SPagination: React.FC<PaginationProps> = ({
  total,
  current = 1,
  pageSize = 10,
  showJumpSearch = false,
  onChange,
}) => {
  const [currentPage, setCurrentPage] = useState(current);

  useEffect(() => {
    setCurrentPage(current);
  }, [current]);

  const totalPages = Math.ceil(total / pageSize);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onChange?.(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  const handleJumpEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const page = parseInt(target.value);
      handleClick(page);
    }
  };

  return (
    <div className="sw-pagination">
      <button
        className="sw-pagination__button"
        disabled={currentPage <= 1}
        onClick={handlePrev}
      >
        ‹
      </button>

      <div className="sw-pagination__pages">
        {pages.map(page => (
          <div
            key={page}
            className={`sw-pagination__item ${currentPage === page ? 'sw-pagination__item--active' : ''}`}
            onClick={() => handleClick(page)}
          >
            {page}
          </div>
        ))}
      </div>

      <button
        className="sw-pagination__button"
        disabled={currentPage >= totalPages}
        onClick={handleNext}
      >
        ›
      </button>

      {showJumpSearch && (
        <input
          type="number"
          className="sw-pagination__jump"
          placeholder="跳转"
          onKeyUp={handleJumpEnter}
        />
      )}
    </div>
  );
};

export default SPagination;