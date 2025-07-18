import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { DialogTitle } from "../components/DialogTitle";
import { DialogBreadcrumb } from "../components/DialogBreadCrumb";

import {
  enviarClienteAC_Aceptacion,
  enviarClienteAC_Rechazo,
  enviarDGIIAC_Aceptacion,
  enviarDGIIAC_Rechazo,
} from "../../../api/envio";

import { consultarDGII } from "../../../api/consulta";

import { Menu } from "./components/Menu";
import { Aprobacion } from "./components/Aprobacion";
import { DGIITab } from "./components/DGII";
import { DGIIRechazo } from "./components/DGIIRechazo";
import { ClienteTab } from "./components/Cliente";
import { ClienteRechazo } from "./components/ClienteRechazo";

export function SendDialog({ archivo, view }) {
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
      clienteRechazo: "Rechazo",
      dgii: "DGII",
      dgiiRechazo: "Rechazo",
    };
    return names[page] || page;
  };

  const handleConsultar = () => {
    const ecf = archivo.replace(/\.xml$/, "");
    let tipo;

    if (view === "emision") tipo = "emitidos";
    else tipo = "recibidos";

    consultarDGII(ecf, tipo);
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

          <div className="flex-1 p-4 overflow-auto rounded-md mx-2 mb-4">
            {currentPage === "menu" && (
              <Menu handleConsultar={handleConsultar} goTo={goTo} />
            )}

            {currentPage === "aprobacion" && <Aprobacion goTo={goTo} />}

            {currentPage === "dgii" && (
              <DGIITab handleDgiiAceptar={handleDgiiAceptar} goTo={goTo} />
            )}

            {currentPage === "dgiiRechazo" && (
              <DGIIRechazo
                handleDgiiRechazo={handleDgiiRechazo}
                handleSubmit={handleSubmit}
                setShow={setShow}
                show={show}
              />
            )}

            {currentPage === "cliente" && (
              <ClienteTab
                handleClienteAceptar={handleClienteAceptar}
                goTo={goTo}
              />
            )}

            {currentPage === "clienteRechazo" && (
              <ClienteRechazo
                handleClienteRechazo={handleClienteRechazo}
                handleSubmit={handleSubmit}
                setShow={setShow}
                show={show}
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
