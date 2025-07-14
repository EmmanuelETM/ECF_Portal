import { useRef, useState, useEffect } from "react";
import { Send, ChevronRight } from "lucide-react";
import { DialogTitle } from "./DialogTitle";

export function SendDialog({ archivo, view }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pageStack, setPageStack] = useState(["menu"]);
  const currentPage = pageStack[pageStack.length - 1];

  useEffect(() => {
    if (open && view === "emision") {
      console.log("somshi");
    }
  }, [open, view]);

  //Navigation
  const goTo = (page) =>
    setPageStack((prev) => {
      const current = prev[prev.length - 1];

      if (current === page) return prev;
      return [...prev, page];
    });

  const openDialog = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setOpen(false);
    setPageStack(["menu"]);
  };

  const formatPageName = (page) => {
    const names = {
      menu: "Menú",
      aprobacion: "Aprobacion Comercial",
      cliente: "Cliente",
      "cliente-rechazo": "Rechazo",
      dgii: "DGII",
      "dgii-rechazo": "Rechazo",
      "ecf-cliente": "ECF Cliente",
    };
    return names[page] || page;
  };

  const handleConsultar = () => {
    console.log("consultar");
  };

  const handleAceptacion = () => {
    console.log("aceptacion");
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
          <DialogTitle title={archivo} closeDialog={closeDialog} />
          {pageStack.length > 0 && (
            <div className="text-xl text-left flex mx-6 mb-2">
              {pageStack.map((page, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <ChevronRight />}
                  {index < pageStack.length - 1 ? (
                    <button
                      onClick={() =>
                        setPageStack((prev) => prev.slice(0, index + 1))
                      }
                      className="cursor-pointer hover:underline"
                    >
                      {formatPageName(page)}
                    </button>
                  ) : (
                    <span className="font-semibold">
                      {formatPageName(page)}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}

          <div className="flex-1 p-4  overflow-auto rounded-md mx-2 mb-4">
            {currentPage === "menu" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-black cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => handleConsultar()}
                >
                  Consultar en DGII
                </button>
                <button
                  className="bg-black cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("aprobacion")}
                >
                  Aprobación Comercial
                </button>
              </div>
            )}

            {currentPage === "aprobacion" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-black cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("dgii")}
                >
                  DGII
                </button>
                <button
                  className="bg-black cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("cliente")}
                >
                  Cliente
                </button>
              </div>
            )}

            {currentPage === "dgii" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-green-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => handleAceptacion()}
                >
                  Aceptacion
                </button>
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("dgii-rechazo")}
                >
                  Rechazo
                </button>
              </div>
            )}

            {currentPage === "dgii-rechazo" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Informaciones Erroneas
                </button>
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Cambio de Productos
                </button>
              </div>
            )}

            {currentPage === "cliente" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-green-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => handleAceptacion()}
                >
                  Aceptacion
                </button>
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("cliente-rechazo")}
                >
                  Rechazo
                </button>
              </div>
            )}

            {currentPage === "cliente-rechazo" && (
              <div className="grid gap-4">
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Informaciones Erroneas
                </button>
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Cambio de Productos
                </button>
                <button
                  className="bg-red-600 cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Transaccion No Reconocida
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
