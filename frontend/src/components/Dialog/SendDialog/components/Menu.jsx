export function Menu({ goTo, handleConsultar }) {
  return (
    <div className="grid gap-4">
      <button
        className="bg-black text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => handleConsultar()}
      >
        Consultar en DGII
      </button>
      <button
        className="bg-black text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => goTo("aprobacion")}
      >
        Aprobación Comercial
      </button>
    </div>
  );
}
