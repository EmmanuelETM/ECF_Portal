export default function ConfigSkeleton() {
  return (
    <div>
      <SkeletonSetting />
      <SkeletonSetting />
      <SkeletonSetting />
    </div>
  );
}

function SkeletonSetting() {
  return (
    <div className="w-full max-w-5xl bg-white py-4 border-b border-gray-400 animate-pulse transition-all flex items-center justify-between gap-4 my-6">
      <div className="flex flex-col gap-2 w-full">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="w-12 h-6 bg-gray-200 rounded-full" />
    </div>
  );
}
