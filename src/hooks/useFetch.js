import { useEffect, useMemo, useState } from "react";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";
const PAGE_SIZE = 25;

const useFetch = (listing, currentPage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { firstIndex, lastIndex } = useMemo(() => {
    const lastIndex = currentPage * PAGE_SIZE;
    const firstIndex = lastIndex - PAGE_SIZE;

    return {
      firstIndex,
      lastIndex,
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${listing}.json?print=pretty`);
      if (response.ok) {
        const responseJson = await response.json();
        let ids = responseJson.slice(firstIndex, lastIndex);
        setData(ids);
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
