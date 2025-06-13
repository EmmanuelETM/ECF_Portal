import { Sidebar } from "./components/Sidebar/Sidebar";
import StartPage from "./pages/Inidicadores";
import EmisionPage from "./pages/Emision";
import RecepcionPage from "./pages/Recepcion";
import ConfigPage from "./pages/Configuracion";
import { useState } from "react";
import { Navbar } from "./components/Navbar";

function App() {
  const ROUTES = {
    start: <StartPage />,
    emision: <EmisionPage />,
    recepcion: <RecepcionPage />,
    config: <ConfigPage />,
  };

  const [route, setRoute] = useState("start");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div>
      <Navbar setRoute={setRoute} setSidebarOpen={setSidebarOpen} />
      <div className="h-screen flex">
        <Sidebar
          route={route}
          setRoute={setRoute}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <div className="flex-1 flex flex-col pt-5 px-4 mt-3 mx-3">
          {ROUTES[route] ?? <StartPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
