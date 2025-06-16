import {
  Send,
  CheckCheck,
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
    const handleSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile: sidebar closed & expanded (not collapsed)
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else if (width >= 640 && width <= 800) {
        // Medium: sidebar open & collapsed
        setSidebarOpen(true);
        setSidebarCollapsed(true);
      } else {
        // Large: sidebar open & expanded
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      }
    };

    handleSize(); // Run initially
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, [setSidebarOpen, setSidebarCollapsed]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity sm:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <div
        className={`
          fixed sm:static top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out
          bg-gray-100 border-r border-gray-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
          ${sidebarCollapsed ? "w-16" : "w-64"} 
          flex flex-col
        `}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
          )}

          {/* Collapse Button only on medium+ screens */}
          <button
            className="hidden sm:block p-1 rounded hover:bg-gray-200"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex-grow overflow-y-auto py-4 px-2 space-y-1">
          <NavLink
            text="Inicio"
            Icon={Home}
            isCollapsed={sidebarCollapsed}
            isActive={route === "start"}
            onClick={() => {
              setRoute("start");
              setSidebarOpen(false);
            }}
          />
          <NavLink
            text="Emisión"
            Icon={Send}
            isCollapsed={sidebarCollapsed}
            isActive={route === "emision"}
            onClick={() => {
              setRoute("emision");
              setSidebarOpen(false);
            }}
          />
          <NavLink
            text="Recepción"
            Icon={CheckCheck}
            isCollapsed={sidebarCollapsed}
            isActive={route === "recepcion"}
            onClick={() => {
              setRoute("recepcion");
              setSidebarOpen(false);
            }}
          />
          <NavLink
            text="Configuración"
            Icon={Settings}
            isCollapsed={sidebarCollapsed}
            isActive={route === "config"}
            onClick={() => {
              setRoute("config");
              setSidebarOpen(false);
            }}
          />
        </ul>
      </div>
    </>
  );
}
