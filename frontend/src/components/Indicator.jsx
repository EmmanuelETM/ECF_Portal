export function Indicator({ value, label }) {
  return (
    <div className="flex flex-col items-center drop-shadow-xl border-2 rounded-xl border-green-600 bg-emerald-100 text-green-700 py-6">
      <span className="text-3xl font-semibold">{value}</span>
      <span className="font-light">{label}</span>
    </div>
  );
}
