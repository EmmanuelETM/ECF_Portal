export function Button({ text, Icon, onClick }) {
  return (
    <button
      className="border-1 cursor-pointer rounded-sm border-green-700 p-1 text-sm text-green-700 hover:bg-green-700 hover:text-white"
      onClick={() => onClick()}
    >
      {Icon && <Icon />}
      {text && text}
    </button>
  );
}
