import { FallbackProps } from "react-error-boundary";
import GhostBtn from "../../components/btn/GhostBtn";

export default function UnexpectedErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error);

  return (
    <div className="flex flex-col justify-center items-center gap-12 h-screen">
      <h2 className="text-5xl p-4 text-red-500 font-semibold">
        Oppss! - An unexpected error occured
      </h2>
      <div>
        <GhostBtn onClick={resetErrorBoundary}>
          <span>Try Again</span>
        </GhostBtn>
      </div>
    </div>
  );
}
