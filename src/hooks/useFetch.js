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
  const [serviceProps, setServiceProps] = useState([]);

  const API_KEY_4 = process.env.REACT_APP_API_KEY_4;
  const apiServices = new ApiService();

  const createFetchOptions = useCallback(
    (bodyData = null, httpMethod = "GET") => {
      const requestOptions = {
        method: httpMethod,
        mode: "cors",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${API_KEY_4}`,
        },
      };

      if (bodyData) {
        requestOptions.body = JSON.stringify({
          ...bodyData,
        });
      }

      setReqOptions(requestOptions);
      setIsLoading(true);
    },
    []
  );

  const createFetchRequest = (
    serviceMethod,
    serviceMethodProps,
    bodyData,
    httpMethod
  ) => {
    setService(serviceMethod);
    setServiceProps(serviceMethodProps);
    createFetchOptions(bodyData, httpMethod);
  };

  useEffect(() => {
    console.log(`>>>>>  start ${service} method  >>>`);
    // console.log("reqOptions: ", reqOptions);
    // console.log("serviceMethodProps: ", serviceProps);

    if (!isLoading) return;
    apiServices[service]({ serviceProps, reqOptions })
      .then((res) => {
        console.log(`>>>>>  сработал ${service} method  >>>`);
        setResponse(res);
      })
      .catch((err) => {
        console.log("err: ", err);
        setError(err);
      })
      .finally(() => {
        console.log("Finally!!!");
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [isLoading, reqOptions]);

  return [{ isLoading, response, error }, createFetchRequest];
};
