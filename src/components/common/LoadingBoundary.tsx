import React, { Suspense } from "react";
import {
  ErrorBoundary,
  FallbackProps as IFallbackProps,
} from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: IFallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export const Loading = () => {
  return <div className="loading w-full bg-red-400 h-1"></div>;
};

interface ILoadingBoundaryProps {
  children: React.ReactNode;
}

const LoadingBoundary = (props: ILoadingBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <Suspense fallback={<Loading />}>{props.children}</Suspense>
    </ErrorBoundary>
  );
};

export default LoadingBoundary;
