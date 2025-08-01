export default function StartSkeleton() {
  return (
    <div className="animate-pulse space-y-4 max-w-xl">
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
}
