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
  Star,
  DoorOpen,
} from "lucide-react";

const CATEGORIAS = [
  {
    id: "masc",
    label: "MASCULINO",
    curto: "MASC.",
    genero: "mars",
    gradient: "from-sky-500 to-blue-600",
    ring: "ring-sky-400/50",
    text: "text-sky-300",
    glow: "shadow-sky-500/30",
  },
  {
    id: "sub18f",
    label: "SUB-18 FEMININO",
    curto: "SUB-18 F.",
    genero: "venus",
    gradient: "from-rose-500 to-pink-600",
    ring: "ring-rose-400/50",
    text: "text-rose-300",
    glow: "shadow-rose-500/30",
  },
];

const SECTION_STYLES = {
  resultados: "text-amber-300",
  proximos: "text-emerald-300",
  classificacao: "text-sky-300",
  calendario: "text-violet-300",
  confrontos: "text-rose-300",
};

const TIME_CASA = "HANDEBOL TAUBATÉ";

const DADOS = {
  masc: {
    competicoesDisputadas: [
      { nome: "LIGA NACIONAL DE HANDEBOL" },
      { nome: "CAMPEONATO PAULISTA" },
      { nome: "JOGOS REGIONAIS" },
      { nome: "JOGOS ABERTOS DO INTERIOR" },
      { nome: "CAMPEONATO SUL E CENTRO-AMERICANO DE CLUBES", obs: "QUANDO CLASSIFICADO" },
    ],
    resultados: [
      {
        id: "m1",
        competicao: "LIGA NACIONAL DE HANDEBOL",
        data: "21/07/2026",
        mandante: "HANDEBOL TAUBATÉ",
        visitante: "METODISTA SÃO BERNARDO",
        golsMandante: 29,
        golsVisitante: 26,
        intervalo: "15-13",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        resultado: "V",
      },
      {
        id: "m2",
        competicao: "CAMPEONATO SUL E CENTRO-AMERICANO DE CLUBES",
        data: "15/07/2026",
        mandante: "CASCAVEL HANDEBOL",
        visitante: "HANDEBOL TAUBATÉ",
        golsMandante: 24,
        golsVisitante: 27,
        intervalo: "12-14",
        local: "CASCAVEL, PR",
        resultado: "V",
      },
      {
        id: "m3",
        competicao: "CAMPEONATO PAULISTA",
        data: "06/07/2026",
        mandante: "HANDEBOL TAUBATÉ",
        visitante: "EC PINHEIROS",
        golsMandante: 25,
        golsVisitante: 28,
        intervalo: "13-15",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        resultado: "D",
      },
      {
        id: "m4",
        competicao: "JOGOS REGIONAIS",
        data: "29/06/2026",
        mandante: "HANDEBOL TAUBATÉ",
        visitante: "GUARULHOS HANDEBOL",
        golsMandante: 31,
        golsVisitante: 22,
        intervalo: "16-10",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        resultado: "V",
      },
    ],
    proximosJogos: [
      {
        id: "mp1",
        competicao: "LIGA NACIONAL DE HANDEBOL",
        data: "03/08/2026",
        hora: "20H00",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        adversario: "BLUMENAU HANDEBOL",
        mandante: true,
        entradaLivre: false,
        ingresso: { disponivel: true, link: "#" },
      },
      {
        id: "mp2",
        competicao: "CAMPEONATO PAULISTA",
        data: "10/08/2026",
        hora: "19H30",
        local: "GINÁSIO MUNICIPAL, OSASCO",
        adversario: "OSASCO HANDEBOL",
        mandante: false,
        entradaLivre: false,
        ingresso: { disponivel: false },
      },
    ],
    classificacao: {
      "LIGA NACIONAL DE HANDEBOL": [
        { pos: 1, time: "METODISTA SÃO BERNARDO", j: 10, v: 9, d: 1, gols: "289-231", pts: 27, taubate: false },
        { pos: 2, time: "HANDEBOL TAUBATÉ", j: 10, v: 8, d: 2, gols: "271-244", pts: 24, taubate: true },
        { pos: 3, time: "EC PINHEIROS", j: 10, v: 6, d: 4, gols: "255-249", pts: 18, taubate: false },
        { pos: 4, time: "BLUMENAU HANDEBOL", j: 10, v: 5, d: 5, gols: "241-251", pts: 15, taubate: false },
        { pos: 5, time: "CASCAVEL HANDEBOL", j: 10, v: 4, d: 6, gols: "233-260", pts: 12, taubate: false },
        { pos: 6, time: "FARROUPILHA HANDEBOL", j: 10, v: 3, d: 7, gols: "215-250", pts: 9, taubate: false },
        { pos: 7, time: "SÃO CAETANO HANDEBOL", j: 10, v: 3, d: 7, gols: "210-252", pts: 9, taubate: false },
        { pos: 8, time: "SESC RS HANDEBOL", j: 10, v: 2, d: 8, gols: "198-260", pts: 6, taubate: false },
      ],
      "CAMPEONATO PAULISTA": [
        { pos: 1, time: "EC PINHEIROS", j: 8, v: 7, d: 1, gols: "224-178", pts: 21, taubate: false },
        { pos: 2, time: "HANDEBOL TAUBATÉ", j: 8, v: 6, d: 2, gols: "211-190", pts: 18, taubate: true },
        { pos: 3, time: "OSASCO HANDEBOL", j: 8, v: 4, d: 4, gols: "198-197", pts: 12, taubate: false },
        { pos: 4, time: "GUARULHOS HANDEBOL", j: 8, v: 2, d: 6, gols: "170-218", pts: 6, taubate: false },
        { pos: 5, time: "BRAGANÇA HANDEBOL", j: 8, v: 1, d: 7, gols: "140-190", pts: 3, taubate: false },
        { pos: 6, time: "SUZANO HANDEBOL", j: 8, v: 1, d: 7, gols: "138-188", pts: 3, taubate: false },
        { pos: 7, time: "TABOÃO HANDEBOL", j: 8, v: 1, d: 7, gols: "135-192", pts: 3, taubate: false },
        { pos: 8, time: "LIMEIRA HANDEBOL", j: 8, v: 1, d: 7, gols: "133-189", pts: 3, taubate: false },
      ],
      "JOGOS REGIONAIS": [
        { pos: 1, time: "HANDEBOL TAUBATÉ", j: 6, v: 5, d: 1, gols: "165-128", pts: 15, taubate: true },
        { pos: 2, time: "GUARULHOS HANDEBOL", j: 6, v: 4, d: 2, gols: "150-138", pts: 12, taubate: false },
        { pos: 3, time: "FARROUPILHA HANDEBOL", j: 6, v: 2, d: 4, gols: "132-160", pts: 6, taubate: false },
        { pos: 4, time: "FRANCA HANDEBOL", j: 6, v: 2, d: 4, gols: "128-158", pts: 6, taubate: false },
        { pos: 5, time: "MARÍLIA HANDEBOL", j: 6, v: 1, d: 5, gols: "95-170", pts: 3, taubate: false },
        { pos: 6, time: "BAURU HANDEBOL", j: 6, v: 1, d: 5, gols: "92-172", pts: 3, taubate: false },
        { pos: 7, time: "SANTOS HANDEBOL", j: 6, v: 1, d: 5, gols: "90-175", pts: 3, taubate: false },
        { pos: 8, time: "SÃO VICENTE HANDEBOL", j: 6, v: 0, d: 6, gols: "70-190", pts: 0, taubate: false },
      ],
      "JOGOS ABERTOS DO INTERIOR": [
        { pos: 1, time: "SOROCABA HANDEBOL", j: 6, v: 5, d: 1, gols: "158-121", pts: 15, taubate: false },
        { pos: 2, time: "HANDEBOL TAUBATÉ", j: 6, v: 5, d: 1, gols: "150-118", pts: 15, taubate: true },
        { pos: 3, time: "JUNDIAÍ HANDEBOL", j: 6, v: 4, d: 2, gols: "140-125", pts: 12, taubate: false },
        { pos: 4, time: "SÃO JOSÉ DOS CAMPOS HANDEBOL", j: 6, v: 3, d: 3, gols: "125-130", pts: 9, taubate: false },
        { pos: 5, time: "PIRACICABA HANDEBOL", j: 6, v: 2, d: 4, gols: "110-135", pts: 6, taubate: false },
        { pos: 6, time: "ARARAQUARA HANDEBOL", j: 6, v: 1, d: 5, gols: "95-150", pts: 3, taubate: false },
        { pos: 7, time: "RIBEIRÃO PRETO HANDEBOL", j: 6, v: 1, d: 5, gols: "90-152", pts: 3, taubate: false },
        { pos: 8, time: "BRAGANÇA HANDEBOL", j: 6, v: 0, d: 6, gols: "70-160", pts: 0, taubate: false },
      ],
      "CAMPEONATO SUL E CENTRO-AMERICANO DE CLUBES": null,
    },
    calendario: [
      { id: "mc1", data: "29/06/2026", competicao: "JOGOS REGIONAIS", confronto: "HANDEBOL TAUBATÉ X GUARULHOS HANDEBOL", local: "TAUBATÉ", status: "encerrado", resultado: "V" },
      { id: "mc2", data: "06/07/2026", competicao: "CAMPEONATO PAULISTA", confronto: "HANDEBOL TAUBATÉ X EC PINHEIROS", local: "TAUBATÉ", status: "encerrado", resultado: "D" },
      { id: "mc3", data: "15/07/2026", competicao: "CAMPEONATO SUL E CENTRO-AMERICANO DE CLUBES", confronto: "CASCAVEL HANDEBOL X HANDEBOL TAUBATÉ", local: "CASCAVEL", status: "encerrado", resultado: "V" },
      { id: "mc4", data: "21/07/2026", competicao: "LIGA NACIONAL DE HANDEBOL", confronto: "HANDEBOL TAUBATÉ X METODISTA SÃO BERNARDO", local: "TAUBATÉ", status: "encerrado", resultado: "V" },
      { id: "mc5", data: "03/08/2026", competicao: "LIGA NACIONAL DE HANDEBOL", confronto: "HANDEBOL TAUBATÉ X BLUMENAU HANDEBOL", local: "TAUBATÉ", status: "agendado", ingresso: true },
      { id: "mc6", data: "10/08/2026", competicao: "CAMPEONATO PAULISTA", confronto: "OSASCO HANDEBOL X HANDEBOL TAUBATÉ", local: "OSASCO", status: "agendado", ingresso: false },
    ],
    confrontos: [
      {
        adversario: "METODISTA SÃO BERNARDO",
        vitorias: 4,
        derrotas: 3,
        historico: [
          { data: "21/07/2026", competicao: "LIGA NACIONAL DE HANDEBOL", placar: "29-26", resultado: "V" },
          { data: "12/02/2026", competicao: "LIGA NACIONAL DE HANDEBOL", placar: "24-28", resultado: "D" },
        ],
      },
      {
        adversario: "EC PINHEIROS",
        vitorias: 3,
        derrotas: 4,
        historico: [
          { data: "06/07/2026", competicao: "CAMPEONATO PAULISTA", placar: "25-28", resultado: "D" },
          { data: "18/11/2025", competicao: "LIGA NACIONAL DE HANDEBOL", placar: "27-24", resultado: "V" },
        ],
      },
      {
        adversario: "GUARULHOS HANDEBOL",
        vitorias: 6,
        derrotas: 1,
        historico: [
          { data: "29/06/2026", competicao: "JOGOS REGIONAIS", placar: "31-22", resultado: "V" },
          { data: "09/09/2025", competicao: "CAMPEONATO PAULISTA", placar: "26-19", resultado: "V" },
        ],
      },
      {
        adversario: "CASCAVEL HANDEBOL",
        vitorias: 2,
        derrotas: 2,
        historico: [
          { data: "15/07/2026", competicao: "CAMPEONATO SUL E CENTRO-AMERICANO DE CLUBES", placar: "24-27", resultado: "V" },
          { data: "03/02/2026", competicao: "CAMPEONATO SUL E CENTRO-AMERICANO DE CLUBES", placar: "29-25", resultado: "D" },
        ],
      },
      {
        adversario: "BLUMENAU HANDEBOL",
        vitorias: 3,
        derrotas: 2,
        historico: [
          { data: "17/05/2026", competicao: "LIGA NACIONAL DE HANDEBOL", placar: "28-24", resultado: "V" },
          { data: "03/12/2025", competicao: "LIGA NACIONAL DE HANDEBOL", placar: "22-26", resultado: "D" },
        ],
      },
      {
        adversario: "OSASCO HANDEBOL",
        vitorias: 4,
        derrotas: 1,
        historico: [
          { data: "20/04/2026", competicao: "CAMPEONATO PAULISTA", placar: "27-20", resultado: "V" },
          { data: "08/12/2025", competicao: "CAMPEONATO PAULISTA", placar: "25-21", resultado: "V" },
        ],
      },
    ],
  },

  sub18f: {
    competicoesDisputadas: [
      { nome: "CAMPEONATO PAULISTA SUB-18 FEMININO" },
      { nome: "JOGOS REGIONAIS" },
      { nome: "JOGOS ABERTOS DO INTERIOR" },
      { nome: "COPAS E TORNEIOS DA FEDERAÇÃO PAULISTA DE HANDEBOL" },
    ],
    resultados: [
      {
        id: "s18f1",
        competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO",
        data: "17/07/2026",
        mandante: "HANDEBOL TAUBATÉ",
        visitante: "HANDEBOL LITORAL CARAGUÁ",
        golsMandante: 24,
        golsVisitante: 21,
        intervalo: "12-10",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        resultado: "V",
      },
      {
        id: "s18f2",
        competicao: "JOGOS REGIONAIS",
        data: "09/07/2026",
        mandante: "AVAI JUNDIAÍ HANDEBOL",
        visitante: "HANDEBOL TAUBATÉ",
        golsMandante: 25,
        golsVisitante: 22,
        intervalo: "13-10",
        local: "JUNDIAÍ",
        resultado: "D",
      },
      {
        id: "s18f3",
        competicao: "JOGOS ABERTOS DO INTERIOR",
        data: "02/07/2026",
        mandante: "HANDEBOL TAUBATÉ",
        visitante: "APV PINDA HANDEBOL FEM.",
        golsMandante: 26,
        golsVisitante: 24,
        intervalo: "12-13",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        resultado: "V",
      },
      {
        id: "s18f4",
        competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO",
        data: "25/06/2026",
        mandante: "AVAI JUNDIAÍ HANDEBOL",
        visitante: "HANDEBOL TAUBATÉ",
        golsMandante: 19,
        golsVisitante: 23,
        intervalo: "9-11",
        local: "JUNDIAÍ",
        resultado: "V",
      },
    ],
    proximosJogos: [
      {
        id: "s18fp1",
        competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO",
        data: "31/07/2026",
        hora: "14H00",
        local: "GINÁSIO TAUBATINHA, TAUBATÉ",
        adversario: "AVAI JUNDIAÍ HANDEBOL",
        mandante: true,
        entradaLivre: true,
      },
      {
        id: "s18fp2",
        competicao: "JOGOS ABERTOS DO INTERIOR",
        data: "07/08/2026",
        hora: "09H30",
        local: "GINÁSIO MUNICIPAL, UBATUBA",
        adversario: "HANDEBOL LITORAL CARAGUÁ",
        mandante: false,
        entradaLivre: true,
      },
    ],
    classificacao: {
      "CAMPEONATO PAULISTA SUB-18 FEMININO": [
        { pos: 1, time: "HANDEBOL TAUBATÉ", j: 6, v: 5, d: 1, gols: "141-112", pts: 15, taubate: true },
        { pos: 2, time: "AVAI JUNDIAÍ HANDEBOL", j: 6, v: 4, d: 2, gols: "132-118", pts: 12, taubate: false },
        { pos: 3, time: "HANDEBOL LITORAL CARAGUÁ", j: 6, v: 3, d: 3, gols: "120-125", pts: 9, taubate: false },
        { pos: 4, time: "GUARÁ HANDEBOL SUB-18 FEM.", j: 6, v: 2, d: 4, gols: "85-95", pts: 6, taubate: false },
        { pos: 5, time: "PINDA HANDEBOL SUB-18 FEM.", j: 6, v: 1, d: 5, gols: "65-100", pts: 3, taubate: false },
        { pos: 6, time: "JACAREÍ SUB-18 FEM. HANDEBOL", j: 6, v: 1, d: 5, gols: "62-102", pts: 3, taubate: false },
        { pos: 7, time: "SÃO JOSÉ SUB-18 FEM. HANDEBOL", j: 6, v: 0, d: 6, gols: "45-115", pts: 0, taubate: false },
        { pos: 8, time: "UBATUBA SUB-18 FEM. HANDEBOL", j: 6, v: 0, d: 6, gols: "42-118", pts: 0, taubate: false },
      ],
      "JOGOS REGIONAIS": [
        { pos: 1, time: "AVAI JUNDIAÍ HANDEBOL", j: 5, v: 4, d: 1, gols: "118-96", pts: 12, taubate: false },
        { pos: 2, time: "HANDEBOL TAUBATÉ", j: 5, v: 3, d: 2, gols: "108-101", pts: 9, taubate: true },
        { pos: 3, time: "GUARÁ SUB-18 FEM. REGIONAL", j: 5, v: 2, d: 3, gols: "70-80", pts: 6, taubate: false },
        { pos: 4, time: "PINDA SUB-18 FEM. REGIONAL", j: 5, v: 1, d: 4, gols: "55-85", pts: 3, taubate: false },
        { pos: 5, time: "JACAREÍ SUB-18 FEM. REGIONAL", j: 5, v: 1, d: 4, gols: "52-88", pts: 3, taubate: false },
        { pos: 6, time: "SÃO JOSÉ SUB-18 FEM. REGIONAL", j: 5, v: 0, d: 5, gols: "40-100", pts: 0, taubate: false },
        { pos: 7, time: "UBATUBA SUB-18 FEM. REGIONAL", j: 5, v: 0, d: 5, gols: "38-102", pts: 0, taubate: false },
        { pos: 8, time: "CARAGUÁ SUB-18 FEM. REGIONAL", j: 5, v: 0, d: 5, gols: "35-105", pts: 0, taubate: false },
      ],
      "JOGOS ABERTOS DO INTERIOR": [
        { pos: 1, time: "SOROCABA SUB-18 FEM. HANDEBOL", j: 5, v: 4, d: 1, gols: "115-90", pts: 12, taubate: false },
        { pos: 2, time: "HANDEBOL TAUBATÉ", j: 5, v: 4, d: 1, gols: "110-92", pts: 12, taubate: true },
        { pos: 3, time: "JUNDIAÍ SUB-18 FEM. HANDEBOL", j: 5, v: 3, d: 2, gols: "100-95", pts: 9, taubate: false },
        { pos: 4, time: "PINDAMONHANGABA HANDEBOL", j: 5, v: 2, d: 3, gols: "88-100", pts: 6, taubate: false },
        { pos: 5, time: "SÃO JOSÉ DOS CAMPOS SUB-18 FEM.", j: 5, v: 1, d: 4, gols: "70-105", pts: 3, taubate: false },
        { pos: 6, time: "JACAREÍ HANDEBOL FEM.", j: 5, v: 1, d: 4, gols: "68-108", pts: 3, taubate: false },
        { pos: 7, time: "CARAGUÁ SUB-18 FEM. HANDEBOL", j: 5, v: 0, d: 5, gols: "50-115", pts: 0, taubate: false },
        { pos: 8, time: "UBATUBA SUB-18 FEM. HANDEBOL", j: 5, v: 0, d: 5, gols: "48-118", pts: 0, taubate: false },
      ],
      "COPAS E TORNEIOS DA FEDERAÇÃO PAULISTA DE HANDEBOL": null,
    },
    calendario: [
      { id: "s18fc1", data: "09/07/2026", competicao: "JOGOS REGIONAIS", confronto: "AVAI JUNDIAÍ HANDEBOL X HANDEBOL TAUBATÉ", local: "JUNDIAÍ", status: "encerrado", resultado: "D" },
      { id: "s18fc2", data: "17/07/2026", competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO", confronto: "HANDEBOL TAUBATÉ X HANDEBOL LITORAL CARAGUÁ", local: "TAUBATÉ", status: "encerrado", resultado: "V" },
      { id: "s18fc3", data: "31/07/2026", competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO", confronto: "HANDEBOL TAUBATÉ X AVAI JUNDIAÍ HANDEBOL", local: "TAUBATÉ", status: "agendado", ingresso: false },
      { id: "s18fc4", data: "07/08/2026", competicao: "JOGOS ABERTOS DO INTERIOR", confronto: "HANDEBOL LITORAL CARAGUÁ X HANDEBOL TAUBATÉ", local: "UBATUBA", status: "agendado", ingresso: false },
    ],
    confrontos: [
      {
        adversario: "AVAI JUNDIAÍ HANDEBOL",
        vitorias: 2,
        derrotas: 2,
        historico: [
          { data: "09/07/2026", competicao: "JOGOS REGIONAIS", placar: "25-22", resultado: "D" },
          { data: "14/03/2026", competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO", placar: "19-23", resultado: "V" },
        ],
      },
      {
        adversario: "HANDEBOL LITORAL CARAGUÁ",
        vitorias: 3,
        derrotas: 0,
        historico: [
          { data: "17/07/2026", competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO", placar: "24-21", resultado: "V" },
          { data: "05/02/2026", competicao: "JOGOS REGIONAIS", placar: "22-17", resultado: "V" },
        ],
      },
      {
        adversario: "APV PINDA HANDEBOL FEM.",
        vitorias: 2,
        derrotas: 1,
        historico: [
          { data: "02/07/2026", competicao: "JOGOS ABERTOS DO INTERIOR", placar: "26-24", resultado: "V" },
          { data: "07/11/2025", competicao: "JOGOS REGIONAIS", placar: "18-21", resultado: "D" },
        ],
      },
      {
        adversario: "GUARÁ HANDEBOL CLUBE FEM.",
        vitorias: 3,
        derrotas: 0,
        historico: [
          { data: "12/04/2026", competicao: "COPAS E TORNEIOS DA FEDERAÇÃO PAULISTA DE HANDEBOL", placar: "23-15", resultado: "V" },
          { data: "18/09/2025", competicao: "JOGOS REGIONAIS", placar: "21-19", resultado: "V" },
        ],
      },
      {
        adversario: "PINDAMONHANGABA HANDEBOL",
        vitorias: 2,
        derrotas: 2,
        historico: [
          { data: "08/03/2026", competicao: "JOGOS ABERTOS DO INTERIOR", placar: "20-24", resultado: "D" },
          { data: "22/08/2025", competicao: "JOGOS ABERTOS DO INTERIOR", placar: "25-19", resultado: "V" },
        ],
      },
      {
        adversario: "JACAREÍ HANDEBOL FEM.",
        vitorias: 1,
        derrotas: 2,
        historico: [
          { data: "15/02/2026", competicao: "JOGOS REGIONAIS", placar: "23-19", resultado: "D" },
          { data: "30/07/2025", competicao: "CAMPEONATO PAULISTA SUB-18 FEMININO", placar: "20-22", resultado: "V" },
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
      className={`w-full text-left rounded-lg border-l-2 bg-white/4 hover:bg-white/8 transition-all duration-150 p-2.5 sm:p-4 ring-1 ring-white/10 hover:ring-white/20 overflow-hidden ${
        vitoria ? "border-l-emerald-500" : "border-l-red-500"
      }`}
    >
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-2.5">
        <span className="uppercase text-[9px] sm:text-[10px] font-bold tracking-widest text-amber-300/90 truncate min-w-0">
          {jogo.competicao}
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="uppercase text-[9px] sm:text-[10px] font-bold tracking-wide text-slate-500">{jogo.data}</span>
          <ResultadoBadge resultado={jogo.resultado} />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span
            className={`uppercase flex-1 min-w-0 truncate font-bold text-[11px] sm:text-sm ${
              jogo.mandante === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {jogo.mandante}
          </span>
          <span className="uppercase font-black tabular-nums text-sm sm:text-lg text-white shrink-0 w-6 sm:w-7 text-center">
            {jogo.golsMandante}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span
            className={`uppercase flex-1 min-w-0 truncate font-bold text-[11px] sm:text-sm ${
              jogo.visitante === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {jogo.visitante}
          </span>
          <span className="uppercase font-black tabular-nums text-sm sm:text-lg text-white shrink-0 w-6 sm:w-7 text-center">
            {jogo.golsVisitante}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-2 sm:mt-2.5 pt-2 border-t border-white/10">
        <span className="uppercase text-[9px] sm:text-[10px] font-semibold tracking-wide text-slate-500 flex items-center gap-1 min-w-0">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate">{jogo.local}</span>
        </span>
        <span className="uppercase inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-wide text-slate-400 shrink-0">
          {aberto ? "ocultar detalhes" : "ver detalhes"}
          <ChevronDown
            size={15}
            className={`text-slate-500 shrink-0 transition-transform duration-150 ${aberto ? "rotate-180" : ""}`}
          />
        </span>
      </div>

      {aberto && (
        <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-white/10">
          <p className="uppercase text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-500 mb-1.5">intervalo (1º tempo)</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="uppercase text-[10px] sm:text-[11px] font-bold tabular-nums bg-white/5 ring-1 ring-white/10 rounded-md px-2 py-1 text-slate-100">
              {jogo.intervalo}
            </span>
          </div>
        </div>
      )}
    </button>
  );
}

function CardProximoJogo({ jogo }) {
  const [aberto, setAberto] = useState(false);
  const mandanteNome = jogo.mandante ? TIME_CASA : jogo.adversario;
  const visitanteNome = jogo.mandante ? jogo.adversario : TIME_CASA;
  return (
    <button
      onClick={() => setAberto((a) => !a)}
      className="w-full text-left rounded-lg border-l-2 border-l-emerald-400 bg-white/4 hover:bg-white/8 transition-all duration-150 p-2.5 sm:p-4 ring-1 ring-white/10 hover:ring-white/20 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-2.5">
        <span className="uppercase text-[9px] sm:text-[10px] font-bold tracking-widest text-emerald-300/90 truncate min-w-0">
          {jogo.competicao}
        </span>
        {jogo.entradaLivre ? (
          <span className="uppercase inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-emerald-300 bg-emerald-400/10 ring-1 ring-emerald-400/30 rounded-md px-1.5 sm:px-2 py-0.5 shrink-0">
            <DoorOpen size={11} /> <span className="hidden xs:inline">entrada livre</span><span className="xs:hidden">livre</span>
          </span>
        ) : (
          <span className="uppercase inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-amber-300 bg-amber-400/10 ring-1 ring-amber-400/30 rounded-md px-1.5 sm:px-2 py-0.5 shrink-0">
            <Ticket size={11} /> ingresso
          </span>
        )}
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span
            className={`uppercase flex-1 min-w-0 truncate font-bold text-[11px] sm:text-sm ${
              mandanteNome === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {mandanteNome}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span
            className={`uppercase flex-1 min-w-0 truncate font-bold text-[11px] sm:text-sm ${
              visitanteNome === TIME_CASA ? "text-white" : "text-slate-300"
            }`}
          >
            {visitanteNome}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 mt-2 sm:mt-2.5 pt-2 border-t border-white/10 uppercase text-[9px] sm:text-[10px] font-semibold tracking-wide text-slate-500">
        <span className="inline-flex items-center gap-1 shrink-0">
          <CalendarDays size={11} /> {jogo.data}
        </span>
        <span className="inline-flex items-center gap-1 shrink-0">
          <Clock size={11} /> {jogo.hora}
        </span>
        <span className="inline-flex items-center gap-1 min-w-0">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate">{jogo.local}</span>
        </span>
      </div>

      {aberto && (
        <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-white/10 uppercase text-[9px] sm:text-[10px] font-semibold tracking-wide">
          {jogo.entradaLivre ? (
            <span className="text-emerald-300">acesso gratuito para o público</span>
          ) : jogo.ingresso?.disponivel ? (
            <a
              href={jogo.ingresso.link}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-black text-amber-300 hover:text-amber-200"
            >
              <Ticket size={12} /> comprar ingressos
            </a>
          ) : (
            <span className="text-slate-500">ingressos ainda não disponíveis</span>
          )}
        </div>
      )}
    </button>
  );
}

function Switcher({ itens, indice, setIndice, label, grande = false }) {
  const total = itens.length;
  return (
    <div className="flex items-center justify-between gap-2 mb-3.5">
      <button
        aria-label="Anterior"
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
            <th className="text-center py-2 px-1.5">gols</th>
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
              <td className="py-2 px-2.5 max-w-27.5 sm:max-w-none">
                <span
                  className={`uppercase truncate block font-bold text-[11px] sm:text-xs ${
                    l.taubate ? "text-white" : "text-slate-300"
                  }`}
                >
                  {l.time}
                </span>
              </td>
              <td className="py-2 px-1.5 text-center text-slate-400 tabular-nums font-semibold">{l.j}</td>
              <td className="py-2 px-1.5 text-center text-emerald-400 font-black tabular-nums">{l.v}</td>
              <td className="py-2 px-1.5 text-center text-red-400 font-black tabular-nums">{l.d}</td>
              <td className="py-2 px-1.5 text-center text-slate-400 tabular-nums font-semibold">{l.gols}</td>
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
      className={`flex items-center gap-1.5 sm:gap-2 rounded-lg ring-1 ring-white/10 bg-white/3 hover:bg-white/6 hover:ring-white/20 hover:shadow-md hover:shadow-black/20 transition-all duration-200 px-2 sm:px-3 py-1.5 sm:py-2 border-l-2 w-full overflow-hidden ${
        encerrado ? (vitoria ? "border-l-emerald-500" : "border-l-red-500") : "border-l-violet-400"
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="uppercase text-[8px] sm:text-[9px] font-bold tracking-widest text-violet-300/80 truncate">
          {jogo.competicao}
        </p>
        <p className="uppercase text-[10px] sm:text-xs font-bold text-slate-100 flex items-baseline gap-1 sm:gap-1.5 min-w-0">
          <span className="text-white tabular-nums shrink-0">{jogo.data}</span>
          <span className="truncate min-w-0">{jogo.confronto}</span>
        </p>
        <p className="uppercase text-[8px] sm:text-[9px] font-semibold tracking-wide text-slate-500 truncate inline-flex items-center gap-1 mt-0.5">
          <MapPin size={9} className="shrink-0" /> {jogo.local}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-1 sm:gap-1.5">
        {jogo.ingresso && (
          <Ticket size={11} className="text-amber-300 shrink-0" />
        )}
        {!encerrado && (
          <span className="uppercase text-[8px] sm:text-[9px] font-black tracking-wide text-violet-300 bg-violet-400/10 ring-1 ring-violet-400/30 rounded-md px-1 sm:px-1.5 py-0.5 whitespace-nowrap">
            agendado
          </span>
        )}
      </div>
    </div>
  );
}

export default function Handebol() {
  const [categoria, setCategoria] = useState("masc");
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
    setCalFiltro("Todos");
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
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(280%); }
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
          50% { box-shadow: 0 0 0 5px rgba(255,255,255,0); }
        }
      `}</style>

      <main className="w-full px-4 sm:px-6 lg:px-10 pb-20 text-white uppercase bg-linear-to-r from-slate-950 via-blue-950 to-slate-900">
        <div
          className="sticky top-2 z-20 inline-flex items-center gap-0.5 bg-slate-950/85 backdrop-blur-md ring-1 ring-white/15 rounded-full p-0.5 shadow-lg shadow-black/30 mt-2.5 mb-1 max-w-full"
        >
          <button
            aria-label="categoria anterior"
            onClick={() => mudarCategoria(-1)}
            className="rounded-full hover:bg-white/10 transition-colors shrink-0 p-1"
          >
            <ChevronLeft size={12} className="text-white" />
          </button>

          <div
            key={catAtual.id}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wide bg-linear-to-r ${catAtual.gradient} text-white shadow-md ${catAtual.glow} ring-1 ring-white/30 transition-all duration-300 animate-[categoriaFadeIn_0.25s_ease-out] max-w-[55vw] sm:max-w-none min-w-0`}
          >
            <IconeGenero genero={catAtual.genero} size={12} className="text-white shrink-0" />
            <span className="hidden sm:inline truncate">{catAtual.label}</span>
            <span className="sm:hidden truncate">{catAtual.curto}</span>
            {catAtual.sub20 && <Star size={10} className="text-amber-200 shrink-0" />}
          </div>

          <button
            aria-label="próxima categoria"
            onClick={() => mudarCategoria(1)}
            className="rounded-full hover:bg-white/10 transition-colors shrink-0 p-1"
          >
            <ChevronRight size={12} className="text-white" />
          </button>
        </div>

        {/* GRID: 1 coluna no mobile, 3 no desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 pt-5 sm:pt-6">
          {/* ===== COLUNA PRINCIPAL (2/3) ===== */}
          <div className="lg:col-span-2 flex flex-col gap-8 sm:gap-10">
            {/* PRÓXIMOS JOGOS */}
            <section className="scroll-mt-28">
              <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide mb-3 ${SECTION_STYLES.proximos}`}>
                <CalendarDays size={17} /> próximos jogos
              </h2>
              <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                {dados.proximosJogos.map((j) => (
                  <CardProximoJogo key={j.id} jogo={j} />
                ))}
              </div>
            </section>

            {/* RESULTADOS */}
            <section className="scroll-mt-28">
              <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide mb-3 ${SECTION_STYLES.resultados}`}>
                <Trophy size={17} /> resultados dos jogos
              </h2>
              <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                {dados.resultados.map((r) => (
                  <CardResultado key={r.id} jogo={r} />
                ))}
              </div>
            </section>

            {/* CALENDÁRIO COMPLETO */}
            <section className="scroll-mt-28">
              <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                <h2 className={`uppercase flex items-center gap-2 text-sm sm:text-base font-black tracking-wide ${SECTION_STYLES.calendario}`}>
                  <CalendarDays size={17} /> calendário completo
                </h2>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={calFiltro}
                    onChange={(e) => setCalFiltro(e.target.value)}
                    className="uppercase appearance-none pl-7 pr-7 py-1.5 rounded-md bg-white/5 ring-1 ring-white/15 text-[11px] sm:text-xs font-bold text-white focus:outline-none focus:ring-violet-400/60 cursor-pointer w-full sm:w-auto"
                  >
                    <option className="bg-slate-900" value="Todos">
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
            {/* CONFRONTOS / HISTÓRICO — em destaque, maior que antes */}
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
                      <div className="flex items-center justify-center gap-6 sm:gap-8 mb-5">
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
                            <span className="uppercase font-black tabular-nums text-white text-sm sm:text-base shrink-0">
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