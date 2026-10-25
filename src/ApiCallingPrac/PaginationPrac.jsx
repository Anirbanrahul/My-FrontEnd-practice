import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// Helper function for JS Pagination Truncation algorithm
const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount + 5; // 1 + siblingCount + currentPage + siblingCount + 1 + dots

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', totalPages];
  }
};

// 10. Pagination Truncate Component
const PaginationPrac = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const [pageSize, setPageSize] = useState(5);
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginationRange = getPaginationRange(currentPage, totalPages);

  // Dummy items for active page
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = Array.from({ length: pageSize }, (_, i) => startIndex + i + 1);

  return (
    <div className="demo-card">
      <h2 className="demo-title">10. Pagination with JS Truncation</h2>
      <p className="demo-description">Smart JS pagination algorithm truncating long page lists (e.g., 1 ... 4 5 6 ... 20).</p>

      {/* Page Size & Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Showing items {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of {totalItems}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem' }}>Items per page:</span>
          <select
            className="input-field"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Sample Items List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {currentItems.map((itemNum) => (
          <div
            key={itemNum}
            style={{
              padding: '0.75rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '500'
            }}
          >
            📦 Item #{itemNum}
          </div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Prev Button */}
        <button
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem' }}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          ❮ Prev
        </button>

        {/* Page Buttons */}
        {paginationRange?.map((page, idx) => {
          if (page === '...') {
            return (
              <span key={idx} style={{ padding: '0.35rem 0.5rem', color: 'var(--text-secondary)' }}>
                ...
              </span>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => setCurrentPage(Number(page))}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: currentPage === page ? 'var(--accent)' : 'var(--bg-primary)',
                color: currentPage === page ? 'white' : 'var(--text-primary)',
                border: '1px solid var(--border)'
              }}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem' }}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next ❯
        </button>
      </div>

      <InterviewTips
        concepts={[
          'JS Truncation algorithm logic: leftDots and rightDots evaluation based on siblingCount',
          'Page calculation math: Math.ceil(totalItems / pageSize)',
          'Slicing item array for active page view'
        ]}
        edgeCases={[
          'Total pages smaller than max visible threshold (render all without dots)',
          'Page size change resetting currentPage back to 1'
        ]}
      />
    </div>
  );
};

export default PaginationPrac;
