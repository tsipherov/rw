import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import { useLocalStorage } from "./useLocalStorage";
import ApiService from "../services/apiService";

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  console.log("url >>> ", url);

  const service = new ApiService();

  // const baseUrl = "https://conduit.productionready.io/api";

  // const [userToken] = useLocalStorage("token");

  const createFetchOptions = useCallback(
    (options = {}) => {
      const requestOptions = {
        ...options,
        // headers: {
        //   authorization: userToken ? `Token ${userToken}` : "",
        // },
      };
      // console.log("requestOptions: ", requestOptions);
      setOptions(requestOptions);
      setIsLoading(true);
    },
    []
    // [userToken]
  );

  useEffect(() => {
    if (isLoading) return;
    // if (!isLoading) return;
    // console.log("options: ", options);
    // axios(baseUrl + url, options)
    service
      .getAuthentication()
      .then((res) => res.json())
      .then((res) => {
        console.log("axios response >>> ", res);
        setResponse(res);
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
