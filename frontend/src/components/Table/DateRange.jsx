import { getToday } from "../../lib/date-helpers";

export function DateRange({ date, setDate }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <label className="flex flex-col gap-2">
        <p className="font-semibold">Desde:</p>
        <input
          type="date"
          defaultValue={getToday()}
          onChange={(e) => setDate({ ...date, from: e.target.value })}
          className="w-full border border-gray-400 focus:border-green-600 rounded-lg p-2"
        />
      </label>
      <label className="flex flex-col gap-2">
        <p className="font-semibold">Hasta:</p>
        <input
          type="date"
          defaultValue={getToday()}
          onChange={(e) => setDate({ ...date, to: e.target.value })}
          className="w-full border border-gray-400 focus:border-green-600 rounded-lg p-2"
        />
      </label>
    </div>
  );
}
