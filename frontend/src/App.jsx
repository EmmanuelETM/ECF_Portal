import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar";
import StartPage from "./pages/StartPage";
import ConfigPage from "./pages/ConfiguracionPage";
import IndicadoresEmitidos from "./pages/resumen/IndicadoresEmitidos";
import IndicadoresRecibidos from "./pages/resumen/IndicadoresRecibidos";
import ConsultarEmitidosPage from "./pages/consultas/ConsultarEmitidos";
import ConsultarRecibidosPage from "./pages/consultas/ConsultarRecibidos";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  const [route, setRoute] = useState("start");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const ROUTES = {
    start: <StartPage />,
    indicadoresEmitidos: <IndicadoresEmitidos />,
    indicadoresRecibidos: <IndicadoresRecibidos />,
    consultarEmitidos: <ConsultarEmitidosPage />,
    consultarRecibidos: <ConsultarRecibidosPage />,
    config: <ConfigPage />,
  };

  //hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = location.hash.replace("#", "");
      setRoute(hash || "start");
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return window.removeEventListener("hashchange", handleHashChange);
  }, [setRoute]);

  const navigate = (newRoute) => {
    setRoute(newRoute);
    location.hash = newRoute;
  };

  return (
    <AuthProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar setRoute={navigate} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            route={route}
            setRoute={navigate}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <main className="flex-1 min-w-0 px-8 pt-4 mt-4 overflow-y-auto">
            {ROUTES[route] ?? <StartPage />}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
