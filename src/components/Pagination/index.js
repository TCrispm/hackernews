/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { usePagination } from "../../contexts/pagination";

const Pagination = ({ setShowCommentSection, setSelectedStory }) => {
  const { currentPage, setCurrentPage, pageCount } = usePagination();

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
    setShowCommentSection(false);
    setSelectedStory(undefined);
  }, []);

  const renderNumbers = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
          alignItems: "center",
          height: "60px",
          width: "100vw",
        }}
      >
        {currentPage > 1 && (
          <Icon
            icon="ant-design:arrow-left-outlined"
            style={{ marginRight: "15px", cursor: "pointer" }}
            onClick={() => onChangePage(currentPage - 1)}
          />
        )}

        {[...Array(pageCount)].map((e, index) => (
          <div
            onClick={() => onChangePage(index + 1)}
            style={{
              marginRight: "15px",
              padding: "5px",
              cursor: "pointer",
              color: index + 1 === currentPage && "rgb(244, 132, 20)",
              border:
                index + 1 === currentPage && "1px solid rgb(244, 132, 20)",
            }}
            key={index}
          >
            {index + 1}
          </div>
        ))}
        {currentPage < pageCount && (
          <Icon
            icon="ant-design:arrow-right-outlined"
            style={{ cursor: "pointer" }}
            onClick={() => onChangePage(currentPage + 1)}
          />
        )}
      </div>
    );
  }, [pageCount, currentPage]);

  return <div>{renderNumbers()}</div>;
};

export default Pagination;
