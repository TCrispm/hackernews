/* eslint-disable react/prop-types */
import React from "react";
import { createContext, useCallback, useState, useContext } from "react";

const PaginationContext = createContext({
  currentPage: 1,
  pageCount: 0,
  pageSize: 0,
  setCurrentPage: () => {},
  setPageCount: () => {},
  setPageSize: () => {},
});

export const PaginationProvider = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        pageCount,
        pageSize,
        setCurrentPage,
        setPageCount,
        setPageSize,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => useContext(PaginationContext);
