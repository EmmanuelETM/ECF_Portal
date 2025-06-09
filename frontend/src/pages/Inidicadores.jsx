import { Indicator } from "../components/Indicator";

export default function StartPage() {
  return (
    <div id="inicio">
      <div id="cantidad" className="flex flex-col gap-3">
        <h4 className="text-2xl font-semibold mb-2">Documentos procesados</h4>
        <div className="grid grid-cols-3 gap-2">
          <Indicator value={3} label={"Emitidos"} />
          <Indicator value={3} label={"Recibidos"} />
          <Indicator value={3} label={"Recibidos"} />
        </div>
      </div>

      <div id="montos" className="flex flex-col gap-3 mt-8">
        <h4 className="text-2xl font-semibold mb-2">Montos procesados</h4>
        <div className="grid grid-cols-3 gap-2">
          <Indicator value={"$1250.00"} label={"Monto Total"} />
          <Indicator value={"$225.00"} label={"ITBIS"} />
        </div>
      </div>
    </div>
  );
}
