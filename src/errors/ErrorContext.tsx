import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext({});

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const value = {
    error,
    setError,
    clearError: () => setError(null),
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
