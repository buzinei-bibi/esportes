import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { ESPORTES, listarProximosJogos, horaAproximada } from "../../data/jogos";
import { EscudoHandebol, EscudoVolei, EscudoTenisDeMesa } from "../Escudos/Escudos";
import "./SobreSite.css";

// abaixo do banner: explica o que é o portal e apresenta as equipes
// (mesma linguagem visual das outras páginas: fonte condensada, cards arredondados)

const ESCUDOS = { handebol: EscudoHandebol, volei: EscudoVolei, "tenis-de-mesa": EscudoTenisDeMesa };
// mesma cor de cada esporte usada no banner e nas páginas
const CORES = {
  handebol: { accent: "#2563eb", claro: "#60a5fa" },
  volei: { accent: "#38bdf8", claro: "#7dd3fc" },
  "tenis-de-mesa": { accent: "#818cf8", claro: "#a5b4fc" },
};

// "03/08/2026" → Date
function lerData(data) {
  const [d, m, a] = data.split("/").map(Number);
  return new Date(a, m - 1, d);
}

// resumo de uma categoria: posição na competição principal e último resultado
function resumoCategoria(esporte, categoria) {
  const { TIME_CASA, DADOS } = esporte.dados;
  const dados = DADOS[categoria.id];
  const principal = dados.competicoesDisputadas
    .map((c) => ({ nome: c.nome, linha: dados.classificacao[c.nome]?.find((l) => l.taubate) }))
    .find((c) => c.linha);
  const ultimo = [...dados.resultados].sort((a, b) => lerData(b.data) - lerData(a.data))[0];
  let placar = null;
  if (ultimo) {
    const m = Number(ultimo.golsMandante ?? ultimo.setsMandante);
    const v = Number(ultimo.golsVisitante ?? ultimo.setsVisitante);
    const emCasa = ultimo.mandante === TIME_CASA;
    placar = { resultado: ultimo.resultado, pro: emCasa ? m : v, contra: emCasa ? v : m };
  }
  return { categoria: categoria.label, principal, placar };
}

function CardTime({ esporte, proximo }) {
  const Escudo = ESCUDOS[esporte.id];
  const categorias = esporte.dados.CATEGORIAS.map((c) => resumoCategoria(esporte, c));

  return (
    <Link to={esporte.rota} className="hs-card" aria-label={`${esporte.nome}: ver resultados e agenda`}>
      {/* faixa que varre o card quando ele aparece */}
      <span className="hs-varre" aria-hidden="true" />
      {/* cabeçalho: escudo + nome */}
      <div className="hs-card-topo">
        <Escudo className="hs-escudo" titulo="" />
        <div className="min-w-0">
          <h3 className="hs-card-nome">{esporte.nome}</h3>
          <p className="hs-card-time">{esporte.dados.TIME_CASA}</p>
        </div>
      </div>

      {/* próximo jogo em destaque */}
      {proximo && (
        <div className="hs-proximo">
          <div className="hs-data">
            <b>{proximo.dia}</b>
            <span>{proximo.mes}</span>
          </div>
          <div className="min-w-0">
            <p className="hs-rotulo">próximo jogo · {proximo.categoria}</p>
            <p className="hs-proximo-vs">vs {proximo.adversario}</p>
            <p className="hs-proximo-meta">
              <span>
                <Clock size={11} aria-hidden="true" /> {proximo.diaSemana} · por volta das {horaAproximada(proximo.hora)}
              </span>
              <span className="min-w-0">
                <MapPin size={11} aria-hidden="true" className="shrink-0" />
                <span className="truncate">{proximo.mandante ? "em casa" : "fora"}</span>
              </span>
            </p>
          </div>
        </div>
      )}

      {/* uma linha por categoria */}
      <ul className="hs-categorias">
        <li className="hs-cat-cabecalho" aria-hidden="true">
          <span>categoria</span>
          <span>na tabela</span>
          <span>último jogo</span>
        </li>
        {categorias.map((c, i) => (
          <li key={c.categoria} style={{ "--j": i + 1 }}>
            <span className="hs-cat-nome">{c.categoria}</span>
            <span className="hs-cat-pos" title={c.principal?.nome}>
              {c.principal ? (
                <>
                  <b>{c.principal.linha.pos}º</b> {c.principal.linha.pts} pts
                </>
              ) : (
                "—"
              )}
            </span>
            {c.placar && (
              <span className="hs-cat-ultimo">
                <span className={`hs-vd ${c.placar.resultado === "V" ? "is-v" : "is-d"}`}>{c.placar.resultado}</span>
                {c.placar.pro}–{c.placar.contra}
              </span>
            )}
          </li>
        ))}
      </ul>

      <span className="hs-card-link" aria-hidden="true">
        resultados e agenda <ArrowRight size={14} className="hs-card-seta" />
      </span>
    </Link>
  );
}

// número que conta do zero até o valor quando o bloco aparece
function Numero({ valor, ativo }) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    const semAnimacao =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.hasAttribute("data-a11y-sem-animacao");
    let quadro;
    let inicio;
    const passo = (t) => {
      inicio ??= t;
      const p = semAnimacao ? 1 : Math.min((t - inicio) / 1100, 1);
      setAtual(Math.round(valor * (1 - Math.pow(1 - p, 3))));
      if (p < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [ativo, valor]);

  return <dd aria-label={String(valor)}>{atual}</dd>;
}

function SobreSite() {
  const secaoRef = useRef(null);
  // blocos já revelados: cada um aparece quando entra na tela
  const [revelados, setRevelados] = useState(() => new Set());

  useEffect(() => {
    const alvos = [...(secaoRef.current?.querySelectorAll("[data-revela]") ?? [])];
    const revelar = (ids) => setRevelados((atual) => new Set([...atual, ...ids]));
    if (!("IntersectionObserver" in window)) {
      revelar(alvos.map((a) => a.dataset.revela));
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        const novos = entradas.filter((e) => e.isIntersecting).map((e) => e.target);
        if (!novos.length) return;
        novos.forEach((alvo) => observador.unobserve(alvo));
        revelar(novos.map((alvo) => alvo.dataset.revela));
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    alvos.forEach((alvo) => observador.observe(alvo));
    return () => observador.disconnect();
  }, []);

  const revelado = (id) => (revelados.has(id) ? "is-revelado" : "");

  const proximos = listarProximosJogos();
  const equipes = ESPORTES.reduce((n, e) => n + e.dados.CATEGORIAS.length, 0);
  // jogos do calendário que ainda vão acontecer (de hoje em diante)
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const agendados = ESPORTES.reduce(
    (n, e) => n + Object.values(e.dados.DADOS).reduce((m, cat) => m + cat.calendario.filter((j) => lerData(j.data) >= hoje).length, 0),
    0
  );

  return (
    <section ref={secaoRef} aria-labelledby="sobre-titulo" className="hs uppercase">
      <div className="hs-conteudo">
        {/* o que é o portal */}
        <div className="hs-intro">
          <div data-revela="intro" className={`hs-revela ${revelado("intro")}`}>
            <p className="hs-sobretitulo">sobre o portal</p>
            {/* cada linha do título sobe de dentro de uma máscara, como no banner */}
            <h2 id="sobre-titulo" className="hs-titulo">
              <span className="hs-linha">
                <span>o esporte de taubaté</span>
              </span>{" "}
              <span className="hs-linha">
                <em>além do futebol</em>
              </span>
            </h2>
            <p className="hs-texto">
              resultados, próximos jogos, classificação e notícias do handebol, do vôlei e do tênis de mesa da cidade,
              tudo num lugar só.
            </p>
          </div>
          <dl data-revela="numeros" className={`hs-numeros hs-revela ${revelado("numeros")}`}>
            {[
              ["modalidades", ESPORTES.length],
              ["equipes", equipes],
              ["jogos na agenda", agendados],
            ].map(([rotulo, valor], i) => (
              <div key={rotulo} style={{ "--i": i }}>
                <dt>{rotulo}</dt>
                <Numero valor={valor} ativo={revelados.has("numeros")} />
              </div>
            ))}
          </dl>
        </div>

        {/* as equipes de cada esporte */}
        <ul className="hs-esportes">
          {ESPORTES.map((e, i) => (
            <li
              key={e.id}
              data-revela={e.id}
              className={`hs-revela ${revelado(e.id)}`}
              style={{ "--i": i, "--hs-accent": CORES[e.id].accent, "--hs-claro": CORES[e.id].claro }}
            >
              <CardTime esporte={e} proximo={proximos.find((j) => j.esporte.id === e.id)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SobreSite;
