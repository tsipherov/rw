import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const baseUrl = "https://conduit.productionready.io/api";

  const [userToken] = useLocalStorage("token");
  const createFetchOptions = useCallback(
    (options = {}) => {
      const requestOptions = {
        ...options,
        headers: {
          authorization: userToken ? `Token ${userToken}` : "",
        },
      };
      // console.log("requestOptions: ", requestOptions);
      setOptions(requestOptions);
      setIsLoading(true);
    },
    [userToken]
  );

  useEffect(() => {
    if (!isLoading) return;
    // console.log("options: ", options);
    axios(baseUrl + url, options)
      .then((res) => {
        // console.log("axios response >>> ", res.data);
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log("err: ", err);
        setError(err.response.data);
        setIsLoading(false);
      });
  }, [isLoading, options, url]);

  return [{ isLoading, response, error }, createFetchOptions];
};
