import {
  Settings,
  Home,
  FileChartColumn,
  FileChartColumnIncreasing,
  FileOutput,
  FileCheck2,
  Menu,
} from "lucide-react";
import { NavLink } from "./Navlink";
import { useEffect, useRef } from "react";

export function Sidebar({
  route,
  setRoute,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const wasMobile = useRef(null); // track last breakpoint

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 640;

      setSidebarOpen(!isMobile);

      if (isMobile) {
        setSidebarCollapsed(false);
      } else {
        if (wasMobile.current === true || wasMobile.current === null) {
          const saved = localStorage.getItem("sidebarCollapsed");
          if (saved !== null) {
            setSidebarCollapsed(saved === "true");
          } else {
            setSidebarCollapsed(false); // default
          }
        }
      }

      wasMobile.current = isMobile;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarCollapsed, setSidebarOpen]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width >= 640) {
      localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString());
    }
  }, [sidebarCollapsed]);

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

      <div
        className={`
          fixed sm:static top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out bg-gray-100 border-r border-gray-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
          ${sidebarCollapsed ? "w-16" : "w-64"} 
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
          )}

          <button
            className="hidden sm:block p-1 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu size={20} />
          </button>
        </div>

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

          {!sidebarCollapsed && (
            <p className="pt-2 pb-1 ml-3 text-gray-500 text-sm">Resumen</p>
          )}
          {sidebarCollapsed && <hr className="text-gray-400 my-2 sm:mt-0" />}

          <NavLink
            text="Emitidos"
            Icon={FileChartColumnIncreasing}
            isCollapsed={sidebarCollapsed}
            isActive={route === "indicadoresEmitidos"}
            onClick={() => {
              setRoute("indicadoresEmitidos");
              setSidebarOpen(false);
            }}
          />
          <NavLink
            text="Recibidos"
            Icon={FileChartColumn}
            isCollapsed={sidebarCollapsed}
            isActive={route === "indicadoresRecibidos"}
            onClick={() => {
              setRoute("indicadoresRecibidos");
              setSidebarOpen(false);
            }}
          />

          {!sidebarCollapsed && (
            <p className="pt-2 pb-1 ml-3 text-gray-500 text-sm">Consultar</p>
          )}
          {sidebarCollapsed && <hr className="text-gray-400 my-2 sm:mt-0" />}

          <NavLink
            text="Emitidos"
            Icon={FileOutput}
            isCollapsed={sidebarCollapsed}
            isActive={route === "consultarEmitidos"}
            onClick={() => {
              setRoute("consultarEmitidos");
              setSidebarOpen(false);
            }}
          />
          <NavLink
            text="Recibidos"
            Icon={FileCheck2}
            isCollapsed={sidebarCollapsed}
            isActive={route === "consultarRecibidos"}
            onClick={() => {
              setRoute("consultarRecibidos");
              setSidebarOpen(false);
            }}
          />

          {!sidebarCollapsed && (
            <>
              <p className="pt-2 pb-1 ml-3 text-gray-500 text-sm">Admin</p>
            </>
          )}
          {sidebarCollapsed && <hr className="text-gray-400 my-2 sm:mt-0" />}

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
