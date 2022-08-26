import { useCallback, useEffect, useState } from "react";

/**
 * React hook for managing <input /> state. Returns the state and an onChange handler.
 */
export const useInputState = <T extends unknown>(
  initValue: T
): [T, (event: any) => void] => {
  const [state, setState] = useState(initValue);

  const handleInputChange = useCallback(
    (event) => setState(event.target.value),
    [setState]
  );

  useEffect(() => {
    setState(initValue);
  }, [initValue, setState]);

  return [state, handleInputChange];
};
