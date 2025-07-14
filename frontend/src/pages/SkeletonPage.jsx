import { SkeletonSquare } from "../components/Skeleton";

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
