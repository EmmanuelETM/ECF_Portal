import { useRef, useEffect, useState } from "react";
import { ReceiptText, Download, FileText } from "lucide-react";
import { showPDF, showXml } from "../../lib/files";
import { formatXml, highlightXML } from "../../lib/utils";
import { download } from "../../lib/download";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { DialogTitle } from "./DialogTitle";

export function XMLDialog({ archivo, view }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      showXml(archivo, view)
        .then((file) => {
          setFile(file);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [open, archivo, view]);

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
        className="cursor-pointer p-2 rounded-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
        onClick={openDialog}
      >
        <ReceiptText size={20} />
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
              <Loading text={"xml"} />
            </div>
          ) : (
            <>
              <div className="flex-1 p-4 overflow-auto bg-stone-200 border text-left border-stone-400 rounded-md mx-4 mb-4">
                <pre
                  className="whitespace-pre break-words font-mono text-sm sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: highlightXML(formatXml(file)),
                  }}
                />
              </div>
              {file && (
                <div className="w-full flex justify-end p-2 pr-4 mb-2 gap-2">
                  <Button
                    onClick={() => download({ title: archivo, doc: file })}
                    Icon={Download}
                    text={"Descargar"}
                  />
                  <Button
                    onClick={() => showPDF(archivo, view)}
                    Icon={FileText}
                    text={"PDF"}
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
