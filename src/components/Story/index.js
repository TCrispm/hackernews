/* eslint-disable react/prop-types */
import React, { useState } from "react";
import moment from "moment";

const Story = ({ item, setShowCommentSection, setSelectedStory }) => {
  const { descendants, score, time, title, url, by, id } = item;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", fontWeight: 700, cursor: "pointer" }}
        onClick={() => (window.location.href = url)}
      >
        {title}
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {score} point |{" "}
        <span
          onClick={(e) => {
            e.preventDefault();
            if (descendants !== 0) {
              setSelectedStory(item);
              setShowCommentSection(true);
            }
          }}
          style={{ cursor: descendants !== 0 && "pointer", padding: "0px 2px" }}
        >
          {descendants} comments
        </span>{" "}
        | {moment(new Date(time) * 1000).from(Date.now())} by {by}
      </div>
    </div>
  );
};

export default Story;
