import { enviarClienteAC_Rechazo } from "../../../../api/envio";
import { DialogForm } from "../../components/DialogForm";

export function ClienteRechazo({
  handleClienteRechazo,
  setShow,
  show,
  handleSubmit,
}) {
  return (
    <div className="grid gap-4">
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleClienteRechazo("Informaciones Erroneas")}
      >
        Informaciones Erroneas
      </button>

      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleClienteRechazo("Cambio de Productos")}
      >
        Cambio de Productos
      </button>
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleClienteRechazo("Transaccion no Reconocida")}
      >
        Transaccion No Reconocida
      </button>
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => setShow(!show)}
      >
        Otros
      </button>
      {show ? (
        <DialogForm
          handleSubmit={(event) => handleSubmit(event, enviarClienteAC_Rechazo)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
