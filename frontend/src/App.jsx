import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header";

import StartPage from "./pages/StartPage";
import ConfigPage from "./pages/ConfiguracionPage";
import IndicadoresEmitidos from "./pages/resumen/IndicadoresEmitidos";
import IndicadoresRecibidos from "./pages/resumen/IndicadoresRecibidos";
import ConsultarEmitidosPage from "./pages/consultas/ConsultarEmitidos";
import ConsultarRecibidosPage from "./pages/consultas/ConsultarRecibidos";

function App() {
  const [route, setRoute] = useState("start");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const ROUTES = {
    start: () => <StartPage />,
    indicadoresEmitidos: () => <IndicadoresEmitidos />,
    indicadoresRecibidos: () => <IndicadoresRecibidos />,
    consultarEmitidos: () => <ConsultarEmitidosPage />,
    consultarRecibidos: () => <ConsultarRecibidosPage />,
    config: () => <ConfigPage />,
  };

  //hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = location.hash.replace("#", "");
      setRoute(hash || "start");
    };

    const storedHash = localStorage.getItem("lastHash");
    if (storedHash) {
      setRoute(storedHash);
      location.hash = storedHash;
    } else {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);

    return window.removeEventListener("hashchange", handleHashChange);
  }, [setRoute]);

  const navigate = (newRoute) => {
    setRoute(newRoute);
    location.hash = newRoute;
    localStorage.setItem("lastHash", newRoute);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header setRoute={navigate} setSidebarOpen={setSidebarOpen} />
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
          {(ROUTES[route] || ROUTES.start)()}
        </main>
      </div>
    </div>
  );
}

export default App;
