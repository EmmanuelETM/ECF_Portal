import { useRef, useEffect, useState } from "react";
import { ReceiptText, X, Download } from "lucide-react";
import { getXml } from "../../data/query";
import { formatXml, highlightXML } from "../../lib/utils";
import { downloadXml } from "../../lib/download";
import { Button } from "../Button";

export function XMLDialog({ archivo, view }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    if (open) {
      getXml(view, archivo)
        .then((file) => {
          setFile(file);
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
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold truncate">{archivo}</h2>
            <button
              className="text-gray-500 hover:text-black cursor-pointer"
              onClick={closeDialog}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto bg-stone-200 border text-left border-stone-400 rounded-md mx-4 mb-4">
            <pre
              className="whitespace-pre break-words font-mono text-sm sm:text-base"
              dangerouslySetInnerHTML={{
                __html: highlightXML(formatXml(file)),
              }}
            />
          </div>

          {file && (
            <div className="w-full flex justify-end p-2 pr-4 mb-2">
              <Button
                onClick={() => downloadXml({ title: archivo, doc: file })}
                Icon={Download}
                text={"Download Xml"}
              />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
