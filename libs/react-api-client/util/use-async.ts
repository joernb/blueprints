import { useCallback, useState } from "react";

/**
 * React hook that tracks state and results of async operations.
 */
export const useAsync = <Input, Output>(
  asyncFn: (input: Input) => Promise<Output>
): {
  execute: (input: Input) => Promise<Output | undefined>;
  result: Output | undefined;
  isLoading: boolean;
  error: Error | undefined;
} => {
  const [result, setResult] = useState<Output>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const execute = useCallback(
    async (input: Input) => {
      try {
        setError(undefined);
        setIsLoading(true);
        const output = await asyncFn(input);
        setResult(output);
        setIsLoading(false);
        return output;
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    },
    [asyncFn, setResult, setIsLoading, setError]
  );

  return {
    execute,
    result,
    isLoading,
    error,
  };
};
