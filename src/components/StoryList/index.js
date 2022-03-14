/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import Story from "../Story";
import CommentSection from "../CommentSection";
import Skeleton from "react-loading-skeleton";

const StoryList = ({
  data,
  loading,
  showCommentSection,
  selectedStory,
  setShowCommentSection,
  setSelectedStory,
}) => {
  if (loading) {
    return <Skeleton count={20} />;
  }

  const closeCommentSection = useCallback(() => {
    setShowCommentSection(false);
    setSelectedStory(undefined);
  }, []);

  return (
    <div>
      {showCommentSection && (
        <CommentSection
          selectedStory={selectedStory}
          closeCommentSection={closeCommentSection}
        />
      )}
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            padding: "0.5em 0",
            margin: "0.5em 0",
          }}
        >
          <Story
            item={item}
            setShowCommentSection={setShowCommentSection}
            setComments={setShowCommentSection}
            setSelectedStory={setSelectedStory}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryList;
