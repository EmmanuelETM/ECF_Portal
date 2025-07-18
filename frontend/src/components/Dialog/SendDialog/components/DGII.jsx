export function DGIITab({ handleDgiiAceptar, goTo }) {
  return (
    <div className="grid gap-4">
      <button
        className="bg-green-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleDgiiAceptar()}
      >
        Aceptacion
      </button>
      <button
        className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => goTo("dgiiRechazo")}
      >
        Rechazo
      </button>
    </div>
  );
}
