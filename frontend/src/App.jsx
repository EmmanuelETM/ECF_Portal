import { Sidebar } from "./components/Sidebar/Sidebar";
import StartPage from "./pages/StartPage";
import EmisionPage from "./pages/EmisionPage";
import RecepcionPage from "./pages/RecepcionPage";
import ConfigPage from "./pages/ConfiguracionPage";
import SkeletonPage from "./pages/SkeletonPage";
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
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar setRoute={setRoute} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          route={route}
          setRoute={setRoute}
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
  );
}

export default App;
