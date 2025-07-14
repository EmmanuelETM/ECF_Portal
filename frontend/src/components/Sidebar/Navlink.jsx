export function NavLink({ text, Icon, onClick, isActive, isCollapsed }) {
  return (
    <li
      className={`group cursor-pointer flex items-center transition-colors duration-200 
        ${isCollapsed ? "justify-center px-0" : "justify-start px-3"} 
        ${isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"} 
        py-2 rounded-lg`}
      onClick={onClick}
    >
      <div className="min-w-[24px] flex justify-center items-center">
        {Icon && <Icon size={24} />}
      </div>
      {!isCollapsed && <span className="ml-3 text-sm font-medium">{text}</span>}
    </li>
  );
}
