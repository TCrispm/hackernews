import { useEffect, useMemo, useState } from "react";
import { usePagination } from "../contexts/pagination";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

const useFetch = (listing) => {
  const [data, setData] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { setPageCount, pageSize, currentPage, setCurrentPage } =
    usePagination();

  const { firstIndex, lastIndex } = useMemo(() => {
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    return {
      firstIndex,
      lastIndex,
    };
  }, [pageSize, currentPage]);

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

  const fetchStories = async () => {
    try {
      setLoading(true);
      const storyIds = data.slice(firstIndex, lastIndex);
      const storiesList = await Promise.all(
        storyIds.map(async (story) => {
          return await fetchStory(story);
        })
      );
      setStories(storiesList);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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
      const response = await fetch(`${BASE_URL}${listing}.json?print=pretty`);
      if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.length % pageSize > 0) {
          setPageCount(Math.floor(responseJson.length / pageSize) + 1);
        } else {
          setPageCount(responseJson.length / pageSize);
        }
        setData(responseJson);
      } else {
        setError(`${response.status}: Error`);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listing]);

  useEffect(() => {
    if (data && data.length) {
      fetchStories();
    }
  }, [currentPage, data]);

  return {
    data,
    loading,
    error,
    stories,
    fetchComment,
  };
};

export default useFetch;
