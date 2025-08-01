import { XMLDialog } from "../Dialog/XMLDialog";
import { SendDialog } from "../Dialog//SendDialog/SendDialog";
import { LogDialog } from "../Dialog/LogDialog";

export function Actions({ view, archivo }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <XMLDialog archivo={archivo} view={view} />
      <SendDialog archivo={archivo} view={view} />
      <LogDialog archivo={archivo} />
    </div>
  );
}
