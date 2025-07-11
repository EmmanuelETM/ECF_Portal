import { Search, BrushCleaning } from "lucide-react";
import { DateRange } from "./DateRange";
import { Button } from "../Button";
import { Filters } from "./Filters";

export function TableControls({
  date,
  setDate,
  filters,
  setFilters,
  handleSearchClick,
  handleLimpiarClick,
}) {
  return (
    <div className="flex flex-col gap-2 max-w-6xl w-full">
      <div className="mb-2 sm:mb-4">
        <DateRange date={date} setDate={setDate} />
        <Button text="Search" Icon={Search} onClick={handleSearchClick} />
      </div>

      <Filters filters={filters} setFilters={setFilters} />
      <div className="flex items-center gap-4 mt-4">
        <Button
          text="Limpiar"
          Icon={BrushCleaning}
          onClick={handleLimpiarClick}
        />
      </div>
    </div>
  );
}
