/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

import { useStory } from "../../contexts/story";

const Story = ({ item }) => {
  const { loadingStories } = useStory();
  const { descendants, score, time, title, url, by, id } = item;

  console.log("loadingStories", loadingStories);
  if (loadingStories.includes(id)) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      onClick={() => (window.location.href = url)}
    >
      <div style={{ display: "flex", fontWeight: 700 }}>{title}</div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {score} point | {descendants} comments | {moment(time).fromNow} by {by}
      </div>
    </div>
  );
};

export default Story;
