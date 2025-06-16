import { XMLDialog } from "./Dialog/XMLDialog";
import { SendDialog } from "./Dialog/SendDialog";
import { LogDialog } from "./Dialog/LogDialog";

export function Actions({ archivo }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <XMLDialog archivo={archivo} />
      <SendDialog />
      <LogDialog />
    </div>
  );
}
