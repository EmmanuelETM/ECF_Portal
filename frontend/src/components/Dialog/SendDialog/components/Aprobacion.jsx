export function Aprobacion({ goTo }) {
  return (
    <div className="grid gap-4">
      <button
        className="bg-black text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => goTo("dgii")}
      >
        DGII
      </button>
      <button
        className="bg-black text-lg cursor-pointer text-white p-4 rounded-lg"
        onClick={() => goTo("cliente")}
      >
        Cliente
      </button>
    </div>
  );
}
