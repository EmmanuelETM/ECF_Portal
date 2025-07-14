import { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { DialogTitle } from "./components/DialogTitle";
import { DialogBreadcrumb } from "./components/DialogBreadCrumb";
import {
  enviarClienteAC_Aceptacion,
  enviarClienteAC_Rechazo,
  enviarDGIIAC_Aceptacion,
  enviarDGIIAC_Rechazo,
} from "../../api/envio";

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

  const handleDgiiAceptar = async (archivo) => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarDGIIAC_Aceptacion(ecf);
    closeDialog();
  };

  const handleDgiiRechazo = async (archivo, MotivoRechazo) => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarDGIIAC_Rechazo(ecf, MotivoRechazo);
    closeDialog();
  };

  const handleClienteAceptar = async (archivo) => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarClienteAC_Aceptacion(ecf);
    closeDialog();
  };

  const handleClienteRechazo = async (archivo, MotivoRechazo) => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarClienteAC_Rechazo(ecf, MotivoRechazo);
    closeDialog();
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
          <DialogBreadcrumb
            pageStack={pageStack}
            setPageStack={setPageStack}
            formatPageName={formatPageName}
          />

          <div className="flex-1 p-4  overflow-auto rounded-md mx-2 mb-4">
            {currentPage === "menu" && (
              <div className="grid grid-cols-2 gap-4">
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
            )}

            {currentPage === "aprobacion" && (
              <div className="grid grid-cols-2 gap-4">
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
            )}

            {currentPage === "dgii" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-green-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => handleDgiiAceptar()}
                >
                  Aceptacion
                </button>
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("dgii-rechazo")}
                >
                  Rechazo
                </button>
              </div>
            )}

            {currentPage === "dgii-rechazo" && (
              <div className="grid gap-4">
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() =>
                    handleDgiiRechazo(archivo, "Informaciones Erroneas")
                  }
                >
                  Informaciones Erroneas
                </button>
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() =>
                    handleDgiiRechazo(archivo, "Cambio de Productos")
                  }
                >
                  Cambio de Productos
                </button>
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Otro
                </button>
              </div>
            )}

            {currentPage === "cliente" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-green-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => handleClienteAceptar(archivo)}
                >
                  Aceptacion
                </button>
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => goTo("cliente-rechazo")}
                >
                  Rechazo
                </button>
              </div>
            )}

            {currentPage === "cliente-rechazo" && (
              <div className="grid gap-4">
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() =>
                    handleClienteRechazo(archivo, "Informaciones Erroneas")
                  }
                >
                  Informaciones Erroneas
                </button>

                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() =>
                    handleClienteRechazo(archivo, "Cambio de Productos")
                  }
                >
                  Cambio de Productos
                </button>
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() =>
                    handleClienteRechazo(archivo, "Transaccion no Reconocida")
                  }
                >
                  Transaccion No Reconocida
                </button>
                <button
                  className="bg-red-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => {}}
                >
                  Otro
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
