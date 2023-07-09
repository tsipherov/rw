// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import { useLocalStorage } from "./useLocalStorage";
import ApiService from "../services/apiService";

export const useFetch = (serviceMethod) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [service, setService] = useState(serviceMethod);

  const apiServices = new ApiService();

  const createFetchOptions = useCallback((serviceMethod, options = {}) => {
    const requestOptions = {
      ...options,
    };
    console.log("requestOptions: ", requestOptions);
    if (serviceMethod) setService(serviceMethod);
    setOptions(requestOptions);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    console.log("method >>> ", service);
    apiServices[service](options)
      // .then((res) => res.json())
      .then((res) => {
        console.log(">>>>>    сработал запрос    >>> ");
        setResponse(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err: ", err.message);
        setError(err);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [isLoading, options, service]);

  return [{ isLoading, response, error }, createFetchOptions];
};
