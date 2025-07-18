import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { DialogTitle } from "../components/DialogTitle";
import { DialogBreadcrumb } from "../components/DialogBreadCrumb";
import { DialogForm } from "../components/DialogForm";
import {
  enviarClienteAC_Aceptacion,
  enviarClienteAC_Rechazo,
  enviarDGIIAC_Aceptacion,
  enviarDGIIAC_Rechazo,
} from "../../../api/envio";

export function SendDialog({ archivo }) {
  const dialogRef = useRef(null);
  const [show, setShow] = useState(false);
  const [pageStack, setPageStack] = useState(["menu"]);
  const currentPage = pageStack[pageStack.length - 1];

  //Navigation
  const goTo = (page) =>
    setPageStack((prev) => {
      const current = prev[prev.length - 1];

      if (current === page) return prev;
      return [...prev, page];
    });

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setShow(false);
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

  const handleDgiiAceptar = async () => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarDGIIAC_Aceptacion(ecf);
    closeDialog();
  };

  const handleDgiiRechazo = async (MotivoRechazo) => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarDGIIAC_Rechazo(ecf, MotivoRechazo);
    closeDialog();
  };

  const handleClienteAceptar = async () => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarClienteAC_Aceptacion(ecf);
    closeDialog();
  };

  const handleClienteRechazo = async (MotivoRechazo) => {
    const ecf = archivo.replace(/\.xml$/, "");
    await enviarClienteAC_Rechazo(ecf, MotivoRechazo);
    closeDialog();
  };

  const handleSubmit = async (event, fn) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const MotivoRechazo = formData.get("MotivoRechazo");
    const ecf = archivo.replace(/\.xml$/, "");
    await fn(ecf, MotivoRechazo);
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
            )}

            {currentPage === "aprobacion" && (
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
            )}

            {currentPage === "dgii" && (
              <div className="grid gap-4">
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
                  <DialogForm
                    handleSubmit={(event) =>
                      handleSubmit(event, enviarClienteAC_Rechazo)
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            )}

            {currentPage === "cliente" && (
              <div className="grid gap-4">
                <button
                  className="bg-green-600 text-lg cursor-pointer text-white p-4 rounded-lg"
                  onClick={() => handleClienteAceptar()}
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
                  onClick={() =>
                    handleClienteRechazo("Transaccion no Reconocida")
                  }
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
                    handleSubmit={(event) =>
                      handleSubmit(event, enviarClienteAC_Rechazo)
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
