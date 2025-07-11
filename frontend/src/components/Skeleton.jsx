export function SkeletonSquare({ third = false, icon = false }) {
  return (
    <>
      <div className="bg-white shadow-lg border-2 border-green-600 rounded-xl p-4 animate-pulse transition-all relative">
        {icon && (
          <div className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-lg" />
        )}
        <div className={icon ? `space-y-4 pr-16` : "space-y-4"}>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded w-5/6"></div>
            {third && <div className="h-4 bg-gray-200 rounded w-4/6"></div>}
          </div>
        </div>
      </div>
    </>
  );
}
