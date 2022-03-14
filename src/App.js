import React, { useCallback, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Pagination from "./components/Pagination";
import { usePagination } from "./contexts/pagination";

function App() {
  const [listing, setListing] = useState("newstories");
  const { loading, error, stories } = useFetch(listing);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [selectedStory, setSelectedStory] = useState();
  const { setCurrentPage } = usePagination();

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
    setCurrentPage(1);
    setShowCommentSection(false);
    setSelectedStory(undefined);
    setListing(newlisting);
  }, []);

  return (
    <div>
      <Header onChangeListing={onChangeListing} listing={listing} />
      {error && <div>Something happens..</div>}
      {!error && (
        <div style={{ margin: "20px 50px", paddingTop: "80px" }}>
          <div style={{ position: "fixed", top: 71 }}>
            <Pagination
              setShowCommentSection={setShowCommentSection}
              setSelectedStory={setSelectedStory}
            />
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
          <StoryList
            data={stories}
            loading={loading}
            showCommentSection={showCommentSection}
            selectedStory={selectedStory}
            setSelectedStory={setSelectedStory}
            setShowCommentSection={setShowCommentSection}
          />
        </div>
      )}
    </div>
  );
}

export default App;
