import { HashLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="flex justify-center items-center h-32 w-full text-gray-600 text-lg font-medium animate-pulse">
      <span className="flex flex-col items-center justify-center gap-2">
        <HashLoader />
        Loading data...
      </span>
    </div>
  );
}
