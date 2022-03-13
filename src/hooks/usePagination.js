import { useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  console.log("pagination", pageCount, pageSize, currentPage);
  return {
    currentPage,
    setCurrentPage,
    pageCount,
    setPageCount,
    pageSize,
    setPageSize,
  };
};

export default usePagination;
