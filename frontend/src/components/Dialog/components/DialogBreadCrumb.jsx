import { ChevronRight } from "lucide-react";

export function DialogBreadcrumb({ pageStack, setPageStack, formatPageName }) {
  return (
    <>
      {pageStack.length > 0 && (
        <div className="text-2xl text-left flex mx-6 mt-2 mb-8">
          {pageStack.map((page, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <ChevronRight />}
              {index < pageStack.length - 1 ? (
                <button
                  onClick={() =>
                    setPageStack((prev) => prev.slice(0, index + 1))
                  }
                  className="cursor-pointer hover:underline"
                >
                  {formatPageName(page)}
                </button>
              ) : (
                <span className="font-semibold">{formatPageName(page)}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
