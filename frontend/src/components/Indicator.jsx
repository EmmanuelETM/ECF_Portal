export function Indicator({ value, title, subtitle, Icon }) {
  return (
    <div className="flex flex-col justify-between gap-3 p-3 sm:p-4 lg:p-5 bg-white drop-shadow-md border-2 border-green-600 rounded-2xl transition-all">
      <div className="flex justify-between items-center">
        <p className=" truncate text-sm sm:text-base lg:text-lg text-gray-500 font-medium">
          {title}
        </p>
        {Icon && <Icon className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />}
      </div>

      <span className="truncate text-lg md:text-xl lg:text-2xl font-semibold leading-snug">
        {value}
      </span>

      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
