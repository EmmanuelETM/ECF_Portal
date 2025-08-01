export default function SkeletonPage() {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="grid sm:grid-cols-3 sm:grid-rows-1 gap-4">
          <SkeletonSquare icon={true} />
          <SkeletonSquare icon={true} />
          <SkeletonSquare icon={true} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <SkeletonSquare icon={true} />
          <SkeletonSquare icon={true} />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <h4 className="text-2xl font-semibold mb-2">Por Tipo de Comprobante</h4>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
          <SkeletonSquare third={true} />
        </div>
      </div>
    </div>
  );
}

function SkeletonSquare({ third = false, icon = false }) {
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
