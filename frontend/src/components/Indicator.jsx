export function Indicator({ value, title, subtitle, Icon }) {
  return (
    <div className="flex flex-col gap-2 p-4 drop-shadow-xl border-2 rounded-xl border-green-600 bg-gray-100">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{title}</p>
        {Icon && <Icon className="text-green-600" />}
      </div>
      <span className="text-3xl text-black font-semibold">{value}</span>
      {subtitle && <div className="text-gray-600">{subtitle}</div>}
    </div>
  );
}
