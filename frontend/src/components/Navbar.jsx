import { Menu, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useConfig } from "../hooks/use-config";

export function Navbar({ setRoute, setSidebarOpen }) {
  const { Ambiente } = useConfig();

  return (
    <div className="bg-green-600">
      <div className="flex flex-col">
        <div className="w-full border-b-2 border-gray-200">
          <div className="h-16 flex items-center justify-between px-4 mx-auto bg-green-600">
            <div className="flex items-center gap-3 text-3xl font-bold text-white mr-2">
              <button
                className="sm:hidden pt-1 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => setRoute("start")}
              >
                Portal FE
              </button>
            </div>

            {Ambiente === "taTest" && (
              <div className="px-1 mt-1 text-xs font-semibold rounded-md bg-amber-400 text-green-900 border border-amber-500">
                Test e-CF
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 md:space-x-6 ml-auto">
              <DropDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DropDown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.open("https://summasoft.do/acceder/?app=fe", "_self");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        aria-label="User menu"
      >
        <LogOut className="text-gray-700 w-5 h-5" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in"
          role="menu"
        >
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-md font-semibold text-left text-gray-700 hover:bg-gray-100 transition-colors"
            role="menuitem"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
