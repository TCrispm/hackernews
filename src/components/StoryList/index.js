/* eslint-disable react/prop-types */
import React from "react";
import Story from "../Story";

const StoryList = ({ data }) => {
  return (
    <div>
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
          <Story item={item} />
        </div>
      ))}
    </div>
  );
};

export default StoryList;
