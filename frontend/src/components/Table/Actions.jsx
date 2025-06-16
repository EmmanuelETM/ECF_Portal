import { FileChartColumn, ReceiptText, Send } from "lucide-react";
import { XMLDialog } from "./Dialog/XMLDialog";
import { SendDialog } from "./Dialog/SendDialog";
import { LogDialog } from "./Dialog/LogDialog";

export function Actions() {
  return (
    <div className="flex gap-1 items-center justify-between">
      <XMLDialog />
      <SendDialog />
      <LogDialog />
    </div>
  );
}
