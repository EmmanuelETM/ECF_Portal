import { Sidebar } from "./components/Sidebar/Sidebar";
import StartPage from "./pages/Inidicadores";
import EmisionPage from "./pages/Emision";
import RecepcionPage from "./pages/Recepcion";
import ConfigPage from "./pages/Configuracion";
import { useState } from "react";

function App() {
  const ROUTES = {
    start: <StartPage />,
    emision: <EmisionPage />,
    recepcion: <RecepcionPage />,
    config: <ConfigPage />,
  };

  const [route, setRoute] = useState("start");

  return (
    <div className="h-dvh flex">
      <Sidebar route={route} setRoute={setRoute} />
      <div className="flex-1 flex flex-col pt-5 px-4 mt-3">
        {ROUTES[route] ?? <StartPage />}
      </div>
    </div>
  );
}

export default App;
