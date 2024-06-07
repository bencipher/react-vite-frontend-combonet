import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  console.log(totalPosts, postsPerPage);
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const startIndex = Math.max(0, Math.min(pages.length - 5, currentPage - 3));
  const visiblePages = pages.slice(startIndex, startIndex + 5);
  console.log(pages);
  const classStyles =
    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  return (
    <div className="pt-10 text-center">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          {currentPage > 1 && (
            <li>
              <a
                onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
          )}
          {visiblePages.map((page, index) => {
            return (
              <li key={index}>
                <a
                  onClick={() => setCurrentPage(page)}
                  href="#"
                  className={`${classStyles} ${
                    page == currentPage
                      ? " bg-blue-200 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {page}
                </a>
              </li>
            );
          })}
          {currentPage < pages.length && (
            <li>
              <a
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
