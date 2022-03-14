import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { usePagination } from "../../contexts/pagination";

const Pagination = () => {
  const { currentPage, setCurrentPage, pageCount } = usePagination();

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
        <Icon
          icon="ant-design:arrow-left-outlined"
          style={{ marginRight: "15px" }}
        />

        {[...Array(pageCount)].map((e, index) => (
          <div
            onClick={() => setCurrentPage(index + 1)}
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
        <Icon icon="ant-design:arrow-right-outlined" />
      </div>
    );
  }, [pageCount, currentPage]);

  console.log("pagination", pageCount, currentPage, renderNumbers());
  return <div>{renderNumbers()}</div>;
};

export default Pagination;
