const Pagination = ({
  totalEntries,
  entriesPerPage,
  currentPage,
  onPageChange,
}: {
  totalEntries: number;
  entriesPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  console.log(totalEntries);

  const renderPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      // Show all pages if total pages are <= maxButtons
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i
                ? "bg-[#cdb4db] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Handle ellipsis for large page numbers
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Add the first page
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 rounded mx-1 ${
            currentPage === 1
              ? "bg-[#cdb4db] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          1
        </button>
      );

      // Add ellipsis if needed
      if (start > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-3 py-1 text-gray-500">
            ...
          </span>
        );
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded mx-1 ${
              currentPage === i
                ? "bg-[#cdb4db] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-3 py-1 text-gray-500">
            ...
          </span>
        );
      }

      // Add the last page
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded mx-1 ${
            currentPage === totalPages
              ? "bg-[#cdb4db] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const getDisplayedEntries = () => {
    const start = (currentPage - 1) * entriesPerPage + 1;
    const end = Math.min(currentPage * entriesPerPage, totalEntries);
    return `${start}-${end}`;
  };

  return (
    <div className="flex justify-between items-center w-[95%]">
      <p className="font-medium text-base">
        Showing {getDisplayedEntries()} of {totalEntries} entries
      </p>
      <div className="flex items-center justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 rounded bg-gray-200 text-black disabled:opacity-50"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalEntries === 0}
          className="px-3 py-1 mx-1 rounded bg-gray-200 text-black disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
