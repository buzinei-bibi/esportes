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
    id: "sub19m",
    label: "sub-19 masc.",
    curto: "s19 masc.",
    genero: "mars",
    gradient: "from-blue-600 to-indigo-800",
    ring: "ring-blue-400/50",
    text: "text-blue-300",
    glow: "shadow-blue-500/30",
    competicoes: [
      "campeonato estadual sub-19 fpv",
      "torneio de transição sub-19",
      "copa vale do paraíba sub-19",
    ],
  },
  {
    id: "sub17f",
    label: "sub-17 fem.",
    curto: "s17 fem.",
    genero: "venus",
    gradient: "from-purple-500 to-fuchsia-700",
    ring: "ring-purple-400/50",
    text: "text-purple-300",
    glow: "shadow-purple-500/30",
    competicoes: [
      "campeonato estadual sub-17 fpv",
      "jogos abertos do interior fem.",
      "copa vale do paraíba sub-17 fem.",
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

const TIME_CASA = "vôlei taubaté";

const DADOS = {
  sub19m: {
    competicoesDisputadas: [
      { nome: "campeonato estadual sub-19 fpv" },
      { nome: "torneio de transição sub-19" },
      { nome: "copa vale do paraíba sub-19" },
    ],
    resultados: [
      {
        id: "s19m1",
        competicao: "campeonato estadual sub-19 fpv",
        data: "19/07/2026",
        mandante: "vôlei taubaté",
        visitante: "cruzeiro vôlei sp",
        setsMandante: 3,
        setsVisitante: 2,
        parciais: ["25-23", "22-25", "25-20", "20-25", "15-11"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
      {
        id: "s19m2",
        competicao: "torneio de transição sub-19",
        data: "11/07/2026",
        mandante: "vôlei caraguatatuba",
        visitante: "vôlei taubaté",
        setsMandante: 1,
        setsVisitante: 3,
        parciais: ["25-21", "20-25", "23-25", "18-25"],
        local: "ginásio municipal, caraguatatuba",
        resultado: "V",
      },
      {
        id: "s19m3",
        competicao: "copa vale do paraíba sub-19",
        data: "27/06/2026",
        mandante: "vôlei taubaté",
        visitante: "lorena vôlei clube",
        setsMandante: 2,
        setsVisitante: 3,
        parciais: ["25-20", "22-25", "20-25", "25-19", "10-15"],
        local: "ginásio taubatinha, taubaté",
        resultado: "D",
      },
      {
        id: "s19m3",
        competicao: "copa vale do paraíba sub-19",
        data: "27/06/2026",
        mandante: "vôlei taubaté",
        visitante: "são josé dos campos",
        setsMandante: 2,
        setsVisitante: 3,
        parciais: ["25-20", "22-25", "20-25", "25-19", "10-15"],
        local: "ginásio taubatinha, taubaté",
        resultado: "D",
      },
    ],
    proximosJogos: [
      {
        id: "s19mp1",
        competicao: "campeonato estadual sub-19 fpv",
        data: "02/08/2026",
        hora: "13h00",
        local: "ginásio taubatinha, taubaté",
        adversario: "lorena vôlei clube",
        mandante: true,
        entradaLivre: true,
      },
      {
        id: "s19mp2",
        competicao: "torneio de transição sub-19",
        data: "09/08/2026",
        hora: "11h00",
        local: "ginásio municipal, caraguatatuba",
        adversario: "vôlei caraguatatuba",
        mandante: false,
        entradaLivre: true,
      },
    ],
    classificacao: {
      "campeonato estadual sub-19 fpv": [
        { pos: 1, time: "vôlei taubaté", j: 6, v: 5, d: 1, sets: "17-8", pts: 15, taubate: true },
        { pos: 2, time: "cruzeiro vôlei sp", j: 6, v: 4, d: 2, sets: "15-10", pts: 12, taubate: false },
        { pos: 3, time: "lorena vôlei clube", j: 6, v: 3, d: 3, sets: "12-13", pts: 9, taubate: false },
        { pos: 4, time: "vôlei caraguatatuba", j: 6, v: 0, d: 6, sets: "4-17", pts: 0, taubate: false },
      ],
      "torneio de transição sub-19": null,
      "copa vale do paraíba sub-19": null,
    },
    calendario: [
      { id: "s19mc1", data: "27/06/2026", competicao: "copa vale do paraíba sub-19", confronto: "vôlei taubaté x lorena vôlei clube", local: "Taubaté", status: "encerrado", resultado: "D" },
      { id: "s19mc2", data: "11/07/2026", competicao: "torneio de transição sub-19", confronto: "vôlei caraguatatuba x vôlei taubaté", local: "Caraguatatuba", status: "encerrado", resultado: "V" },
      { id: "s19mc3", data: "19/07/2026", competicao: "campeonato estadual sub-19 fpv", confronto: "vôlei taubaté x cruzeiro vôlei sp", local: "Taubaté", status: "encerrado", resultado: "V" },
      { id: "s19mc4", data: "02/08/2026", competicao: "campeonato estadual sub-19 fpv", confronto: "vôlei taubaté x lorena vôlei clube", local: "Taubaté", status: "agendado", ingresso: false },
    ],
    confrontos: [
      {
        adversario: "cruzeiro vôlei sp",
        vitorias: 3,
        derrotas: 1,
        historico: [
          { data: "19/07/2026", competicao: "campeonato estadual sub-19 fpv", placar: "3-2", resultado: "V" },
          { data: "14/03/2026", competicao: "torneio de transição sub-19", placar: "1-3", resultado: "D" },
        ],
      },
      {
        adversario: "vôlei caraguatatuba",
        vitorias: 4,
        derrotas: 0,
        historico: [
          { data: "11/07/2026", competicao: "torneio de transição sub-19", placar: "1-3", resultado: "V" },
          { data: "05/02/2026", competicao: "campeonato estadual sub-19 fpv", placar: "0-3", resultado: "V" },
        ],
      },
      {
        adversario: "lorena vôlei clube",
        vitorias: 2,
        derrotas: 2,
        historico: [
          { data: "27/06/2026", competicao: "copa vale do paraíba sub-19", placar: "2-3", resultado: "D" },
          { data: "18/01/2026", competicao: "campeonato estadual sub-19 fpv", placar: "3-1", resultado: "V" },
        ],
      },
      {
        adversario: "pindamonhangaba vôlei",
        vitorias: 2,
        derrotas: 1,
        historico: [
          { data: "22/04/2026", competicao: "torneio de transição sub-19", placar: "3-1", resultado: "V" },
          { data: "30/10/2025", competicao: "copa vale do paraíba sub-19", placar: "1-3", resultado: "D" },
        ],
      },
    ],
  },

  sub17f: {
    competicoesDisputadas: [
      { nome: "campeonato estadual sub-17 fpv" },
      { nome: "jogos abertos do interior fem." },
      { nome: "copa vale do paraíba sub-17 fem." },
    ],
    resultados: [
      {
        id: "s17f1",
        competicao: "campeonato estadual sub-17 fpv",
        data: "17/07/2026",
        mandante: "vôlei taubaté",
        visitante: "vôlei litoral caraguá",
        setsMandante: 3,
        setsVisitante: 2,
        parciais: ["25-19", "22-25", "25-23", "21-25", "15-11"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
      {
        id: "s17f2",
        competicao: "jogos abertos do interior fem.",
        data: "09/07/2026",
        mandante: "avaí jundiaí vôlei",
        visitante: "vôlei taubaté",
        setsMandante: 3,
        setsVisitante: 1,
        parciais: ["25-21", "23-25", "25-20", "25-22"],
        local: "jundiaí",
        resultado: "D",
      },
      {
        id: "s17f3",
        competicao: "copa vale do paraíba sub-17 fem.",
        data: "02/07/2026",
        mandante: "vôlei taubaté",
        visitante: "apv pinda",
        setsMandante: 3,
        setsVisitante: 2,
        parciais: ["25-22", "22-25", "25-19", "20-25", "15-12"],
        local: "ginásio taubatinha, taubaté",
        resultado: "V",
      },
    ],
    proximosJogos: [
      {
        id: "s17fp1",
        competicao: "campeonato estadual sub-17 fpv",
        data: "31/07/2026",
        hora: "14h00",
        local: "ginásio taubatinha, taubaté",
        adversario: "avaí jundiaí vôlei",
        mandante: true,
        entradaLivre: true,
      },
      {
        id: "s17fp2",
        competicao: "jogos abertos do interior fem.",
        data: "07/08/2026",
        hora: "09h30",
        local: "ginásio taubatinha, ubatuba",
        adversario: "vôlei litoral caraguá",
        mandante: false,
        entradaLivre: true,
      },
    ],
    classificacao: {
      "campeonato estadual sub-17 fpv": [
        { pos: 1, time: "vôlei taubaté", j: 6, v: 5, d: 1, sets: "16-5", pts: 15, taubate: true },
        { pos: 2, time: "avaí jundiaí vôlei", j: 6, v: 4, d: 2, sets: "14-8", pts: 12, taubate: false },
        { pos: 3, time: "vôlei litoral caraguá", j: 6, v: 3, d: 3, sets: "10-11", pts: 9, taubate: false },
      ],
      "jogos abertos do interior fem.": [
        { pos: 1, time: "avaí jundiaí vôlei", j: 5, v: 4, d: 1, sets: "13-6", pts: 12, taubate: false },
        { pos: 2, time: "vôlei taubaté", j: 5, v: 3, d: 2, sets: "11-8", pts: 9, taubate: true },
      ],
      "copa vale do paraíba sub-17 fem.": null,
    },
    calendario: [
      { id: "s17fc1", data: "09/07/2026", competicao: "jogos abertos do interior fem.", confronto: "avaí jundiaí vôlei x vôlei taubaté", local: "jundiaí", status: "encerrado", resultado: "D" },
      { id: "s17fc2", data: "17/07/2026", competicao: "campeonato estadual sub-17 fpv", confronto: "vôlei taubaté x vôlei litoral caraguá", local: "taubaté", status: "encerrado", resultado: "V" },
      { id: "s17fc3", data: "31/07/2026", competicao: "campeonato estadual sub-17 fpv", confronto: "vôlei taubaté x avaí jundiaí vôlei", local: "taubaté", status: "agendado", ingresso: false },
      { id: "s17fc4", data: "07/08/2026", competicao: "jogos abertos do interior fem.", confronto: "vôlei litoral caraguá x vôlei taubaté", local: "ubatuba", status: "agendado", ingresso: false },
    ],
    confrontos: [
      {
        adversario: "avaí jundiaí vôlei",
        vitorias: 2,
        derrotas: 2,
        historico: [
          { data: "09/07/2026", competicao: "jogos abertos do interior fem.", placar: "1-3", resultado: "D" },
          { data: "14/03/2026", competicao: "campeonato estadual sub-17 fpv", placar: "3-2", resultado: "V" },
        ],
      },
      {
        adversario: "vôlei litoral caraguá",
        vitorias: 3,
        derrotas: 0,
        historico: [
          { data: "17/07/2026", competicao: "campeonato estadual sub-17 fpv", placar: "3-2", resultado: "V" },
          { data: "05/02/2026", competicao: "jogos abertos do interior fem.", placar: "3-0", resultado: "V" },
        ],
      },
      {
        adversario: "vôlei são sebastião fem.",
        vitorias: 2,
        derrotas: 1,
        historico: [
          { data: "26/05/2026", competicao: "copa vale do paraíba sub-17 fem.", placar: "3-1", resultado: "V" },
          { data: "07/11/2025", competicao: "jogos abertos do interior fem.", placar: "1-3", resultado: "D" },
        ],
      },
      {
        adversario: "apv pinda",
        vitorias: 3,
        derrotas: 1,
        historico: [
          { data: "02/07/2026", competicao: "copa vale do paraíba sub-17 fem.", placar: "3-2", resultado: "V" },
          { data: "18/09/2025", competicao: "jogos abertos do interior fem.", placar: "3-2", resultado: "V" },
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

export default function Volleyball() {
  const [categoria, setCategoria] = useState("sub19m");
  const [standingsIndex, setStandingsIndex] = useState(0);
  const [calFiltro, setCalFiltro] = useState("Todos");
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
    if (calFiltro === "Todos") return dados.calendario;
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