import PaginaEsporte from "../../components/Esporte/PaginaEsporte";
import { EscudoHandebol } from "../../components/Escudos/Escudos";
import * as handebol from "../../data/handebol";

export default function Handebol() {
  return (
    <PaginaEsporte
      esporte={handebol}
      escudo={EscudoHandebol}
      titulo="HANDE"
      destaque="BOL"
      cores={{ accent: "#2563eb", claro: "#60a5fa", ceu: "#38bdf8", on: "#fff" }}
    />
  );
}
