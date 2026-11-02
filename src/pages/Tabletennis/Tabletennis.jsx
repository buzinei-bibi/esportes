import PaginaEsporte from "../../components/Esporte/PaginaEsporte";
import { EscudoTenisDeMesa } from "../../components/Escudos/Escudos";
import * as tenisDeMesa from "../../data/tenisDeMesa";

export default function Tabletennis() {
  return (
    <PaginaEsporte
      esporte={tenisDeMesa}
      escudo={EscudoTenisDeMesa}
      titulo="TÊNIS DE "
      destaque="MESA"
      cores={{ accent: "#818cf8", claro: "#a5b4fc", ceu: "#38bdf8", on: "#020617" }}
      // mesma ordem do handebol; só os nomes das seções mudam
      titulos={{
        ultimo: "último jogo",
        proximo: "próximo duelo",
        temporada: "números da temporada",
        resultados: "outros resultados",
        classificacao: "ranking",
        confrontos: "histórico de duelos",
        calendario: "agenda",
      }}
    />
  );
}
