const API_KEY_4 = process.env.REACT_APP_API_KEY_4;

export const createFetchOptions = (bodyData = null, httpMethod = "GET") => {
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
  return requestOptions;
};
