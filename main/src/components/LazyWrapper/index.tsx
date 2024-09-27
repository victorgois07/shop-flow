import React, { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import SkeletonLoader from "../SkeletonLoader";

type LazyWrapperProps<T> = {
  importPath: () => Promise<{ default: React.ComponentType<T> }>;
  retryDelay?: number;
  componentProps?: T;
  hideErrorMessage?: boolean;
};

const LazyWrapper = <T,>({
  importPath,
  retryDelay = 30000,
  componentProps,
  hideErrorMessage = false,
}: LazyWrapperProps<T>) => {
  const [retryKey, setRetryKey] = useState(0);

  const retryComponent = () => {
    setRetryKey((prevKey) => prevKey + 1);
  };

  const LazyComponent = lazy(importPath) as React.ComponentType<T>;

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.accept((_) => {
        retryComponent();
      });
    }
  }, []);

  return (
    <ErrorBoundary
      onError={() => {
        console.error("Component loading failed, retrying in 30 seconds...");
        setTimeout(retryComponent, retryDelay);
      }}
      hideErrorMessage={hideErrorMessage}
    >
      <Suspense fallback={<SkeletonLoader />}>
        <LazyComponent {...(componentProps ?? ({} as T))} key={retryKey} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyWrapper;
