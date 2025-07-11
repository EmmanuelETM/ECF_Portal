import { DropdownButton } from "../components/Dropdown/DropDown";
import { SkeletonSquare } from "../components/Skeleton";

import {
  LastYear,
  ThisMonth,
  ThisWeek,
  ThisYear,
  Today,
  Yesterday,
} from "../lib/date-helpers";

export default function SkeletonPage({ handleSelect }) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-2xl font-semibold">Documentos procesados</h4>
          <DropdownButton
            options={[
              { label: "Hoy", fn: Today },
              { label: "Ayer", fn: Yesterday },
              { label: "Esta Semana", fn: ThisWeek },
              { label: "Este Mes", fn: ThisMonth },
              { label: "Este Año", fn: ThisYear },
              { label: "Año Pasado", fn: LastYear },
              { label: "Todos", fn: () => {} },
            ]}
            onSelect={handleSelect}
          />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 sm:grid-rows-1 gap-4">
          <SkeletonSquare icon={true} />
          <SkeletonSquare icon={true} />
          <SkeletonSquare icon={true} />
          <SkeletonSquare icon={true} />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <h4 className="text-2xl font-semibold mb-2">Montos procesados</h4>
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
