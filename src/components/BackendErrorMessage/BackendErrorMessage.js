import React from "react";

const BackendErrorMessage = ({ backendError }) => {
  for (const [key, value] of Object.entries(backendError)) {
    return <div className="error-messages">{`${key} error: ${value}`}</div>;
  }
};

export default BackendErrorMessage;
