/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <div>
      <div
        key={comment.id}
        style={{
          padding: "15px",
          margin: "5px",
          border: "1px solid rgb(229, 231, 235)",
          borderRadius: "5px",
        }}
      >
        <div style={{ maxWidth: "400px" }}>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          {moment(new Date(comment.time) * 1000).from(Date.now())} by{" "}
          {comment.by}
        </div>
        {comment.kids &&
          comment.kids.length &&
          comment.kids.map((comment) => {
            return (
              <div key={comment.id}>
                <Comment comment={comment} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
