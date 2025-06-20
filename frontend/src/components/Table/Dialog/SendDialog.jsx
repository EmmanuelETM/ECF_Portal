import { useRef, useState, useEffect } from "react";
import { Send, X } from "lucide-react";

export function SendDialog({ archivo, view }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && view === "emision") {
      console.log("somshi");
    }
  }, [open, view]);

  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setOpen(false);
  };

  return (
    <>
      <button
        className="cursor-pointer p-2 rounded-lg text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
        onClick={openDialog}
      >
        <Send size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg w-[90%] max-w-5xl h-[80vh] backdrop:backdrop-blur-sm border p-0"
        style={{ inset: 0, margin: "auto" }}
        onClose={closeDialog}
      >
        <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold truncate">{archivo}</h2>
            <button
              className="text-gray-500 hover:text-black"
              onClick={closeDialog}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto text-leftrounded-md mx-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-black cursor-pointer text-white p-4 rounded-lg">
                Enviar ECF a DGII
              </button>
              <button className="bg-black cursor-pointer text-white p-4 rounded-lg">
                Enviar ACECF a DGII
              </button>
              <button className="bg-black cursor-pointer text-white p-4 rounded-lg">
                Enviar ECF a Cliente
              </button>
              <button className="bg-black cursor-pointer text-white p-4 rounded-lg">
                Enviar ACECF a Cliente
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
