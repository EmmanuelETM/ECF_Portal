export function NavLink({ text, Icon, onClick, isActive, isCollapsed }) {
  return (
    <>
      {!isCollapsed ? (
        <li
          className={`py-2 px-3 mx-2 rounded-xl cursor-pointer text-md flex items-center gap-3 ${
            isActive ? "bg-lime-600 text-white" : ""
          }`}
          onClick={onClick}
        >
          {Icon && <Icon size={20} />}
          {text}
        </li>
      ) : (
        <li
          className={`p-2 rounded-xl mx-2 cursor-pointer flex justify-center items-center ${
            isActive ? "bg-lime-600 text-white" : ""
          }`}
          onClick={onClick}
        >
          {Icon && <Icon size={20} />}
        </li>
      )}
    </>
  );
}
