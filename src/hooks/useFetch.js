// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import { useLocalStorage } from "./useLocalStorage";
import ApiService from "../services/apiService";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [reqOptions, setReqOptions] = useState({});
  const [service, setService] = useState(null);
  const [serviceProps, setServiceProps] = useState({});

  const API_KEY_4 = process.env.REACT_APP_API_KEY_4;
  const apiServices = new ApiService();

  const createFetchOptions = useCallback(
    (bodyData = {}, httpMethod = "GET") => {
      const requestOptions = bodyData
        ? {
            method: httpMethod,
            mode: "cors",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY_4}`,
            },
            // headers: {
            //   "Content-type": "application/json",
            // },
            body: JSON.stringify({
              ...bodyData,
            }),
          }
        : null;
      console.log("requestOptions: ", requestOptions);
      // if (serviceMethod) setService(serviceMethod);
      setReqOptions(requestOptions);
      setIsLoading(true);
    },
    []
  );

  const createFetchRequest = (
    serviceMethod,
    serviceMethodProps = {},
    { bodyData, httpMethod }
  ) => {
    setService(serviceMethod);
    setServiceProps(serviceMethodProps);
    createFetchOptions(bodyData, httpMethod);
  };

  useEffect(() => {
    if (!isLoading) return;
    apiServices[service](...serviceProps, reqOptions)
      .then((res) => {
        console.log(">>>>>    сработал запрос    >>> ");
        setResponse(res);
      })
      .catch((err) => {
        console.log("err: ", err.message);
        setError(err);
      })
      .finally(() => {
        console.log("Finally!!!");
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [isLoading]);

  return [{ isLoading, response, error }, createFetchRequest];
};
