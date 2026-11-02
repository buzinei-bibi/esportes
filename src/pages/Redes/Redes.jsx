import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Button from "../../components/Button/Button";
import { EscudoHandebol, EscudoVolei, EscudoTenisDeMesa } from "../../components/Escudos/Escudos";
import { ESPORTES, REDES_SOCIAIS } from "../../data/jogos";
import "./Redes.css";

// página de links das redes, separada do site (sem header nem rodapé), aberta em nova aba.
// tudo numa página só: um card por equipe com os links oficiais de cada rede.
// ?rede=instagram destaca os botões da rede escolhida no rodapé/contato.

const ESCUDOS = { handebol: EscudoHandebol, volei: EscudoVolei, "tenis-de-mesa": EscudoTenisDeMesa };
// mesma cor de cada esporte usada no banner e nas páginas
const CORES = {
  handebol: { accent: "#2563eb", claro: "#60a5fa" },
  volei: { accent: "#38bdf8", claro: "#7dd3fc" },
  "tenis-de-mesa": { accent: "#818cf8", claro: "#a5b4fc" },
};

function CardEquipe({ esporte, destaque, i }) {
  const Escudo = ESCUDOS[esporte.id];
  const redes = esporte.dados.REDES ?? {};
  const tem = REDES_SOCIAIS.filter((r) => redes[r.id]);
  // "youtube" / "facebook e youtube" / "facebook, instagram e youtube"
  const falta = REDES_SOCIAIS.filter((r) => !redes[r.id]).map((r) => r.nome);
  const textoFalta = falta.length > 1 ? `${falta.slice(0, -1).join(", ")} e ${falta.at(-1)}` : falta[0];

  return (
    <li className="lk-item" style={{ "--i": i + 4, "--lk-esporte": CORES[esporte.id].accent, "--lk-esporte-claro": CORES[esporte.id].claro }}>
      <article className="lk-card">
        <Escudo className="lk-escudo" titulo="" />
        <p className="lk-card-esporte">{esporte.nome}</p>
        <h2 className="lk-card-time">{esporte.dados.TIME_CASA}</h2>

        <ul className="lk-links">
          {tem.map((r) => (
            <li key={r.id}>
              <a
                href={redes[r.id]}
                target="_blank"
                rel="noopener noreferrer"
                className={`lk-link ${destaque === r.id ? "is-destaque" : ""}`}
                style={{ "--lk-rede": r.cor }}
              >
                <i className={`bi ${r.icone} lk-link-icone`} aria-hidden="true"></i>
                <b className="lk-link-texto">{r.nome}</b>
                <ArrowUpRight size={16} aria-hidden="true" className="lk-link-seta" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
          {redes.site && (
            <li>
              <a href={redes.site} target="_blank" rel="noopener noreferrer" className="lk-link" style={{ "--lk-rede": "#64748b" }}>
                <i className="bi bi-globe2 lk-link-icone" aria-hidden="true"></i>
                <b className="lk-link-texto">site da equipe</b>
                <ArrowUpRight size={16} aria-hidden="true" className="lk-link-seta" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          )}
        </ul>

        {falta.length > 0 && <p className="lk-falta">ainda sem {textoFalta} oficial</p>}
      </article>
    </li>
  );
}

export default function Redes() {
  const [params] = useSearchParams();
  const destaque = REDES_SOCIAIS.find((r) => r.id === params.get("rede"))?.id;

  // é um "site à parte": título próprio na aba
  useEffect(() => {
    const anterior = document.title;
    document.title = "Redes das equipes · Taubaté Esportes";
    return () => {
      document.title = anterior;
    };
  }, []);

  return (
    <div className="lk uppercase">
      <div className="lk-varre" aria-hidden="true" />

      <main className="lk-conteudo">
        <header className="lk-topo">
          <Link to="/" className="lk-marca lk-sobe" aria-label="Taubaté Esportes: ir para o site">
            <img src="/Imagens/logotipo.png" alt="" />
            <span>
              taubaté <em>esportes</em>
            </span>
          </Link>

          <p className="lk-sobretitulo lk-sobe" style={{ "--atraso": "0.1s" }}>
            redes oficiais das equipes
          </p>
          <h1 className="lk-titulo lk-sobe" style={{ "--atraso": "0.18s" }}>
            siga as equipes <em>de taubaté</em>
          </h1>

          {/* as três redes: escolher uma destaca os botões dela nos cards */}
          <nav className="lk-redes lk-sobe" style={{ "--atraso": "0.28s" }} aria-label="Destacar uma rede social">
            {REDES_SOCIAIS.map((r) => (
              <Link
                key={r.id}
                to={destaque === r.id ? "/redes" : `/redes?rede=${r.id}`}
                replace
                aria-pressed={destaque === r.id}
                className="lk-rede"
                style={{ "--lk-rede": r.cor }}
              >
                <i className={`bi ${r.icone}`} aria-hidden="true"></i>
                {r.nome}
              </Link>
            ))}
          </nav>
        </header>

        <ul className="lk-cards">
          {ESPORTES.map((e, i) => (
            <CardEquipe key={e.id} esporte={e} destaque={destaque} i={i} />
          ))}
        </ul>

        <footer className="lk-rodape lk-item" style={{ "--i": 8 }}>
          <Link to="/" className="lk-voltar">
            ← ir para o site taubaté esportes
          </Link>
        </footer>
      </main>

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button espacoFinal={false} />
    </div>
  );
}
