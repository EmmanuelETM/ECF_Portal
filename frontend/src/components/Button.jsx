const buttonStyles =
  "border-1 flex justify-between items-center gap-2 cursor-pointer rounded-md border-green-700 p-2 text-sm text-green-700 hover:bg-green-700 hover:text-white";

export function Button({ text, Icon, className = buttonStyles, onClick }) {
  return (
    <button className={className} onClick={() => onClick()}>
      {Icon && <Icon />}
      {text && <p className="font-medium">{text}</p>}
    </button>
  );
}
