import { Title } from "../components/Title";
import { Setting } from "../components/Setting";
import { Button } from "../components/Button";
import { Save } from "lucide-react";
import { useState } from "react";

export default function ConfigPage() {
  const [settings, setSettings] = useState({
    enviarADGII: false,
    enviarAlCliente: false,
    notificarComprobante: false,
  });

  const toggleSettings = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClick = () => {
    console.log("guardar click");
  };

  return (
    <>
      <div>
        <Title text={"Configuracion"} />
        <Setting
          title={"Enviar a DGII automaticamente"}
          description={
            "Si el comprobante es valido, enviarlo inmediatamente a DGII"
          }
          enabled={settings.enviarADGII}
          onToggle={() => toggleSettings("enviarADGII")}
        />
        <Setting
          title={"Enviar al Cliente automaticamente"}
          description={
            "Si el comprobante es aceptado por DGII, reenviar inmediatamente al Cliente."
          }
          enabled={settings.enviarAlCliente}
          onToggle={() => toggleSettings("enviarAlCliente")}
        />
        <Setting
          title={"Notificarme cuando reciba comprobante"}
          description={
            "Recibir un correo cuando se reciba un comprobante por parte de algun Cliente."
          }
          enabled={settings.notificarComprobante}
          onToggle={() => toggleSettings("notificarComprobante")}
        />

        <Button text={"Guardar"} Icon={Save} onClick={handleClick} />
      </div>
    </>
  );
}
