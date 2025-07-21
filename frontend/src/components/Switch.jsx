export function Switch({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors duration-300 ${
        enabled ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
