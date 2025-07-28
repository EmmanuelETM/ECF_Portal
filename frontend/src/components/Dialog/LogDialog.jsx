import { useRef, useState, useEffect } from "react";
import { useFetch } from "../../hooks/use-fetch";
import { File } from "lucide-react";
import { Download } from "lucide-react";
import { DialogTitle } from "./components/DialogTitle";
import { Loading } from "../Loading";
import { Button } from "../Button";
import { download } from "../../lib/download";
import { ErrorMessage } from "../Error";

export function LogDialog({ archivo }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const authFetch = useFetch();

  useEffect(() => {
    if (!open) return;

    const fetchLogs = async () => {
      setLoading(true);
      setError(false);

      try {
        const name = archivo.replace(/\.xml$/, ".log");
        const filePath = `/respuestas/ecf/${name}`;

        const response = await authFetch(filePath);
        if (!response.ok) throw new Error("Archivo no Encontrado");

        const txt = await response.text();
        setFile(txt);
        setError(false);
      } catch (err) {
        console.error("Error fetching logs: ", err);
        setError(true);
        setFile("");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [open, archivo, authFetch]);

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
        className="cursor-pointer p-2 rounded-lg text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white"
        onClick={openDialog}
      >
        <File size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg w-[90%] max-w-5xl h-[80vh] backdrop:backdrop-blur-sm border p-0"
        style={{ inset: 0, margin: "auto" }}
        onClose={closeDialog}
      >
        <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
          <DialogTitle title={archivo} closeDialog={closeDialog} />

          {loading ? (
            <div className="flex flex-1 items-center justify-center bg-white">
              <Loading text={"Logs"} />
            </div>
          ) : error ? (
            <ErrorMessage message="No se encontró el Log" />
          ) : (
            <>
              <div className="flex-1 p-4 overflow-auto bg-stone-200 border text-left border-stone-400 rounded-md mx-4 mb-4">
                <pre className="whitespace-pre break-words font-mono text-sm sm:text-sm">
                  {file}
                </pre>
              </div>

              {file && (
                <div className="w-full flex justify-end p-2 pr-4 mb-2 gap-2">
                  <Button
                    onClick={() => download({ title: archivo, doc: file })}
                    Icon={Download}
                    text={"Descargar"}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
