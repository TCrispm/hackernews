/* eslint-disable react/prop-types */
import React from "react";
import { createContext, useCallback, useState, useContext } from "react";

const StoriesContext = createContext({
  loadingStories: [],
  addLoadingStory: () => [],
  removeLoadingStory: () => [],
});

export const StoryProvider = (props) => {
  const [loadingStories, setLoadingStories] = useState([]);
  console.log("loadingStories", loadingStories);

  const addLoadingStory = useCallback(
    (id) => {
      setLoadingStories([...loadingStories, id]);
    },
    [loadingStories]
  );

  const removeLoadingStory = useCallback(
    (id) => {
      const newLoadingStories = [...loadingStories];
      const data = newLoadingStories.filter((story) => story !== id);
      setLoadingStories(data);
    },
    [loadingStories]
  );
  console.log("fetching");

  return (
    <StoriesContext.Provider
      value={{ loadingStories, addLoadingStory, removeLoadingStory }}
    >
      {props.children}
    </StoriesContext.Provider>
  );
};

export const useStory = () => useContext(StoriesContext);
