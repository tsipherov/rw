import React from "react";

const BackendErrorMessage = ({ backendError }) => {
  return <div className="error-messages">{`${backendError}`}</div>;
  // for (const [key, value] of Object.entries(backendError)) {
  // }
};

export default BackendErrorMessage;
