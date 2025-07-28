import { DialogForm } from "../../components/DialogForm";

export function DGIIRechazo({
  handleDgiiRechazo,
  fn,
  setShow,
  show,
  handleSubmit,
}) {
  return (
    <div className="grid gap-4">
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleDgiiRechazo("Informaciones Erroneas")}
      >
        Informaciones Erroneas
      </button>
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleDgiiRechazo("Cambio de Productos")}
      >
        Cambio de Productos
      </button>
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => setShow(!show)}
      >
        Otro
      </button>
      {show ? (
        <DialogForm handleSubmit={(event) => handleSubmit(event, fn)} />
      ) : (
        <></>
      )}
    </div>
  );
}
