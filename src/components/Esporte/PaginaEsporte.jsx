import { useState, useMemo, useEffect, useRef } from "react";
import Button from "../Button/Button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  CalendarDays,
  CalendarPlus,
  Clock,
  Ticket,
  Trophy,
  DoorOpen,
} from "lucide-react";
import { horaAproximada } from "../../data/jogos";
import "./PaginaEsporte.css";

// página de um esporte (handebol, vôlei, tênis de mesa).
// os dados vêm de src/data/<esporte>.js — todos com o mesmo formato.

const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const MESES_NOME = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
const DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

// "03/08/2026" + "20H00" (ou "19h30") → Date
function lerData(data, hora = "00H00") {
  const [d, m, a] = data.split("/").map(Number);
  const [h, min] = hora.split(/h/i).map(Number);
  return new Date(a, m - 1, d, h || 0, min || 0);
}

// "METODISTA SÃO BERNARDO" → "MSB" (para o escudo dos adversários)
function sigla(nome) {
  const ignorar = ["HANDEBOL", "VÔLEI", "TÊNIS", "MESA", "TM", "CLUBE", "FEM.", "SUB-18", "DE", "DA", "DO"];
  return nome
    .toUpperCase()
    .split(" ")
    .filter((p) => !ignorar.includes(p))
    .slice(0, 3)
    .map((p) => p[0])
    .join("");
}

// "289-231" → +58 (saldo de gols ou de sets)
function saldo(placar) {
  const [pro, contra] = placar.split("-").map(Number);
  const s = pro - contra;
  return s > 0 ? `+${s}` : s < 0 ? `−${-s}` : "0";
}

// handebol conta gols; vôlei e tênis de mesa contam sets
function placar(jogo) {
  return [Number(jogo.golsMandante ?? jogo.setsMandante), Number(jogo.golsVisitante ?? jogo.setsVisitante)];
}

// detalhe do jogo: intervalo (handebol) ou parciais de cada set
function Detalhe({ jogo }) {
  if (jogo.intervalo) {
    return (
      <span>
        1º tempo <b>{jogo.intervalo}</b>
      </span>
    );
  }
  if (!jogo.parciais?.length) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      sets
      <span className="esp-parciais">
        {jogo.parciais.map((p, i) => (
          <b key={i}>{p}</b>
        ))}
      </span>
    </span>
  );
}

// link do google agenda com o jogo já preenchido (2 horas de duração)
function linkAgenda(jogo, titulo) {
  const inicio = lerData(jogo.data, jogo.hora);
  const fim = new Date(inicio.getTime() + 2 * 60 * 60 * 1000);
  const p = (n) => String(n).padStart(2, "0");
  const f = (d) => `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: titulo,
    dates: `${f(inicio)}/${f(fim)}`,
    location: jogo.local,
    details: jogo.competicao,
    ctz: "America/Sao_Paulo",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function SeloVD({ resultado }) {
  const vitoria = resultado === "V";
  return (
    <span className={`esp-vd ${vitoria ? "is-v" : "is-d"}`} aria-label={vitoria ? "vitória" : "derrota"}>
      {resultado}
    </span>
  );
}

function Escudo({ nome, casa, EscudoCasa }) {
  const ehCasa = nome === casa;
  return (
    <div className={`esp-escudo ${ehCasa ? "is-casa" : ""}`} aria-hidden="true">
      {ehCasa && EscudoCasa ? <EscudoCasa titulo="" /> : sigla(nome)}
    </div>
  );
}

function SecaoTitulo({ id, segunda = false, children }) {
  return (
    <h2 id={id} className="esp-secao-titulo" style={segunda ? { "--esp-cor": "var(--esp-ceu)" } : undefined}>
      {children}
    </h2>
  );
}

function Seletor({ itens, indice, setIndice, rotulo }) {
  const total = itens.length;
  return (
    <div className="esp-seletor">
      <button
        type="button"
        aria-label={`${rotulo} anterior`}
        onClick={() => setIndice((i) => (i - 1 + total) % total)}
        className="esp-seta"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <div className="esp-seletor-texto" aria-live="polite">
        <p className="esp-seletor-rotulo">{rotulo}</p>
        <p className="esp-seletor-nome">{itens[indice]}</p>
        <p className="esp-seletor-conta">
          {indice + 1} de {total}
        </p>
      </div>
      <button
        type="button"
        aria-label={`próximo ${rotulo}`}
        onClick={() => setIndice((i) => (i + 1) % total)}
        className="esp-seta"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ---------- topo: resumo da temporada ---------- */
function Resumo({ dados, resultados }) {
  const principal = dados.competicoesDisputadas
    .map((c) => ({ nome: c.nome, linha: dados.classificacao[c.nome]?.find((l) => l.taubate) }))
    .find((c) => c.linha);
  const ultimos = resultados.slice(0, 5).reverse();
  const vitorias = resultados.filter((r) => r.resultado === "V").length;
  const aproveitamento = resultados.length ? Math.round((vitorias / resultados.length) * 100) : null;

  return (
    <div className="esp-stats esp-sobe" style={{ "--atraso": "0.35s" }}>
      {principal && (
        <div className="esp-stat">
          <div>
            <p className="esp-stat-rotulo truncate max-w-48">{principal.nome}</p>
            <p className="esp-stat-valor">
              {principal.linha.pos}º<small>{principal.linha.pts} pts</small>
            </p>
          </div>
        </div>
      )}
      {ultimos.length > 0 && (
        <div className="esp-stat">
          <div>
            <p className="esp-stat-rotulo">últimos {ultimos.length} jogos</p>
            <div className="esp-forma">
              {ultimos.map((r) => (
                <SeloVD key={r.id} resultado={r.resultado} />
              ))}
            </div>
          </div>
        </div>
      )}
      {aproveitamento !== null && (
        <div className="esp-stat">
          <div>
            <p className="esp-stat-rotulo">aproveitamento</p>
            <p className="esp-stat-valor">
              {aproveitamento}
              <small>%</small>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// linha de um time na tabela de uma competição (ou undefined)
function naTabela(dados, competicao, time) {
  return dados.classificacao[competicao]?.find((l) => l.time === time);
}

// faixa de informações curtas dentro de um card: [{ rotulo, valor }]
function Contexto({ itens }) {
  const visiveis = itens.filter((i) => i.valor);
  if (visiveis.length === 0) return null;
  return (
    <dl className="esp-contexto" style={{ "--colunas": visiveis.length }}>
      {visiveis.map((i) => (
        <div key={i.rotulo} className="esp-contexto-item">
          <dt>{i.rotulo}</dt>
          <dd>{i.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- último resultado: placar grande ---------- */
function UltimoResultado({ jogo, casa, dados, resultados, EscudoCasa }) {
  if (!jogo) {
    return (
      <div className="esp-card">
        <p className="esp-vazio">nenhum resultado registrado ainda</p>
      </div>
    );
  }
  const vitoria = jogo.resultado === "V";
  const [m, v] = placar(jogo);
  const linha = naTabela(dados, jogo.competicao, casa);
  // quantos resultados iguais seguidos, contando do mais recente
  let seguidos = 0;
  while (seguidos < resultados.length && resultados[seguidos].resultado === jogo.resultado) seguidos++;
  const palavra = vitoria ? "vitória" : "derrota";
  return (
    <article className="esp-card flex flex-1 flex-col">
      <div className="esp-card-topo">
        <span className="esp-card-comp">{jogo.competicao}</span>
        <span className="shrink-0 text-slate-400">{jogo.data}</span>
      </div>

      <div className="esp-placar">
        <div className="esp-time">
          <Escudo nome={jogo.mandante} casa={casa} EscudoCasa={EscudoCasa} />
          <p className={`esp-time-nome ${jogo.mandante === casa ? "" : "is-fora"}`}>{jogo.mandante}</p>
        </div>
        <div className="text-center">
          <p className="esp-gols" aria-label={`${m} a ${v}`}>
            <span className={m > v ? "" : "is-menor"}>{m}</span>
            <span className="esp-gols-x" aria-hidden="true">×</span>
            <span className={m > v ? "is-menor" : ""}>{v}</span>
          </p>
          <span className={`esp-tag ${vitoria ? "is-v" : "is-d"}`}>{vitoria ? "vitória" : "derrota"}</span>
        </div>
        <div className="esp-time">
          <Escudo nome={jogo.visitante} casa={casa} EscudoCasa={EscudoCasa} />
          <p className={`esp-time-nome ${jogo.visitante === casa ? "" : "is-fora"}`}>{jogo.visitante}</p>
        </div>
      </div>

      <Contexto
        itens={[
          { rotulo: "na tabela", valor: linha && `${linha.pos}º · ${linha.pts} pts` },
          { rotulo: "sequência", valor: seguidos > 1 ? `${seguidos} ${palavra}s seguidas` : `1 ${palavra}` },
          { rotulo: "campanha", valor: linha && `${linha.v}V ${linha.d}D em ${linha.j}` },
        ]}
      />

      <Periodos jogo={jogo} casa={casa} />

      <div className="esp-card-rodape mt-auto">
        <span className="inline-flex items-center gap-1.5 min-w-0">
          <MapPin size={12} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{jogo.local}</span>
        </span>
        <a href="#resultados" className="esp-link">
          outros resultados <span aria-hidden="true">↓</span>
        </a>
      </div>
    </article>
  );
}

// placar de cada período: 1º e 2º tempo (handebol) ou cada set (vôlei, tênis de mesa)
function Periodos({ jogo, casa }) {
  let periodos = [];
  if (jogo.intervalo) {
    const [m1, v1] = jogo.intervalo.split("-").map(Number);
    const [m, v] = placar(jogo);
    periodos = [
      { rotulo: "1º tempo", m: m1, v: v1 },
      { rotulo: "2º tempo", m: m - m1, v: v - v1 },
    ];
  } else if (jogo.parciais?.length) {
    periodos = jogo.parciais.map((p, i) => {
      const [m, v] = p.split("-").map(Number);
      return { rotulo: `${i + 1}º set`, m, v };
    });
  }
  if (periodos.length === 0) return null;
  const casaMandante = jogo.mandante === casa;

  return (
    <div className="esp-periodos">
      <p className="esp-periodos-titulo">
        <span>{jogo.intervalo ? "placar por tempo" : "placar por set"}</span>
        <span>
          {casaMandante ? "taubaté × adversário" : "adversário × taubaté"}
        </span>
      </p>
      <ul>
        {periodos.map((p) => (
          <li key={p.rotulo} className="esp-periodo" aria-label={`${p.rotulo}: ${p.m} a ${p.v}`}>
            <span className="esp-periodo-rotulo">{p.rotulo}</span>
            <b className={p.m >= p.v ? "" : "is-menor"}>{p.m}</b>
            <span className="esp-periodo-barra" aria-hidden="true">
              <i className={casaMandante ? "is-casa" : ""} style={{ flexGrow: p.m }} />
              <i className={casaMandante ? "" : "is-casa"} style={{ flexGrow: p.v }} />
            </span>
            <b className={p.v >= p.m ? "" : "is-menor"}>{p.v}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- próximo jogo: contagem regressiva + ingresso ---------- */
// contagem só em dias e horas: o horário do jogo é aproximado
// (sem minutos e segundos, o site não "promete" um início exato)
function Contagem({ inicio, hora }) {
  const [agora, setAgora] = useState(() => Date.now());
  const falta = inicio.getTime() - agora;
  const futuro = falta > 0;

  // só fica contando enquanto o jogo ainda não começou
  useEffect(() => {
    if (!futuro) return;
    const intervalo = setInterval(() => setAgora(Date.now()), 60000);
    return () => clearInterval(intervalo);
  }, [futuro]);

  const p = (n) => String(n).padStart(2, "0");
  // jogo já começou (ou a data já passou): mostra a data no lugar da contagem
  const blocos = futuro
    ? [
        [p(Math.floor(falta / 86400000)), "dias"],
        [p(Math.floor(falta / 3600000) % 24), "horas"],
        [`~${horaAproximada(hora)}`, "início aprox."],
      ]
    : [
        [p(inicio.getDate()), "dia"],
        [MESES[inicio.getMonth()], "mês"],
        [`~${horaAproximada(hora)}`, "início aprox."],
      ];

  return (
    <div className="esp-contagem" role="timer" aria-label={futuro ? "contagem regressiva aproximada para o jogo" : "data do jogo"}>
      {blocos.map(([valor, rotulo]) => (
        <div key={rotulo} className="esp-contagem-item">
          <b>{valor}</b>
          <span>{rotulo}</span>
        </div>
      ))}
    </div>
  );
}

function ProximoJogo({ jogo, casa, dados }) {
  if (!jogo) {
    return (
      <div className="esp-card">
        <p className="esp-vazio">nenhum jogo agendado no momento</p>
      </div>
    );
  }
  const mandante = jogo.mandante ? casa : jogo.adversario;
  const visitante = jogo.mandante ? jogo.adversario : casa;
  const inicio = lerData(jogo.data, jogo.hora);
  // o que já se sabe do adversário: posição na tabela e histórico contra ele
  const rival = naTabela(dados, jogo.competicao, jogo.adversario);
  const duelo = dados.confrontos.find((c) => c.adversario === jogo.adversario);
  const ultimoDuelo = duelo?.historico[0];

  return (
    <article className="esp-card">
      <div className="esp-card-topo">
        <span className="esp-card-comp">{jogo.competicao}</span>
        {jogo.entradaLivre ? (
          <span className="esp-chip is-livre">
            <DoorOpen size={12} aria-hidden="true" /> entrada livre
          </span>
        ) : (
          <span className="esp-chip is-ingresso">
            <Ticket size={12} aria-hidden="true" /> ingresso
          </span>
        )}
      </div>

      <Contagem inicio={inicio} hora={jogo.hora} />

      <p className="esp-confronto">
        <span className={mandante === casa ? "" : "text-slate-300"}>{mandante}</span>
        <span className="esp-confronto-vs">vs</span>
        <span className={visitante === casa ? "" : "text-slate-300"}>{visitante}</span>
      </p>
      <p className="esp-meta">
        <span>
          <CalendarDays size={12} aria-hidden="true" /> {DIAS[inicio.getDay()]} · {jogo.data}
        </span>
        <span>
          <Clock size={12} aria-hidden="true" /> por volta das {horaAproximada(jogo.hora)}
        </span>
        <span>
          <MapPin size={12} aria-hidden="true" /> {jogo.local}
        </span>
      </p>
      <p className="esp-nota">horário aproximado, pode mudar. chegue com antecedência.</p>

      <Contexto
        itens={[
          { rotulo: "adversário na tabela", valor: rival && `${rival.pos}º · ${rival.pts} pts` },
          { rotulo: "retrospecto", valor: duelo && `${duelo.vitorias}V ${duelo.derrotas}D` },
          {
            rotulo: "último duelo",
            valor: ultimoDuelo && (
              <span className="inline-flex items-center gap-1.5">
                {ultimoDuelo.placar} <SeloVD resultado={ultimoDuelo.resultado} />
              </span>
            ),
          },
        ]}
      />

      <div className="esp-acoes">
        {jogo.entradaLivre ? (
          <span className="esp-aviso is-livre">acesso gratuito para o público</span>
        ) : jogo.ingresso?.disponivel ? (
          <a href={jogo.ingresso.link} className="esp-cta">
            <span>
              comprar ingresso <span className="esp-cta-seta" aria-hidden="true">→</span>
            </span>
          </a>
        ) : (
          <span className="esp-aviso">ingressos em breve</span>
        )}
        <a
          href={linkAgenda(jogo, `${mandante} X ${visitante}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="esp-link"
          aria-label="adicionar o jogo ao google agenda (abre em nova aba)"
        >
          <CalendarPlus size={15} aria-hidden="true" /> adicionar à agenda
        </a>
      </div>
    </article>
  );
}

function JogoSeguinte({ jogo, casa }) {
  const inicio = lerData(jogo.data, jogo.hora);
  const mandante = jogo.mandante ? casa : jogo.adversario;
  const visitante = jogo.mandante ? jogo.adversario : casa;
  return (
    <div className="esp-depois">
      <div className="esp-data-bloco">
        <b>{String(inicio.getDate()).padStart(2, "0")}</b>
        <span>{MESES[inicio.getMonth()]}</span>
      </div>
      <div className="esp-depois-info">
        <p className="esp-depois-comp">
          {jogo.competicao} · {jogo.mandante ? "em casa" : "fora"}
        </p>
        <p className="esp-depois-jogo">
          {mandante} × {visitante}
        </p>
      </div>
      <span className="esp-chip is-agendado" title="horário aproximado">~{horaAproximada(jogo.hora)}</span>
    </div>
  );
}

/* ---------- demais resultados: trilho com setas ---------- */
function TrilhoResultados({ jogos, titulo }) {
  const trilhoRef = useRef(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(true);

  function atualizarSetas() {
    const t = trilhoRef.current;
    if (!t) return;
    setInicio(t.scrollLeft <= 4);
    setFim(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  }

  useEffect(() => {
    atualizarSetas();
    window.addEventListener("resize", atualizarSetas);
    return () => window.removeEventListener("resize", atualizarSetas);
  }, [jogos.length]);

  function rolar(direcao) {
    const t = trilhoRef.current;
    t?.scrollBy({ left: direcao * t.clientWidth * 0.9, behavior: "smooth" });
  }

  return (
    <section id="resultados" aria-labelledby="esp-resultados" className="scroll-mt-28">
      <div className="flex items-center justify-between gap-3 mb-5">
        <SecaoTitulo id="esp-resultados">{titulo}</SecaoTitulo>
        <div className="hidden sm:flex gap-2">
          <button type="button" onClick={() => rolar(-1)} disabled={inicio} aria-label="resultados anteriores" className="esp-seta">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => rolar(1)} disabled={fim} aria-label="mais resultados" className="esp-seta">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul ref={trilhoRef} onScroll={atualizarSetas} className="esp-trilho">
        {jogos.map((j) => {
          const [m, v] = placar(j);
          return (
            <li key={j.id} className={`esp-mini ${j.resultado === "V" ? "is-v" : "is-d"}`}>
              <p className="esp-mini-topo">
                <span>{j.competicao}</span>
                <span>{j.data.slice(0, 5)}</span>
              </p>
              <p className={`esp-mini-linha ${m > v ? "" : "is-menor"}`}>
                <span>{j.mandante}</span>
                <b>{m}</b>
              </p>
              <p className={`esp-mini-linha ${m > v ? "is-menor" : ""}`}>
                <span>{j.visitante}</span>
                <b>{v}</b>
              </p>
              <div className="esp-mini-rodape">
                <Detalhe jogo={j} />
                <span className="truncate">{j.local}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- temporada em números + competições ---------- */
function Temporada({ dados, resultados, casa, titulo }) {
  const unidade = resultados[0]?.golsMandante !== undefined ? "gols" : "sets";
  const media = (n) => (resultados.length ? (n / resultados.length).toFixed(1).replace(".", ",") : "0");

  // placar do ponto de vista de taubaté
  const jogos = resultados.map((j) => {
    const [m, v] = placar(j);
    const emCasa = j.mandante === casa;
    return { ...j, pro: emCasa ? m : v, contra: emCasa ? v : m, rival: emCasa ? j.visitante : j.mandante };
  });
  const pro = jogos.reduce((s, j) => s + j.pro, 0);
  const contra = jogos.reduce((s, j) => s + j.contra, 0);
  const vitorias = jogos.filter((j) => j.resultado === "V");
  const maior = vitorias.reduce((a, j) => (!a || j.pro - j.contra > a.pro - a.contra ? j : a), null);

  const numeros = [
    { rotulo: "jogos", valor: jogos.length, extra: "na temporada" },
    {
      rotulo: "vitórias",
      valor: vitorias.length,
      extra: `${jogos.length - vitorias.length} ${jogos.length - vitorias.length === 1 ? "derrota" : "derrotas"}`,
    },
    { rotulo: `${unidade} pró`, valor: pro, extra: `média ${media(pro)} por jogo` },
    { rotulo: `${unidade} contra`, valor: contra, extra: `média ${media(contra)} por jogo` },
    { rotulo: "saldo", valor: saldo(`${pro}-${contra}`), extra: `de ${unidade}` },
    { rotulo: "maior vitória", valor: maior ? `${maior.pro}–${maior.contra}` : "—", extra: maior ? `vs ${maior.rival}` : "ainda não houve" },
  ];

  return (
    <section id="temporada" aria-labelledby="esp-temporada" className="scroll-mt-28">
      <SecaoTitulo id="esp-temporada">{titulo}</SecaoTitulo>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-start">
        <ul className="esp-numeros">
          {numeros.map((n) => (
            <li key={n.rotulo} className="esp-numero">
              <span className="esp-numero-rotulo">{n.rotulo}</span>
              <b>{n.valor}</b>
              <span className="esp-numero-extra">{n.extra}</span>
            </li>
          ))}
        </ul>

        <article className="esp-card">
          <p className="esp-card-topo">
            <span className="esp-card-comp">competições disputadas</span>
            <span className="shrink-0 text-slate-400">{dados.competicoesDisputadas.length}</span>
          </p>
          <ul className="esp-comps">
            {dados.competicoesDisputadas.map((c) => {
              const linha = naTabela(dados, c.nome, casa);
              return (
                <li key={c.nome}>
                  <span className={`esp-comp-pos ${linha ? "" : "is-vazio"}`} aria-label={linha ? `${linha.pos}º lugar` : "sem posição"}>
                    {linha ? `${linha.pos}º` : "—"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="esp-comp-nome">{c.nome}</p>
                    <p className="esp-comp-info">
                      {linha ? `${linha.pts} pts · ${linha.j}J ${linha.v}V ${linha.d}D` : c.obs || "aguardando classificação"}
                    </p>
                  </div>
                  {linha?.pos === 1 && <span className="esp-chip is-livre">líder</span>}
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}

/* ---------- classificação ---------- */
function Classificacao({ dados, titulo, segunda }) {
  const nomes = dados.competicoesDisputadas.map((c) => c.nome);
  const [indice, setIndice] = useState(0);
  const [completa, setCompleta] = useState(false);
  const linhas = dados.classificacao[nomes[indice]];

  // fechada: 4 primeiros + a linha de taubaté se ela estiver mais abaixo
  const visiveis = !linhas
    ? []
    : completa
      ? linhas
      : linhas.filter((l, i) => i < 4 || l.taubate);

  return (
    <section id="classificacao" aria-labelledby="esp-classificacao" className="scroll-mt-28">
      <SecaoTitulo id="esp-classificacao" segunda={segunda}>
        {titulo}
      </SecaoTitulo>
      <article className="esp-card mt-5">
        <Seletor
          itens={nomes}
          indice={indice}
          setIndice={(f) => {
            setIndice(f);
            setCompleta(false);
          }}
          rotulo="competição"
        />
        {linhas ? (
          <>
            <table className="esp-tabela">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">time</th>
                  <th scope="col" title="jogos">j</th>
                  <th scope="col" title="vitórias">v</th>
                  <th scope="col" title="derrotas">d</th>
                  <th scope="col" title={linhas[0].gols ? "saldo de gols" : "saldo de sets"}>saldo</th>
                  <th scope="col" title="pontos">pts</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.map((l, i) => {
                  const pro = l.gols ?? l.sets;
                  return (
                    <tr
                      key={l.pos}
                      className={`${l.taubate ? "is-casa" : ""} ${i > 0 && l.pos - visiveis[i - 1].pos > 1 ? "is-corte" : ""}`}
                    >
                      <td className="esp-pos">{l.pos}</td>
                      <td title={l.time}>{l.time}</td>
                      <td>{l.j}</td>
                      <td className="text-emerald-400">{l.v}</td>
                      <td className="text-red-400">{l.d}</td>
                      <td title={`${l.gols ? "gols" : "sets"} ${pro}`}>{saldo(pro)}</td>
                      <td className="esp-pts">{l.pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="esp-card-rodape mt-1" style={{ borderTop: 0 }}>
              <span>
                {visiveis.length} de {linhas.length} times
              </span>
              {linhas.length > visiveis.length || completa ? (
                <button type="button" onClick={() => setCompleta((c) => !c)} className="esp-link" aria-expanded={completa}>
                  {completa ? "mostrar menos" : "tabela completa"}
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${completa ? "rotate-180" : ""}`}
                  />
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <div className="esp-vazio">
            <Trophy size={24} className="mx-auto mb-2" aria-hidden="true" />
            classificação ainda não disponível
            <br />
            equipe aguardando classificação
          </div>
        )}
      </article>
    </section>
  );
}

/* ---------- confrontos ---------- */
function Confrontos({ confrontos, casa, titulo, segunda }) {
  const [indice, setIndice] = useState(0);
  const c = confrontos[indice];
  const total = c.vitorias + c.derrotas;
  const pctV = total ? (c.vitorias / total) * 100 : 50;

  return (
    <section id="confrontos" aria-labelledby="esp-confrontos" className="scroll-mt-28">
      <SecaoTitulo id="esp-confrontos" segunda={segunda}>
        {titulo}
      </SecaoTitulo>
      <article className="esp-card mt-5">
        <Seletor
          itens={confrontos.map((x) => `vs ${x.adversario}`)}
          indice={indice}
          setIndice={setIndice}
          rotulo="adversário"
        />
        <div className="esp-duelo">
          <div>
            <p className="esp-duelo-num text-emerald-400">{c.vitorias}</p>
            <p className="esp-duelo-rotulo">vitórias</p>
          </div>
          <Escudo nome={c.adversario} casa={casa} />
          <div>
            <p className="esp-duelo-num text-red-400">{c.derrotas}</p>
            <p className="esp-duelo-rotulo">derrotas</p>
          </div>
        </div>
        <div className="esp-barra" aria-hidden="true">
          <i style={{ width: `${pctV}%`, background: "var(--esp-v)" }} />
          <i style={{ width: `${100 - pctV}%`, background: "var(--esp-d)" }} />
        </div>
        <ul className="esp-historico">
          {c.historico.map((h) => (
            <li key={h.data}>
              <SeloVD resultado={h.resultado} />
              <div className="esp-historico-info">
                <p>{h.competicao}</p>
                <p>{h.data}</p>
              </div>
              <b>{h.placar}</b>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

/* ---------- calendário completo, agrupado por mês ---------- */
function Calendario({ dados, titulo }) {
  const [filtro, setFiltro] = useState("Todos");
  const nomes = dados.competicoesDisputadas.map((c) => c.nome);

  const meses = useMemo(() => {
    // jogo com data que já passou não pode mais ser "reservado",
    // mesmo que o placar ainda não tenha sido cadastrado
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const lista = dados.calendario
      .filter((j) => filtro === "Todos" || j.competicao === filtro)
      .map((j) => ({ ...j, quando: lerData(j.data) }))
      .map((j) => ({ ...j, passou: j.status !== "encerrado" && j.quando < hoje }))
      .sort((a, b) => a.quando - b.quando);
    const grupos = [];
    for (const j of lista) {
      const chave = `${MESES_NOME[j.quando.getMonth()]} ${j.quando.getFullYear()}`;
      const grupo = grupos.find((g) => g.chave === chave);
      if (grupo) grupo.jogos.push(j);
      else grupos.push({ chave, jogos: [j] });
    }
    return grupos;
  }, [dados, filtro]);

  return (
    <section id="calendario" aria-labelledby="esp-calendario" className="scroll-mt-28">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <SecaoTitulo id="esp-calendario">{titulo}</SecaoTitulo>
        <div className="relative w-full sm:w-auto">
          <label htmlFor="esp-filtro-cal" className="sr-only">
            filtrar por campeonato
          </label>
          <select id="esp-filtro-cal" value={filtro} onChange={(e) => setFiltro(e.target.value)} className="esp-select">
            <option value="Todos">todos os campeonatos</option>
            {nomes.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown size={16} aria-hidden="true" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-200 pointer-events-none" />
        </div>
      </div>

      {meses.length === 0 ? (
        <p className="esp-vazio">nenhum jogo encontrado para este filtro</p>
      ) : (
        <div className="flex flex-col gap-7">
          {meses.map((m) => (
            <div key={m.chave}>
              <h3 className="esp-mes">{m.chave}</h3>
              <ul className="esp-cal-lista">
                {m.jogos.map((j) => (
                  <li key={j.id} className="esp-cal-item">
                    <div className="esp-data-bloco">
                      <b>{String(j.quando.getDate()).padStart(2, "0")}</b>
                      <span>{DIAS[j.quando.getDay()]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="esp-depois-comp">{j.competicao}</p>
                      <p className="esp-depois-jogo">{j.confronto}</p>
                      <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold tracking-wider text-slate-400">
                        <MapPin size={11} aria-hidden="true" /> {j.local}
                      </p>
                    </div>
                    {j.status === "encerrado" ? (
                      <SeloVD resultado={j.resultado} />
                    ) : j.passou ? (
                      <span className="esp-chip is-encerrado" title="placar ainda não divulgado">
                        encerrado
                      </span>
                    ) : (
                      <span className="esp-chip is-agendado">
                        {j.ingresso && <Ticket size={12} aria-label="com ingresso" className="text-amber-300" />}
                        reservar
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/*
  esporte: o módulo de src/data (CATEGORIAS, TIME_CASA, DADOS)
  titulo + destaque: o nome do esporte; o destaque sai em tons de azul ("HANDE" + "BOL")
  cores: { accent, claro, ceu, on } — cor do esporte, títulos, títulos secundários
         e texto sobre a cor do esporte
  ordem: sequência dos blocos (destaque, resultados, temporada, tabelas, calendario);
         "destaque:invertido" / "tabelas:invertido" trocam os dois lados de lugar
  titulos: troca os nomes das seções (as chaves de TITULOS_PADRAO)
  escudo: o componente do escudo do time (src/components/Escudos)
*/
const ORDEM_PADRAO = ["destaque", "resultados", "temporada", "tabelas", "calendario"];
const TITULOS_PADRAO = {
  ultimo: "último resultado",
  proximo: "próximo jogo",
  temporada: "temporada em números",
  resultados: "resultados",
  classificacao: "classificação",
  confrontos: "confrontos",
  calendario: "calendário completo",
};

export default function PaginaEsporte({ esporte, titulo, destaque, cores, ordem = ORDEM_PADRAO, titulos = {}, escudo }) {
  const { CATEGORIAS, TIME_CASA, DADOS } = esporte;
  const [categoria, setCategoria] = useState(CATEGORIAS[0].id);
  const dados = DADOS[categoria];

  // mais recentes primeiro (resultados) e mais próximos primeiro (agenda)
  const resultados = useMemo(
    () => [...dados.resultados].sort((a, b) => lerData(b.data) - lerData(a.data)),
    [dados]
  );
  const proximos = useMemo(
    () => [...dados.proximosJogos].sort((a, b) => lerData(a.data, a.hora) - lerData(b.data, b.hora)),
    [dados]
  );

  const estiloCores = {
    "--esp-accent": cores.accent,
    "--esp-claro": cores.claro,
    "--esp-ceu": cores.ceu,
    "--esp-on": cores.on,
  };
  const t = { ...TITULOS_PADRAO, ...titulos };

  // cada bloco da página; "invertido" troca os dois lados de lugar
  const blocos = {
    // o principal logo de cara: último resultado e próximo jogo
    destaque: (invertido) => {
      const ultimo = (segunda, atraso) => (
        <section key="ultimo" id="ultimo-resultado" aria-labelledby="esp-ultimo" className="scroll-mt-28 esp-sobe flex flex-col" style={{ "--atraso": atraso }}>
          <SecaoTitulo id="esp-ultimo" segunda={segunda}>
            {t.ultimo}
          </SecaoTitulo>
          <div className="mt-5 flex flex-1 flex-col">
            <UltimoResultado jogo={resultados[0]} casa={TIME_CASA} dados={dados} resultados={resultados} EscudoCasa={escudo} />
          </div>
        </section>
      );
      const proximo = (segunda, atraso) => (
        <section key="proximo" id="proximos-jogos" aria-labelledby="esp-proximo" className="scroll-mt-28 esp-sobe" style={{ "--atraso": atraso }}>
          <SecaoTitulo id="esp-proximo" segunda={segunda}>
            {t.proximo}
          </SecaoTitulo>
          <div className="mt-5">
            <ProximoJogo jogo={proximos[0]} casa={TIME_CASA} dados={dados} />
            {proximos.slice(1).map((j) => (
              <JogoSeguinte key={j.id} jogo={j} casa={TIME_CASA} />
            ))}
          </div>
        </section>
      );
      return (
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-[1.15fr_1fr]">
          {invertido ? [proximo(false, "0.3s"), ultimo(true, "0.4s")] : [ultimo(false, "0.3s"), proximo(true, "0.4s")]}
        </div>
      );
    },
    resultados: () =>
      resultados.length > 1 && <TrilhoResultados jogos={resultados.slice(1)} titulo={t.resultados} />,
    tabelas: (invertido) => {
      const tabela = (segunda) => <Classificacao key="tabela" dados={dados} titulo={t.classificacao} segunda={segunda} />;
      const duelos = (segunda) => (
        <Confrontos key="duelos" confrontos={dados.confrontos} casa={TIME_CASA} titulo={t.confrontos} segunda={segunda} />
      );
      return (
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 lg:grid-cols-2 items-start">
          {invertido ? [duelos(false), tabela(true)] : [tabela(false), duelos(true)]}
        </div>
      );
    },
    temporada: () =>
      resultados.length > 0 && <Temporada dados={dados} resultados={resultados} casa={TIME_CASA} titulo={t.temporada} />,
    calendario: () => <Calendario dados={dados} titulo={t.calendario} />,
  };

  return (
    <>
      <div className="esp uppercase pb-16 sm:pb-20" style={estiloCores}>
        {/* topo: título, categorias e resumo da temporada */}
        <section className="esp-topo pt-10 sm:pt-14 pb-8 sm:pb-10">
          <div className="esp-conteudo flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <div>
              <h1 className="esp-titulo esp-sobe" aria-label={`${titulo}${destaque}`}>
                <span aria-hidden="true">{titulo}</span>
                {destaque.split("").map((letra, i) => (
                  <span key={i} aria-hidden="true" className="esp-letra-cor">
                    {letra}
                  </span>
                ))}
              </h1>
              <p className="esp-sub esp-sobe" style={{ "--atraso": "0.15s" }}>
                {TIME_CASA} · temporada 2026
              </p>
              <div className="esp-filtros esp-sobe" style={{ "--atraso": "0.25s" }} role="group" aria-label="Escolher categoria">
                {CATEGORIAS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={categoria === c.id}
                    onClick={() => setCategoria(c.id)}
                    className="esp-filtro"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <Resumo key={categoria} dados={dados} resultados={resultados} />
          </div>
        </section>

        {/* tudo abaixo recomeça do zero ao trocar de categoria */}
        <div key={categoria} className="esp-conteudo">
          {ordem.map((item, i) => {
            const [bloco, invertido] = item.split(":");
            const conteudo = blocos[bloco](invertido === "invertido");
            if (!conteudo) return null;
            return (
              <div key={bloco} className={i > 0 ? "mt-12 sm:mt-14" : ""}>
                {conteudo}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button espacoFinal={false} />
    </>
  );
}
