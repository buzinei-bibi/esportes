import { useState, useMemo } from "react";
import Button from "../../components/Button/Button";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  Clock,
  Ticket,
  Trophy,
  Filter,
  Swords,
  ListChecks,
  ChevronDown,
  Mars,
  Venus,
  DoorOpen,
} from "lucide-react";

const CATEGORIAS = [
  {
    id: "masc-adulto",
    label: "masculino profissional",
    curto: "masc.",
    genero: "mars",
    gradient: "from-blue-600 to-slate-700",
    ring: "ring-blue-400/50",
    text: "text-blue-300",
    glow: "shadow-blue-500/30",
    competicoes: [
      "TMB ESTADUAL PAULISTA",
      "CAMPEONATO BRASILEIRO (TMB CHALLENGE PLUS)",
      "CAMPEONATO BRASILEIRO (TMB PLATINUM)",
      "JOGOS REGIONAIS",
      "JOGOS ABERTOS DO INTERIOR",
      "LIGA VALE PARAIBANA DE TÊNIS DE MESA",
    ],
  },
  {
    id: "fem-adulto",
    label: "feminino profissional",
    curto: "fem.",
    genero: "venus",
    gradient: "from-pink-600 to-rose-700",
    ring: "ring-pink-400/50",
    text: "text-pink-300",
    glow: "shadow-pink-500/30",
    competicoes: [
      "TMB ESTADUAL PAULISTA",
      "CAMPEONATO BRASILEIRO (TMB CHALLENGE PLUS)",
      "CAMPEONATO BRASILEIRO (TMB PLATINUM)",
      "JOGOS REGIONAIS",
      "JOGOS ABERTOS DO INTERIOR",
      "LIGA VALE PARAIBANA DE TÊNIS DE MESA",
    ],
  },
];

const SECTION_STYLES = {
  resultados: "text-amber-300",
  proximos: "text-emerald-300",
  classificacao: "text-sky-300",
  calendario: "text-violet-300",
  confrontos: "text-rose-300",
};

const TIME_CASA = "TÊNIS DE MESA TAUBATÉ";

const DADOS = {
  "masc-adulto": {
    competicoesDisputadas: [
      { nome: "TMB ESTADUAL PAULISTA" },
      { nome: "CAMPEONATO BRASILEIRO (TMB CHALLENGE PLUS)" },
      { nome: "CAMPEONATO BRASILEIRO (TMB PLATINUM)" },
      { nome: "JOGOS REGIONAIS" },
      { nome: "JOGOS ABERTOS DO INTERIOR" },
      { nome: "LIGA VALE PARAIBANA DE TÊNIS DE MESA" },
    ],
    resultados: [
      {
        id: 101,
        competicao: "TMB ESTADUAL PAULISTA",
        data: "22/07/2026",
        mandante: "TÊNIS DE MESA TAUBATÉ",
        visitante: "MOGI MIRIM TM",
        setsMandante: "3",
        setsVisitante: "1",
        parciais: ["11-8", "9-11", "11-7", "11-9"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
      {
        id: 102,
        competicao: "CAMPEONATO BRASILEIRO (TMB PLATINUM)",
        data: "16/07/2026",
        mandante: "SOROCABA TM",
        visitante: "TÊNIS DE MESA TAUBATÉ",
        setsMandante: "3",
        setsVisitante: "2",
        parciais: ["11-6", "8-11", "11-9", "9-11", "11-7"],
        local: "ginásio municipal, sorocaba",
        resultado: "D",
      },
      {
        id: 103,
        competicao: "JOGOS REGIONAIS",
        data: "05/05/2026",
        mandante: "TÊNIS DE MESA TAUBATÉ",
        visitante: "ASSIS TM",
        setsMandante: "3",
        setsVisitante: "1",
        parciais: ["11-9", "11-7", "9-11", "11-6"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
      {
        id: 104,
        competicao: "LIGA VALE PARAIBANA DE TÊNIS DE MESA",
        data: "10/03/2026",
        mandante: "MOGI MIRIM TM",
        visitante: "TÊNIS DE MESA TAUBATÉ",
        setsMandante: "2",
        setsVisitante: "3",
        parciais: ["9-11", "11-8", "8-11", "11-9", "7-11"],
        local: "ginásio municipal, mogi mirim",
        resultado: "V",
      },
    ],
    proximosJogos: [
      {
        id: 7,
        competicao: "TMB ESTADUAL PAULISTA",
        data: "05/08/2026",
        hora: "19h30",
        local: "ginásio taubatinha, taubaté",
        adversario: "PIRACICABA TM",
        mandante: true,
        entradaLivre: false,
      },
      {
        id: 8,
        competicao: "LIGA VALE PARAIBANA DE TÊNIS DE MESA",
        data: "12/08/2026",
        hora: "20h00",
        local: "ginásio municipal, jundiaí",
        adversario: "JUNDIAÍ TM",
        mandante: false,
        entradaLivre: true,
      },
    ],
    classificacao: {
      "TMB ESTADUAL PAULISTA": [
        { pos: 1, time: "TÊNIS DE MESA TAUBATÉ", j: 10, v: 9, d: 1, sets: "26-8", pts: 27, taubate: true },
        { pos: 2, time: "SOROCABA TM", j: 10, v: 8, d: 2, sets: "24-11", pts: 24, taubate: false },
        { pos: 3, time: "MOGI MIRIM TM", j: 10, v: 6, d: 4, sets: "20-15", pts: 18, taubate: false },
        { pos: 4, time: "PIRACICABA TM", j: 10, v: 5, d: 5, sets: "18-18", pts: 15, taubate: false },
        { pos: 5, time: "ITU MESA TÊNIS", j: 10, v: 3, d: 7, sets: "14-22", pts: 9, taubate: false },
        { pos: 6, time: "ASSIS TM", j: 10, v: 1, d: 9, sets: "10-26", pts: 3, taubate: false },
      ],
      "CAMPEONATO BRASILEIRO (TMB CHALLENGE PLUS)": [
        { pos: 1, time: "SOROCABA TM", j: 8, v: 7, d: 1, sets: "22-9", pts: 21, taubate: false },
        { pos: 2, time: "TÊNIS DE MESA TAUBATÉ", j: 8, v: 6, d: 2, sets: "20-11", pts: 18, taubate: true },
        { pos: 3, time: "PIRACICABA TM", j: 8, v: 4, d: 4, sets: "15-15", pts: 12, taubate: false },
        { pos: 4, time: "MOGI MIRIM TM", j: 8, v: 2, d: 6, sets: "10-20", pts: 6, taubate: false },
        { pos: 5, time: "ASSIS TM", j: 8, v: 1, d: 7, sets: "7-23", pts: 3, taubate: false },
      ],
      "CAMPEONATO BRASILEIRO (TMB PLATINUM)": [
        { pos: 1, time: "TÊNIS DE MESA TAUBATÉ", j: 6, v: 5, d: 1, sets: "16-6", pts: 15, taubate: true },
        { pos: 2, time: "SOROCABA TM", j: 6, v: 4, d: 2, sets: "14-9", pts: 12, taubate: false },
        { pos: 3, time: "ITU MESA TÊNIS", j: 6, v: 2, d: 4, sets: "8-14", pts: 6, taubate: false },
        { pos: 4, time: "MOGI MIRIM TM", j: 6, v: 1, d: 5, sets: "6-15", pts: 3, taubate: false },
      ],
      "JOGOS REGIONAIS": [
        { pos: 1, time: "TÊNIS DE MESA TAUBATÉ", j: 7, v: 6, d: 1, sets: "19-8", pts: 18, taubate: true },
        { pos: 2, time: "ASSIS TM", j: 7, v: 5, d: 2, sets: "17-10", pts: 15, taubate: false },
        { pos: 3, time: "PIRACICABA TM", j: 7, v: 3, d: 4, sets: "12-15", pts: 9, taubate: false },
        { pos: 4, time: "MOGI MIRIM TM", j: 7, v: 2, d: 5, sets: "10-17", pts: 6, taubate: false },
        { pos: 5, time: "ITU MESA TÊNIS", j: 7, v: 0, d: 7, sets: "4-22", pts: 0, taubate: false },
      ],
      "JOGOS ABERTOS DO INTERIOR": null,
      "LIGA VALE PARAIBANA DE TÊNIS DE MESA": null,
    },
    calendario: [
      { id: 10, data: "22/07/2026", competicao: "TMB ESTADUAL PAULISTA", confronto: "TÊNIS DE MESA TAUBATÉ x MOGI MIRIM TM", local: "taubaté", status: "encerrado", resultado: "V" },
      { id: 11, data: "05/08/2026", competicao: "TMB ESTADUAL PAULISTA", confronto: "TÊNIS DE MESA TAUBATÉ x PIRACICABA TM", local: "taubaté", status: "agendado", ingresso: true },
      { id: 12, data: "12/08/2026", competicao: "LIGA VALE PARAIBANA DE TÊNIS DE MESA", confronto: "JUNDIAÍ TM x TÊNIS DE MESA TAUBATÉ", local: "jundiaí", status: "agendado", ingresso: false },
    ],
    confrontos: [
      {
        adversario: "MOGI MIRIM TM",
        vitorias: 6,
        derrotas: 2,
        historico: [
          { competicao: "TMB ESTADUAL PAULISTA", data: "22/07/2026", placar: "3-1", resultado: "V" },
          { competicao: "LIGA VALE PARAIBANA", data: "10/03/2026", placar: "3-2", resultado: "V" },
          { competicao: "TMB ESTADUAL PAULISTA", data: "14/11/2025", placar: "1-3", resultado: "D" },
        ],
      },
      {
        adversario: "SOROCABA TM",
        vitorias: 4,
        derrotas: 5,
        historico: [
          { competicao: "CAMPEONATO BRASILEIRO", data: "16/07/2026", placar: "2-3", resultado: "D" },
          { competicao: "TMB ESTADUAL PAULISTA", data: "20/02/2026", placar: "3-1", resultado: "V" },
        ],
      },
      {
        adversario: "PIRACICABA TM",
        vitorias: 5,
        derrotas: 1,
        historico: [
          { competicao: "TMB ESTADUAL PAULISTA", data: "12/01/2026", placar: "3-0", resultado: "V" },
        ],
      },
      {
        adversario: "ITU MESA TÊNIS",
        vitorias: 7,
        derrotas: 3,
        historico: [
          { competicao: "TMB ESTADUAL PAULISTA", data: "08/07/2026", placar: "3-0", resultado: "V" },
        ],
      },
      {
        adversario: "ASSIS TM",
        vitorias: 3,
        derrotas: 2,
        historico: [
          { competicao: "JOGOS REGIONAIS", data: "05/05/2026", placar: "3-1", resultado: "V" },
        ],
      },
    ],
  },

  "fem-adulto": {
    competicoesDisputadas: [
      { nome: "TMB ESTADUAL PAULISTA" },
      { nome: "CAMPEONATO BRASILEIRO (TMB CHALLENGE PLUS)" },
      { nome: "CAMPEONATO BRASILEIRO (TMB PLATINUM)" },
      { nome: "JOGOS REGIONAIS" },
      { nome: "JOGOS ABERTOS DO INTERIOR" },
      { nome: "LIGA VALE PARAIBANA DE TÊNIS DE MESA" },
    ],
    resultados: [
      {
        id: 111,
        competicao: "JOGOS REGIONAIS",
        data: "08/07/2026",
        mandante: "TÊNIS DE MESA TAUBATÉ",
        visitante: "ITU MESA TÊNIS",
        setsMandante: "3",
        setsVisitante: "0",
        parciais: ["11-6", "11-8", "11-9"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
      {
        id: 112,
        competicao: "TMB ESTADUAL PAULISTA",
        data: "18/07/2026",
        mandante: "SOROCABA TM",
        visitante: "TÊNIS DE MESA TAUBATÉ",
        setsMandante: "3",
        setsVisitante: "1",
        parciais: ["11-7", "11-9", "8-11", "11-6"],
        local: "ginásio municipal, sorocaba",
        resultado: "D",
      },
      {
        id: 113,
        competicao: "LIGA VALE PARAIBANA DE TÊNIS DE MESA",
        data: "14/07/2026",
        mandante: "TÊNIS DE MESA TAUBATÉ",
        visitante: "JUNDIAÍ TM",
        setsMandante: "3",
        setsVisitante: "2",
        parciais: ["11-9", "9-11", "11-6", "8-11", "11-8"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
      {
        id: 114,
        competicao: "TMB ESTADUAL PAULISTA",
        data: "02/02/2026",
        mandante: "TÊNIS DE MESA TAUBATÉ",
        visitante: "ITU MESA TÊNIS",
        setsMandante: "3",
        setsVisitante: "1",
        parciais: ["11-8", "9-11", "11-7", "11-6"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
    ],
    proximosJogos: [
      {
        id: 15,
        competicao: "CAMPEONATO BRASILEIRO (TMB PLATINUM)",
        data: "09/08/2026",
        hora: "18h00",
        local: "ginásio taubatinha, taubaté",
        adversario: "SOROCABA TM",
        mandante: true,
        entradaLivre: false,
      },
      {
        id: 16,
        competicao: "LIGA VALE PARAIBANA DE TÊNIS DE MESA",
        data: "22/08/2026",
        hora: "19h00",
        local: "ginásio taubatinha, taubaté",
        adversario: "ITU MESA TÊNIS",
        mandante: true,
        entradaLivre: true,
      },
    ],
    classificacao: {
      "TMB ESTADUAL PAULISTA": [
        { pos: 1, time: "SOROCABA TM", j: 8, v: 7, d: 1, sets: "20-8", pts: 21, taubate: false },
        { pos: 2, time: "TÊNIS DE MESA TAUBATÉ", j: 8, v: 6, d: 2, sets: "18-10", pts: 18, taubate: true },
        { pos: 3, time: "ITU MESA TÊNIS", j: 8, v: 4, d: 4, sets: "14-14", pts: 12, taubate: false },
        { pos: 4, time: "RIBEIRÃO PRETO TM", j: 8, v: 2, d: 6, sets: "9-18", pts: 6, taubate: false },
        { pos: 5, time: "JUNDIAÍ TM", j: 8, v: 1, d: 7, sets: "6-20", pts: 3, taubate: false },
      ],
      "CAMPEONATO BRASILEIRO (TMB CHALLENGE PLUS)": [
        { pos: 1, time: "TÊNIS DE MESA TAUBATÉ", j: 6, v: 5, d: 1, sets: "15-7", pts: 15, taubate: true },
        { pos: 2, time: "SOROCABA TM", j: 6, v: 4, d: 2, sets: "13-9", pts: 12, taubate: false },
        { pos: 3, time: "RIBEIRÃO PRETO TM", j: 6, v: 2, d: 4, sets: "8-13", pts: 6, taubate: false },
        { pos: 4, time: "ITU MESA TÊNIS", j: 6, v: 1, d: 5, sets: "6-15", pts: 3, taubate: false },
      ],
      "CAMPEONATO BRASILEIRO (TMB PLATINUM)": [
        { pos: 1, time: "SOROCABA TM", j: 5, v: 4, d: 1, sets: "12-6", pts: 12, taubate: false },
        { pos: 2, time: "TÊNIS DE MESA TAUBATÉ", j: 5, v: 3, d: 2, sets: "10-8", pts: 9, taubate: true },
        { pos: 3, time: "JUNDIAÍ TM", j: 5, v: 1, d: 4, sets: "5-11", pts: 3, taubate: false },
      ],
      "JOGOS REGIONAIS": [
        { pos: 1, time: "TÊNIS DE MESA TAUBATÉ", j: 6, v: 5, d: 1, sets: "15-6", pts: 15, taubate: true },
        { pos: 2, time: "ITU MESA TÊNIS", j: 6, v: 3, d: 3, sets: "11-11", pts: 9, taubate: false },
        { pos: 3, time: "RIBEIRÃO PRETO TM", j: 6, v: 2, d: 4, sets: "8-13", pts: 6, taubate: false },
        { pos: 4, time: "JUNDIAÍ TM", j: 6, v: 1, d: 5, sets: "6-14", pts: 3, taubate: false },
      ],
      "JOGOS ABERTOS DO INTERIOR": null,
      "LIGA VALE PARAIBANA DE TÊNIS DE MESA": null,
    },
    calendario: [
      { id: 22, data: "08/07/2026", competicao: "JOGOS REGIONAIS", confronto: "TÊNIS DE MESA TAUBATÉ x ITU MESA TÊNIS", local: "Taubaté", status: "encerrado", resultado: "V" },
      { id: 23, data: "09/08/2026", competicao: "CAMPEONATO BRASILEIRO (TMB PLATINUM)", confronto: "TÊNIS DE MESA TAUBATÉ x SOROCABA TM", local: "taubaté", status: "agendado", ingresso: true },
      { id: 24, data: "22/08/2026", competicao: "LIGA VALE PARAIBANA DE TÊNIS DE MESA", confronto: "TÊNIS DE MESA TAUBATÉ x ITU MESA TÊNIS", local: "Taubaté", status: "agendado", ingresso: false },
    ],
    confrontos: [
      {
        adversario: "ITU MESA TÊNIS",
        vitorias: 5,
        derrotas: 1,
        historico: [
          { competicao: "JOGOS REGIONAIS", data: "08/07/2026", placar: "3-0", resultado: "V" },
          { competicao: "TMB ESTADUAL PAULISTA", data: "02/02/2026", placar: "3-1", resultado: "V" },
        ],
      },
      {
        adversario: "SOROCABA TM",
        vitorias: 3,
        derrotas: 4,
        historico: [
          { competicao: "TMB ESTADUAL PAULISTA", data: "18/07/2026", placar: "1-3", resultado: "D" },
        ],
      },
      {
        adversario: "RIBEIRÃO PRETO TM",
        vitorias: 4,
        derrotas: 2,
        historico: [
          { competicao: "LIGA VALE PARAIBANA", data: "22/03/2026", placar: "3-2", resultado: "V" },
        ],
      },
      {
        adversario: "JUNDIAÍ TM",
        vitorias: 3,
        derrotas: 2,
        historico: [
          { competicao: "LIGA VALE PARAIBANA", data: "14/07/2026", placar: "3-2", resultado: "V" },
        ],
      },
    ],
  },
};

function IconeGenero({ genero, size = 12, className = "" }) {
  const Icone = genero === "venus" ? Venus : Mars;
  return <Icone size={size} className={className} />;
}

function ResultadoBadge({ resultado }) {
  const vitoria = resultado === "V";
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-black uppercase shrink-0 ${
        vitoria
          ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40"
          : "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
      }`}
    >
      {resultado}
    </span>
  );
}

function CardResultado({ jogo }) {
  const [aberto, setAberto] = useState(false);
  const vitoria = jogo.resultado === "V";
  return (
    <button
      onClick={() => setAberto((a) => !a)}
      className={`w-full text-left rounded-lg border-l-2 bg-white/4 hover:bg-white/8 transition-all duration-150 p-3 sm:p-4 ring-1 ring-white/10 hover:ring-white/20 ${
        vitoria ? "border-l-emerald-500" : "border-l-red-500"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <span className="uppercase text-[10px] font-bold tracking-widest text-amber-300/90 truncate">
          {jogo.competicao}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="uppercase text-[10px] font-bold tracking-wide text-slate-500">{jogo.data}</span>
          <ResultadoBadge resultado={jogo.resultado} />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span
            className={`uppercase flex-1 truncate font-bold text-xs sm:text-sm ${
              jogo.mandante === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {jogo.mandante}
          </span>
          <span className="uppercase font-black tabular-nums text-base sm:text-lg text-white shrink-0 w-7 text-center">
            {jogo.setsMandante}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span
            className={`uppercase flex-1 truncate font-bold text-xs sm:text-sm ${
              jogo.visitante === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {jogo.visitante}
          </span>
          <span className="uppercase font-black tabular-nums text-base sm:text-lg text-white shrink-0 w-7 text-center">
            {jogo.setsVisitante}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10">
        <span className="uppercase text-[10px] font-semibold tracking-wide text-slate-500 truncate flex items-center gap-1">
          <MapPin size={11} className="shrink-0" /> {jogo.local}
        </span>
        <span className="uppercase inline-flex items-center gap-1 text-[10px] font-bold tracking-wide text-slate-400 shrink-0">
          {aberto ? "ocultar detalhes" : "ver detalhes"}
          <ChevronDown
            size={15}
            className={`text-slate-500 shrink-0 transition-transform duration-150 ${aberto ? "rotate-180" : ""}`}
          />
        </span>
      </div>

      {aberto && (
        <div className="mt-2.5 pt-2.5 border-t border-white/10">
          <p className="uppercase text-[10px] font-bold tracking-widest text-slate-500 mb-1.5">parciais por set</p>
          <div className="flex flex-wrap gap-1.5">
            {jogo.parciais.map((set, i) => (
              <span
                key={i}
                className="uppercase text-[11px] font-bold tabular-nums bg-white/5 ring-1 ring-white/10 rounded-md px-2 py-1 text-slate-100"
              >
                {set}
              </span>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

function CardProximoJogo({ jogo }) {
  const mandanteNome = jogo.mandante ? TIME_CASA : jogo.adversario;
  const visitanteNome = jogo.mandante ? jogo.adversario : TIME_CASA;
  return (
    <div className="w-full text-left rounded-lg border-l-2 border-l-emerald-400 bg-white/4 hover:bg-white/8 transition-all duration-150 p-3 sm:p-4 ring-1 ring-white/10 hover:ring-white/20">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <span className="uppercase text-[10px] font-bold tracking-widest text-emerald-300/90 truncate">
          {jogo.competicao}
        </span>
        {jogo.entradaLivre ? (
          <span className="uppercase inline-flex items-center gap-1 text-[10px] font-black text-emerald-300 bg-emerald-400/10 ring-1 ring-emerald-400/30 rounded-md px-2 py-0.5 shrink-0">
            <DoorOpen size={11} /> entrada livre
          </span>
        ) : (
          <span className="uppercase inline-flex items-center gap-1 text-[10px] font-black text-amber-300 bg-amber-400/10 ring-1 ring-amber-400/30 rounded-md px-2 py-0.5 shrink-0">
            <Ticket size={11} /> ingresso
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span
            className={`uppercase flex-1 truncate font-bold text-xs sm:text-sm ${
              mandanteNome === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {mandanteNome}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span
            className={`uppercase flex-1 truncate font-bold text-xs sm:text-sm ${
              visitanteNome === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {visitanteNome}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 pt-2 border-t border-white/10 uppercase text-[10px] font-semibold tracking-wide text-slate-500">
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={11} /> {jogo.data}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={11} /> {jogo.hora}
        </span>
        <span className="inline-flex items-center gap-1 min-w-0">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate">{jogo.local}</span>
        </span>
      </div>
    </div>
  );
}

function Switcher({ itens, indice, setIndice, label, grande = false }) {
  const total = itens.length;
  return (
    <div className="flex items-center justify-between gap-2 mb-3.5">
      <button
        aria-label="anterior"
        onClick={() => setIndice((i) => (i - 1 + total) % total)}
        className={`rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-colors shrink-0 ${
          grande ? "p-2" : "p-1.5"
        }`}
      >
        <ChevronLeft size={grande ? 18 : 16} className="text-white" />
      </button>

      <div className="flex-1 text-center min-w-0">
        {label && (
          <p className="uppercase text-[9px] font-bold tracking-widest text-slate-500 mb-0.5">{label}</p>
        )}
        <p
          className={`uppercase font-black text-white truncate px-1 ${
            grande ? "text-sm sm:text-base" : "text-xs sm:text-sm"
          }`}
        >
          {itens[indice]}
        </p>
        <p className="uppercase text-[10px] font-semibold tracking-wide text-slate-500">
          {indice + 1} de {total}
        </p>
      </div>

      <button
        aria-label="próximo"
        onClick={() => setIndice((i) => (i + 1) % total)}
        className={`rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-colors shrink-0 ${
          grande ? "p-2" : "p-1.5"
        }`}
      >
        <ChevronRight size={grande ? 18 : 16} className="text-white" />
      </button>
    </div>
  );
}

function TabelaClassificacao({ linhas }) {
  if (!linhas) {
    return (
      <div className="text-center py-9 px-4 rounded-lg bg-white/3 ring-1 ring-white/10">
        <Trophy className="mx-auto mb-2 text-slate-500" size={24} />
        <p className="uppercase text-[11px] font-bold tracking-wide text-slate-400 leading-relaxed">
          classificação ainda não disponível
          <br />
          equipe aguardando classificação
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg ring-1 ring-white/10">
      <table className="w-full text-xs min-w-110">
        <thead>
          <tr className="uppercase text-[10px] font-bold tracking-widest text-slate-500 bg-white/4">
            <th className="text-left py-2 px-2.5">#</th>
            <th className="text-left py-2 px-2.5">time</th>
            <th className="text-center py-2 px-1.5">J</th>
            <th className="text-center py-2 px-1.5">V</th>
            <th className="text-center py-2 px-1.5">D</th>
            <th className="text-center py-2 px-1.5">sets</th>
            <th className="text-center py-2 px-2.5">pts</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr
              key={l.pos}
              className={`border-t border-white/5 ${
                l.taubate ? "bg-sky-500/10" : "hover:bg-white/3"
              } transition-colors`}
            >
              <td className="py-2 px-2.5 font-black text-slate-400 tabular-nums">{l.pos}</td>
              <td className="py-2 px-2.5">
                <span
                  className={`uppercase truncate font-bold text-[11px] sm:text-xs ${
                    l.taubate ? "text-white" : "text-slate-300"
                  }`}
                >
                  {l.time}
                </span>
              </td>
              <td className="py-2 px-1.5 text-center text-slate-400 tabular-nums font-semibold">{l.j}</td>
              <td className="py-2 px-1.5 text-center text-emerald-400 font-black tabular-nums">{l.v}</td>
              <td className="py-2 px-1.5 text-center text-red-400 font-black tabular-nums">{l.d}</td>
              <td className="py-2 px-1.5 text-center text-slate-400 tabular-nums font-semibold">{l.sets}</td>
              <td className="py-2 px-2.5 text-center font-black text-white tabular-nums">{l.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinhaCalendario({ jogo }) {
  const encerrado = jogo.status === "encerrado";
  const vitoria = jogo.resultado === "V";
  return (
    <div
      className={`flex items-center gap-2 rounded-lg ring-1 ring-white/10 bg-white/3 hover:bg-white/6 hover:ring-white/20 hover:shadow-md hover:shadow-black/20 transition-all duration-200 px-2.5 sm:px-3 py-2 border-l-2 w-full ${
        encerrado ? (vitoria ? "border-l-emerald-500" : "border-l-red-500") : "border-l-violet-400"
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="uppercase text-[9px] font-bold tracking-widest text-violet-300/80 truncate">
          {jogo.competicao}
        </p>
        <p className="uppercase text-[11px] sm:text-xs font-bold text-slate-100 truncate flex items-baseline gap-1.5">
          <span className="text-white tabular-nums shrink-0">{jogo.data}</span>
          <span className="truncate">{jogo.confronto}</span>
        </p>
        <p className="uppercase text-[9px] font-semibold tracking-wide text-slate-500 truncate inline-flex items-center gap-1 mt-0.5">
          <MapPin size={9} className="shrink-0" /> {jogo.local}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
        {jogo.ingresso && (
          <Ticket size={11} className="text-amber-300 shrink-0" />
        )}
        {!encerrado && (
          <span className="uppercase text-[9px] font-black tracking-wide text-violet-300 bg-violet-400/10 ring-1 ring-violet-400/30 rounded-md px-1.5 py-0.5 whitespace-nowrap">
            agendado
          </span>
        )}
      </div>
    </div>
  );
}

export default function Tabletennis() {
  const [categoria, setCategoria] = useState("masc-adulto");
  const [standingsIndex, setStandingsIndex] = useState(0);
  const [calFiltro, setCalFiltro] = useState("todos");
  const [confrontoIndex, setConfrontoIndex] = useState(0);

  const dados = DADOS[categoria];
  const nomesCompeticoes = dados.competicoesDisputadas.map((c) => c.nome);

  const categoriaIndex = CATEGORIAS.findIndex((c) => c.id === categoria);
  const catAtual = CATEGORIAS[categoriaIndex];

  function mudarCategoria(delta) {
    const novoIndex = (categoriaIndex + delta + CATEGORIAS.length) % CATEGORIAS.length;
    const nova = CATEGORIAS[novoIndex];
    setCategoria(nova.id);
    setStandingsIndex(0);
    setCalFiltro("todos");
    setConfrontoIndex(0);
  }

  const calendarioFiltrado = useMemo(() => {
    if (calFiltro === "todos") return dados.calendario;
    return dados.calendario.filter((j) => j.competicao === calFiltro);
  }, [dados, calFiltro]);

  return (
    <>
      <style>{`
        @keyframes categoriaFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="w-full px-4 sm:px-6 lg:px-10 pb-20 text-white uppercase bg-linear-to-r from-slate-950 via-blue-950 to-slate-900">
        <div className="sticky top-2 z-20 inline-flex items-center gap-0.5 bg-slate-950/85 backdrop-blur-md ring-1 ring-white/15 rounded-full p-0.5 shadow-lg shadow-black/30 mt-2.5 mb-1">
          <button
            aria-label="categoria anterior"
            onClick={() => mudarCategoria(-1)}
            className="rounded-full hover:bg-white/10 transition-colors shrink-0 p-1"
          >
            <ChevronLeft size={12} className="text-white" />
          </button>

          <div
            key={catAtual.id}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wide bg-linear-to-r ${catAtual.gradient} text-white shadow-md ${catAtual.glow} ring-1 ring-white/30 transition-all duration-300 animate-[categoriaFadeIn_0.25s_ease-out]`}
          >
            <IconeGenero genero={catAtual.genero} size={12} className="text-white shrink-0" />
            <span className="hidden sm:inline truncate">{catAtual.label}</span>
            <span className="sm:hidden truncate">{catAtual.curto}</span>
          </div>

          <button
            aria-label="próxima categoria"
            onClick={() => mudarCategoria(1)}
            className="rounded-full hover:bg-white/10 transition-colors shrink-0 p-1"
          >
            <ChevronRight size={12} className="text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 pt-5 sm:pt-6">
          {/* ===== COLUNA PRINCIPAL (2/3) ===== */}
          <div className="lg:col-span-2 flex flex-col gap-8 sm:gap-10">
            {/* PRÓXIMOS JOGOS */}
            <section className="scroll-mt-28">
              <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide mb-3 ${SECTION_STYLES.proximos}`}>
                <CalendarDays size={17} /> próximos jogos
              </h2>
              {dados.proximosJogos.length === 0 ? (
                <p className="uppercase text-xs font-bold tracking-wide text-slate-500 text-center py-7">
                  nenhum jogo agendado nesta categoria no momento
                </p>
              ) : (
                <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                  {dados.proximosJogos.map((j) => (
                    <CardProximoJogo key={j.id} jogo={j} />
                  ))}
                </div>
              )}
            </section>

            {/* RESULTADOS */}
            <section className="scroll-mt-28">
              <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide mb-3 ${SECTION_STYLES.resultados}`}>
                <Trophy size={17} /> resultados dos jogos
              </h2>
              {dados.resultados.length === 0 ? (
                <p className="uppercase text-xs font-bold tracking-wide text-slate-500 text-center py-7">
                  ainda não há resultados registrados nesta categoria
                </p>
              ) : (
                <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                  {dados.resultados.map((r) => (
                    <CardResultado key={r.id} jogo={r} />
                  ))}
                </div>
              )}
            </section>

            {/* CALENDÁRIO COMPLETO */}
            <section className="scroll-mt-28">
              <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide ${SECTION_STYLES.calendario}`}>
                  <CalendarDays size={17} /> calendário completo
                </h2>
                <div className="relative">
                  <select
                    value={calFiltro}
                    onChange={(e) => setCalFiltro(e.target.value)}
                    className="uppercase appearance-none pl-7 pr-7 py-1.5 rounded-md bg-white/5 ring-1 ring-white/15 text-[11px] sm:text-xs font-bold text-white focus:outline-none focus:ring-violet-400/60 cursor-pointer"
                  >
                    <option className="bg-slate-900" value="todos">
                      todos os campeonatos
                    </option>
                    {nomesCompeticoes.map((n) => (
                      <option className="bg-slate-900" key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <Filter size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {calendarioFiltrado.length > 0 ? (
                  calendarioFiltrado.map((j) => <LinhaCalendario key={j.id} jogo={j} />)
                ) : (
                  <p className="uppercase text-xs font-bold tracking-wide text-slate-500 text-center py-7 sm:col-span-2">
                    nenhum jogo encontrado para este filtro
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* ===== COLUNA LATERAL (1/3) ===== */}
          <div className="lg:col-span-1 flex flex-col gap-8 sm:gap-10">
            {/* CONFRONTOS / HISTÓRICO — em destaque */}
            <section className="scroll-mt-28">
              <h2 className={`uppercase flex items-center gap-2 text-base sm:text-lg font-black tracking-wide mb-3 ${SECTION_STYLES.confrontos}`}>
                <Swords size={20} /> confrontos
              </h2>
              <div className="rounded-xl bg-linear-to-b from-white/6 to-white/2 ring-2 ring-rose-400/25 shadow-lg shadow-rose-500/10 p-4 sm:p-6">
                <Switcher
                  itens={dados.confrontos.map((c) => `Vs ${c.adversario}`)}
                  indice={confrontoIndex}
                  setIndice={setConfrontoIndex}
                  label="adversário"
                  grande
                />

                {(() => {
                  const c = dados.confrontos[confrontoIndex];
                  return (
                    <div key={confrontoIndex} className="animate-[categoriaFadeIn_0.35s_ease-out]">
                      <div className="flex items-center justify-center gap-8 mb-5">
                        <div className="text-center">
                          <p className="font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">{c.vitorias}</p>
                          <p className="uppercase text-[9px] font-bold tracking-widest text-slate-500">vitórias</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                          <p className="font-black text-2xl sm:text-3xl text-red-400 tabular-nums">{c.derrotas}</p>
                          <p className="uppercase text-[9px] font-bold tracking-widest text-slate-500">derrotas</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {c.historico.map((h, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 ring-1 ring-white/10 bg-white/3 border-l-2 ${
                              h.resultado === "V" ? "border-l-emerald-500" : "border-l-red-500"
                            }`}
                          >
                            <ResultadoBadge resultado={h.resultado} />
                            <div className="flex-1 min-w-0">
                              <p className="uppercase text-[9px] font-bold tracking-widest text-rose-300/80 truncate">
                                {h.competicao}
                              </p>
                              <p className="uppercase text-[10px] font-semibold tracking-wide text-slate-500">{h.data}</p>
                            </div>
                            <span className="uppercase font-black tabular-nums text-white text-sm sm:text-base">
                              {h.placar}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* CLASSIFICAÇÃO */}
            <section className="scroll-mt-28">
              <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide mb-3 ${SECTION_STYLES.classificacao}`}>
                <ListChecks size={17} /> classificação
              </h2>
              <div className="rounded-lg bg-white/3 ring-1 ring-white/10 p-3.5 sm:p-4">
                <Switcher
                  itens={nomesCompeticoes}
                  indice={standingsIndex}
                  setIndice={setStandingsIndex}
                  label="competição"
                />
                <TabelaClassificacao linhas={dados.classificacao[nomesCompeticoes[standingsIndex]]} />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button />
    </>
  );
}