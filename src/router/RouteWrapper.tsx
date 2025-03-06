import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import UnexpectedErrorPage from "../pages/error/UnexpectedErrorPage";
import PuffLoader from "react-spinners/PuffLoader";

interface RouteWrapperProps {
  children: ReactNode;
}

export default function RouteWrapper({ children }: RouteWrapperProps) {
  const Loader = (
    <PuffLoader
      size={50}
      className="absolute top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2"
    />
  );

  return (
    <ErrorBoundary FallbackComponent={UnexpectedErrorPage}>
      <Suspense fallback={Loader}>{children}</Suspense>
    </ErrorBoundary>
  );
}
