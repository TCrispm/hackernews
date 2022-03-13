import { useEffect, useMemo, useState } from "react";
import usePagination from "./usePagination";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

const useFetch = (listing, currentPage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { setPageCount, pageSize } = usePagination();

  const { firstIndex, lastIndex } = useMemo(() => {
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    return {
      firstIndex,
      lastIndex,
    };
  }, [pageSize]);

  const fetchStory = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}item/${id}.json?print=pretty`);
      if (response.ok) {
        return await response.json();
      } else {
        setError(`${response.status}: Error`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchComment = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}item/${id}.json?print=pretty`);
      if (response.ok) {
        const comment = await response.json();
        if (comment.kids && comment.kids.length) {
          const kids = await Promise.all(
            comment.kids.map(async (cmId) => {
              return await fetchComment(cmId);
            })
          );
          return {
            ...comment,
            kids,
          };
        } else {
          return comment;
        }
      } else {
        setError(`${response.status}: Error`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${listing}.json?print=pretty`);
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.length % pageSize > 0) {
          setPageCount(Math.floor(responseJson.length / pageSize) + 1);
        } else {
          setPageCount(responseJson.length / pageSize);
        }
        const storyIds = responseJson.slice(firstIndex, lastIndex);
        let stories = await Promise.all(
          storyIds.map(async (story) => {
            return await fetchStory(story);
          })
        );

        stories.map(async (story) => {
          if (story.kids && story.kids.length) {
            story.kids = await Promise.all(
              story.kids.map(async (comment) => {
                return await fetchComment(comment);
              })
            );
          }
        });

        setData(stories);
      } else {
        setError(`${response.status}: Error`);
      }

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listing]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
