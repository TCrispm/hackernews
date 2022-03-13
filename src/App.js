import React, { useCallback, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Pagination from "./components/Pagination";

//30646926
function App() {
  console.log("fetching");
  const [listing, setListing] = useState("newstories");
  const { data, loading, error } = useFetch(listing);

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

  const onChangeListing = useCallback((newlisting) => {
    setListing(newlisting);
  }, []);

  console.log(data, loading, error);
  return (
    <div>
      <Header onChangeListing={onChangeListing} />
      {error && <div>Something happens..</div>}
      {!loading && !error && (
        <div style={{ margin: "20px 50px", paddingTop: "80px" }}>
          <div style={{ position: "fixed", top: 71 }}>
            <Pagination />
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.5em",
              paddingTop: "2em",
            }}
          >
            {title}
          </div>
          <StoryList data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
