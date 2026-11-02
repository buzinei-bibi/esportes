import PaginaEsporte from "../../components/Esporte/PaginaEsporte";
import { EscudoVolei } from "../../components/Escudos/Escudos";
import * as volei from "../../data/volei";

export default function Volleyball() {
  return (
    <PaginaEsporte
      esporte={volei}
      escudo={EscudoVolei}
      titulo="VÔ"
      destaque="LEI"
      cores={{ accent: "#38bdf8", claro: "#7dd3fc", ceu: "#a5b4fc", on: "#020617" }}
      // mesma ordem do handebol; só os nomes das seções mudam
      titulos={{
        ultimo: "última partida",
        proximo: "próxima partida",
        temporada: "a temporada",
        resultados: "partidas anteriores",
        classificacao: "tabela",
        confrontos: "frente a frente",
        calendario: "agenda da temporada",
      }}
    />
  );
}
