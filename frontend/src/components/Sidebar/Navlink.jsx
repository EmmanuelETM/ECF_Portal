export function NavLink({ text, Icon, onClick, isActive }) {
  return (
    <li
      className={`py-2 px-3 rounded-xl cursor-pointer text-sm ${isActive ? "bg-green-600 text-white" : ""}`}
      onClick={onClick}
    >
      <p className="flex items-center gap-3" type="button">
        {Icon && <Icon size={20} />}
        {text}
      </p>
    </li>
  );
}
