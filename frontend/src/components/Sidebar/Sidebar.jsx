import {
  FileInput,
  ReceiptText,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "./Navlink";
import { useEffect } from "react";

export function Sidebar({
  route,
  setRoute,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;

      if (isMobile) {
        setSidebarCollapsed(false);
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarCollapsed, setSidebarOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity sm:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar container */}
      <div
        className={`
          fixed sm:static top-0 left-0 h-full z-30 bg-gray-200 drop-shadow-2xl transition-all duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
          ${sidebarCollapsed ? "w-16" : "w-64"} sm:flex flex-col
        `}
      >
        {/* Top bar with collapse button */}
        <div className="px-4 pt-4 text-xl font-semibold text-gray-600 flex items-center justify-between">
          {!sidebarCollapsed && <span>Pages</span>}
          <button
            className="hover:bg-gray-300 rounded-lg p-1 sm:block hidden"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu />
          </button>
        </div>

        <ul className="py-3 flex-grow overflow-auto flex flex-col gap-2">
          <NavLink
            text="Inicio"
            Icon={Home}
            isCollapsed={sidebarCollapsed}
            onClick={() => {
              setRoute("start");
              setSidebarOpen(false);
            }}
            isActive={route === "start"}
          />
          <NavLink
            text="Emisión"
            Icon={FileInput}
            isCollapsed={sidebarCollapsed}
            onClick={() => {
              setRoute("emision");
              setSidebarOpen(false);
            }}
            isActive={route === "emision"}
          />
          <NavLink
            text="Recepción"
            Icon={ReceiptText}
            isCollapsed={sidebarCollapsed}
            onClick={() => {
              setRoute("recepcion");
              setSidebarOpen(false);
            }}
            isActive={route === "recepcion"}
          />
          <NavLink
            text="Configuración"
            Icon={Settings}
            isCollapsed={sidebarCollapsed}
            onClick={() => {
              setRoute("config");
              setSidebarOpen(false);
            }}
            isActive={route === "config"}
          />
        </ul>
      </div>
    </>
  );
}
