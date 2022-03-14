/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Story from "../Story";
import Comment from "../Comment";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@iconify/react";

const CommentSection = ({ selectedStory, closeCommentSection }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { fetchComment } = useFetch();

  const { kids } = selectedStory;

  const callComments = useCallback(async () => {
    try {
      setLoading(true);
      if (kids && kids.length) {
        const data = await Promise.all(
          kids.map(async (comment) => {
            return await fetchComment(comment);
          })
        );
        setComments(data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [kids]);

  useEffect(() => {
    callComments();
  }, [selectedStory]);

  return (
    <div
      style={{
        padding: "20px",
        zIndex: 200,
        display: "flex",
        height: "100vh",
        position: "fixed",
        backgroundColor: "#fff",
        flexDirection: "column",
        top: 0,
        width: "50%",
        transform: "translateX(100%)",
        boxShadow:
          " 0 20px 25px -5px rgb(0 0 0 / 10%), 0 10px 10px -5px rgb(0 0 0 / 4%)",
      }}
    >
      <div
        style={{
          paddingTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => closeCommentSection()}
      >
        <Icon icon="akar-icons:cross" />
      </div>
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        <Story item={selectedStory} />
      </div>
      <div style={{ overflow: "auto", margin: "20px 0px" }}>
        {!loading && comments.length ? (
          comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })
        ) : (
          <Skeleton count={5} />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
