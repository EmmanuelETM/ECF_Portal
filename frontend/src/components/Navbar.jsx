import { Menu, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Navbar({ setRoute, setSidebarOpen }) {
  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-green-600">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-green-600 h-16 justify-between items-center mx-auto px-4 flex">
              <div className="text-3xl font-bold py-4 flex items-center justify-center gap-3">
                <button
                  className="sm:hidden text-white pt-1"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu />
                </button>
                <button
                  className="cursor-pointer text-white"
                  onClick={() => setRoute("start")}
                >
                  Portal FE
                </button>
              </div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <DropDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setOpen(true);
    window.open("https://summasoft.do/acceder/?app=fe", "_self");
  };

  // Close on outside click
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="justify-center items-center flex relative">
        <button
          className="cursor-pointer flex items-center justify-center h-9 w-9 pl-1 rounded-full mr-2 bg-gray-300"
          onClick={() => setOpen(!open)}
        >
          <LogOut />
        </button>
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleLogout()}
          >
            Cerrar Sesion
          </button>
        </div>
      )}
    </div>
  );
}
