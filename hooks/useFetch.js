import { useEffect, useState } from "react";
import axios from "axios";

import { JOB_SEARCH_API_KEY } from "@/keys";

import { Alert } from "react-native";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": JOB_SEARCH_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: {
      // query: 'developer jobs in chicago',
      // page: '1',
      // num_pages: '1',
      // country: 'us',
      // date_posted: 'all'
      ...query,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      setError(null);
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      Alert.alert("Error fetching data", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
