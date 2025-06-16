export function DateRange() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <label className="flex flex-col gap-2">
        <p className="font-semibold">Desde:</p>
        <input
          type="date"
          className="w-full border border-gray-400 focus:border-green-600 rounded-lg p-2"
        />
      </label>
      <label className="flex flex-col gap-2">
        <p className="font-semibold">Hasta:</p>
        <input
          type="date"
          className="w-full border border-gray-400 focus:border-green-600 rounded-lg p-2"
        />
      </label>
    </div>
  );
}
