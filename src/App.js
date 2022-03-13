import React, { useCallback, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useFetch from "./hooks/useFetch";
import usePagination from "./hooks/usePagination";
import Header from "./components/Header";

//30646926
function App() {
  const [listing, setListing] = useState("newstories");

  const { currentPage, setCurrentPage } = usePagination();
  const { data, loading, error } = useFetch(listing, currentPage);

  const title = useMemo(() => {
    switch (listing) {
      case "newstories":
        return "New Stories";
      case "topstories":
        return "Top Stories";
      case "beststories":
        return "Best Stories";
    }
  }, [listing]);

  const onChangePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const onChangeListing = useCallback((newlisting) => {
    setListing(newlisting);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something happens..</div>;
  }

  console.log(data, loading, error);
  return (
    <div>
      <Header onChangeListing={onChangeListing} />
      <div style={{ margin: "20px 50px" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.5em",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

export default App;
