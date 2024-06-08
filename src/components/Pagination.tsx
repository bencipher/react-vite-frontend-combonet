type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex = Math.max(0, Math.min(pages.length - 5, currentPage - 3));
  const visiblePages = pages.slice(startIndex, startIndex + 5);

  const classStyles =
    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

  return (
    <div className="pt-10 text-center">
      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px text-base h-10">
          {currentPage > 1 && (
            <li>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
          )}
          {visiblePages.map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`${classStyles} ${
                  page === currentPage
                    ? " bg-blue-200 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                aria-current={page === currentPage ? "page" : undefined}
                disabled={page === currentPage}
              >
                {page}
              </button>
            </li>
          ))}
          {currentPage < totalPages && (
            <li>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
