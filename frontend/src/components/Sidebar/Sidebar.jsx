import { FileInput, ReceiptText, Settings, Home, LogOut } from "lucide-react";
import { NavLink } from "./Navlink";

export function Sidebar({ route, setRoute }) {
  return (
    <div className="w-70 bg-gray-200 drop-shadow-2xl px-3 flex flex-col shrink-0">
      <ul className="py-3 flex-grow overflow-auto flex flex-col">
        <NavLink
          text={"Inicio"}
          Icon={Home}
          onClick={() => setRoute("start")}
          isActive={route === "start"}
        />
        <NavLink
          text={"Emisión"}
          Icon={FileInput}
          onClick={() => setRoute("emision")}
          isActive={route === "emision"}
        />
        <NavLink
          text={"Recepción"}
          Icon={ReceiptText}
          onClick={() => setRoute("recepcion")}
          isActive={route === "recepcion"}
        />
        <NavLink
          text={"Configuración"}
          Icon={Settings}
          onClick={() => setRoute("config")}
          isActive={route === "config"}
        />
      </ul>
      <hr />
      <div className="py-2 rounded-l">
        <button
          className="cursor-pointer w-full text-left flex gap-3 px-3 items-center"
          type="button"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </div>
  );
}
