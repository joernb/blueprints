import React, { useContext, useState, useCallback, useMemo } from "react";

const useAsyncCallback = (callback, deps) => {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(error);
  const [result, setResult] = useState();

  const fn = useCallback(
    (...args) =>
      Promise.resolve()
        .then(() => {
          setRunning(true);
          setError(undefined);
          return callback(...args);
        })
        .then(
          result => {
            setRunning(false);
            setResult(result);
          },
          error => {
            setRunning(false);
            setError(error);
          }
        ),
    deps
  );

  return {
    fn,
    running,
    error,
    result,
  };
};

export default useAsyncCallback;
