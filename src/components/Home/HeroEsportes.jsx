import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play } from "lucide-react";
import { ESPORTES } from "../../data/jogos";
import "./HeroEsportes.css";

// tempo de cada slide: troca logo depois da jogada (gol, saque, toque na bola)
const DURACAO_MS = { handebol: 3400, volei: 2800, "tenis-de-mesa": 2900 };

// texto de cada slide (a ordem segue ESPORTES): nome do esporte + frase de impacto
const SLIDES = {
  handebol: {
    titulo: "HANDEBOL",
    texto: "60 MINUTOS DE INTENSIDADE, GOL ATRÁS DE GOL.",
  },
  volei: {
    titulo: "VÔLEI",
    texto: "A BOLA NÃO PODE CAIR. O PONTO SE DECIDE NO AR.",
  },
  "tenis-de-mesa": {
    titulo: "TÊNIS DE MESA",
    texto: "BOLINHA DE 40 MM, DECISÕES EM FRAÇÕES DE SEGUNDO.",
  },
};

// ---------- cenas animadas (SVG) ----------
// cada cena dura o tempo do slide e termina na jogada principal, quando o banner troca de esporte

// bola de handebol profissional (painéis + costuras)
function BolaHandebol() {
  return (
    <g>
      <circle r="36" fill="url(#he-g-hb)" stroke="#0b1530" strokeWidth="2.5" />
      <path d="M-35 -6 C -18 -30, 18 -30, 35 -6 C 16 -16, -16 -16, -35 -6 Z" fill="var(--he-accent)" />
      <path d="M-31 17 C -12 33, 13 33, 31 17 C 12 24, -12 24, -31 17 Z" fill="#0b1530" />
      <polygon points="0,-11 10,-5 10,6 0,12 -10,6 -10,-5" fill="none" stroke="#0b1530" strokeWidth="2" />
      <path
        d="M0 -11 V-24 M10 -5 L24 -12 M10 6 L25 12 M0 12 V22 M-10 6 L-25 12 M-10 -5 L-24 -12"
        stroke="#0b1530"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="-13" cy="-19" rx="9" ry="4.5" fill="#fff" opacity=".55" transform="rotate(-25 -13 -19)" />
    </g>
  );
}

// bola de vôlei profissional (três faixas curvas)
function BolaVolei() {
  const faixa = "M-34 -12 C -14 -33, 16 -35, 34 -14 L 30 -2 C 12 -20, -12 -20, -34 3 Z";
  return (
    <g>
      <circle r="34" fill="url(#he-g-vb)" />
      {[0, 120, 240].map((angulo) => (
        <path
          key={angulo}
          d={faixa}
          fill="var(--he-accent)"
          stroke="#0b1530"
          strokeWidth="1.5"
          transform={`rotate(${angulo})`}
        />
      ))}
      <circle r="34" fill="none" stroke="#0b1530" strokeWidth="2.5" />
      <ellipse cx="-12" cy="-18" rx="8" ry="4" fill="#fff" opacity=".6" transform="rotate(-25 -12 -18)" />
    </g>
  );
}

// handebol: dribla três vezes, salta e arremessa no gol
function CenaHandebol() {
  return (
    <svg viewBox="0 0 400 400" className="he-cena">
      <defs>
        <radialGradient id="he-g-hb" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#b6c2d4" />
        </radialGradient>
        <pattern id="he-rede-hb" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V14 M0 0 H14" stroke="#cbd5e1" strokeWidth="1.2" />
        </pattern>
      </defs>

      {/* chão */}
      <line x1="0" y1="361" x2="400" y2="361" stroke="var(--he-accent)" strokeWidth="2" opacity=".35" />

      {/* gol: rede + traves listradas */}
      <g className="hb-rede">
        <rect x="221" y="216" width="190" height="145" fill="url(#he-rede-hb)" opacity=".4" />
      </g>
      <path d="M215 361 V210 H410" fill="none" stroke="#f8fafc" strokeWidth="11" />
      <path d="M215 361 V210 H410" fill="none" stroke="var(--he-accent)" strokeWidth="11" strokeDasharray="20 20" />

      <ellipse className="hb-sombra" cx="0" cy="0" rx="32" ry="6" fill="#000" opacity=".35" />

      <g className="hb-bola">
        <g className="hb-rastro" stroke="var(--he-accent)" strokeWidth="5" strokeLinecap="round">
          <line x1="-48" y1="-24" x2="-92" y2="-46" />
          <line x1="-50" y1="0" x2="-104" y2="-14" />
          <line x1="-44" y1="22" x2="-84" y2="16" />
        </g>
        <g className="hb-amassa">
          <g className="he-gira">
            <BolaHandebol />
          </g>
        </g>
      </g>
    </svg>
  );
}

// vôlei: levantamento, saque e a bola cruzando a rede
function CenaVolei() {
  return (
    <svg viewBox="0 0 400 400" className="he-cena">
      <defs>
        <radialGradient id="he-g-vb" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c3cfdf" />
        </radialGradient>
        <pattern id="he-rede-vb" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0 V10 M0 0 H10" stroke="#cbd5e1" strokeWidth="1" />
        </pattern>
      </defs>

      {/* chão */}
      <line x1="0" y1="361" x2="400" y2="361" stroke="var(--he-accent)" strokeWidth="2" opacity=".35" />

      {/* rede vista de lado: poste, malha, fita e antena listrada */}
      <line x1="200" y1="150" x2="200" y2="361" stroke="#94a3b8" strokeWidth="5" />
      <rect x="193" y="156" width="14" height="92" fill="url(#he-rede-vb)" opacity=".7" />
      <rect x="191" y="150" width="18" height="8" fill="#f8fafc" />
      <line x1="200" y1="150" x2="200" y2="116" stroke="#f8fafc" strokeWidth="4" />
      <line x1="200" y1="150" x2="200" y2="116" stroke="var(--he-accent)" strokeWidth="4" strokeDasharray="8.5 8.5" />

      <ellipse className="vb-sombra" cx="0" cy="0" rx="30" ry="6" fill="#000" opacity=".35" />
      <ellipse className="vb-poeira" cx="325" cy="361" rx="34" ry="7" fill="none" stroke="var(--he-accent)" strokeWidth="3" />

      {/* estalo do saque */}
      <g className="vb-estalo" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round">
        <line x1="122" y1="30" x2="122" y2="14" />
        <line x1="150" y1="44" x2="162" y2="32" />
        <line x1="94" y1="44" x2="82" y2="32" />
      </g>

      <g className="vb-bola">
        <g className="vb-amassa">
          <g className="he-gira he-gira-rapido">
            <BolaVolei />
          </g>
        </g>
      </g>
    </svg>
  );
}

// tênis de mesa: a bola quica, a raquete rebate e ela quica na mesa do adversário; aí o banner volta para o handebol
function CenaTenisDeMesa() {
  return (
    <svg viewBox="0 0 400 400" className="he-cena">
      <defs>
        <radialGradient id="he-g-tt" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d0d7e2" />
        </radialGradient>
        {/* raquete no estilo do emoji 🏓, desenhada em SVG para ficar igual em todo aparelho */}
        <radialGradient id="he-g-face" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset=".55" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1e40af" />
        </radialGradient>
        <linearGradient id="he-g-cabo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a5b4fc" />
          <stop offset=".5" stopColor="#e0e7ff" />
          <stop offset="1" stopColor="#a5b4fc" />
        </linearGradient>
        <pattern id="he-pinos" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.3" fill="#1e3a8a" opacity=".35" />
        </pattern>
        <clipPath id="he-recorte-face">
          <circle cx="-75" cy="-77" r="51" />
        </clipPath>
      </defs>

      {/* mesa com rede */}
      <polygon points="0,300 400,300 400,330 0,330" fill="#0f2a5c" />
      <line x1="0" y1="300" x2="400" y2="300" stroke="#f8fafc" strokeWidth="3" />
      <rect x="196" y="270" width="8" height="30" fill="#cbd5e1" opacity=".8" />
      <rect x="160" y="270" width="80" height="4" fill="#f8fafc" opacity=".9" />
      <line x1="200" y1="330" x2="200" y2="380" stroke="#1e293b" strokeWidth="8" />

      <ellipse className="tt-sombra" cx="0" cy="0" rx="5" ry="1.6" fill="#000" opacity=".45" />
      <ellipse className="tt-quique" cx="100" cy="300" rx="12" ry="3" fill="none" stroke="#f8fafc" strokeWidth="1.5" />

      {/* mini raquete azul no estilo do emoji 🏓 (cabe sobre a mesa); gira a partir da ponta do cabo */}
      <g transform="translate(318 294)">
        <g className="tt-raquete">
          <g transform="scale(.3)">
            {/* cabo (fica por baixo da face) */}
            <g transform="rotate(-45)">
              <rect x="-13" y="-96" width="26" height="96" rx="13" fill="url(#he-g-cabo)" />
              <ellipse cx="0" cy="-3" rx="13" ry="7" fill="#818cf8" />
            </g>
            {/* espessura da lâmina */}
            <circle cx="-69" cy="-71" r="52" fill="#93c5fd" />
            {/* face com borracha de pinos e brilho */}
            <circle cx="-75" cy="-77" r="51" fill="url(#he-g-face)" />
            <g clipPath="url(#he-recorte-face)">
              <rect x="-126" y="-128" width="102" height="102" fill="url(#he-pinos)" />
              <ellipse cx="-91" cy="-101" rx="26" ry="15" fill="#fff" opacity=".22" transform="rotate(-35 -91 -101)" />
            </g>
          </g>
        </g>
      </g>

      {/* estalo do toque */}
      <g className="tt-estalo" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round">
        <line x1="263" y1="264" x2="258" y2="259" />
        <line x1="262" y1="274" x2="255" y2="274" />
        <line x1="263" y1="284" x2="258" y2="289" />
      </g>

      <g className="tt-bola">
        <circle r="5" fill="url(#he-g-tt)" stroke="#94a3b8" strokeWidth=".7" />
        <path d="M-4.1 -.9 Q 0 1.9 4.1 -.9" fill="none" stroke="#cbd5e1" strokeWidth=".7" />
      </g>
    </svg>
  );
}

const CENAS = {
  handebol: CenaHandebol,
  volei: CenaVolei,
  "tenis-de-mesa": CenaTenisDeMesa,
};

function Cena({ esporte }) {
  const Componente = CENAS[esporte];
  return <Componente />;
}

// banner principal: troca de modalidade sozinho depois de cada jogada (pausa no mouse/teclado)
function HeroEsportes() {
  const [atual, setAtual] = useState(0);
  const [trocas, setTrocas] = useState(0);
  const [pausado, setPausado] = useState(false);
  // começa "apagado" e liga no primeiro quadro: a pessoa vê a animação de entrada inteira
  const [entrou, setEntrou] = useState(false);
  const abasRef = useRef([]);
  const esporte = ESPORTES[atual];

  useEffect(() => {
    // um instante depois da primeira pintura, para as transições de entrada rodarem
    const id = setTimeout(() => setEntrou(true), 80);
    return () => clearTimeout(id);
  }, []);

  function ir(i, focar = false) {
    const destino = (i + ESPORTES.length) % ESPORTES.length;
    if (focar) abasRef.current[destino]?.focus();
    if (destino === atual) return;
    setAtual(destino);
    setTrocas((t) => t + 1);
  }

  function aoTeclar(e) {
    const mapa = { ArrowRight: atual + 1, ArrowLeft: atual - 1, Home: 0, End: ESPORTES.length - 1 };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    ir(mapa[e.key], true);
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Modalidades do portal"
      data-sport={esporte.id}
      style={{ "--he-autoplay": `${DURACAO_MS[esporte.id]}ms` }}
      className={`he uppercase ${pausado ? "is-paused" : ""}`}
    >
      {/* faixa que varre a tela a cada troca (remonta para reiniciar) */}
      {entrou && <div key={trocas} className="he-sweep" aria-hidden="true" />}

      <div className="he-stage">
        {/* textos */}
        <div id="he-painel" role="tabpanel" aria-labelledby={`he-aba-${esporte.id}`} className="he-copy">
          {ESPORTES.map((e, i) => {
            const slide = SLIDES[e.id];
            const ativo = i === atual;
            return (
              <article key={e.id} className={`he-slide ${entrou && ativo ? "is-active" : ""}`} aria-hidden={!ativo} inert={!ativo}>
                {/* só o slide ativo é o título da página */}
                {ativo ? (
                  <h1 className="he-title he-anim">{slide.titulo}</h1>
                ) : (
                  <p className="he-title he-anim">{slide.titulo}</p>
                )}
                <p className="he-text he-anim">{slide.texto}</p>
                <Link to={e.rota} className="he-cta he-anim">
                  <span>VER MAIS</span>
                  <span className="he-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>

        {/* visuais: foto da equipe (quando houver) + bola */}
        <div className="he-visual" aria-hidden="true">
          {ESPORTES.map((e, i) => (
            <div
              key={e.id}
              className={`he-visual-slide ${e.fotoBanner ? "tem-foto" : ""} ${entrou && i === atual ? "is-active" : ""}`}
            >
              {e.fotoBanner && (
                <div className="he-photo">
                  <img src={e.fotoBanner} alt="" className={e.foco} />
                </div>
              )}
              <div className="he-ball">
                <Cena esporte={e.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* abas */}
      <div className="he-cards">
        <div role="tablist" aria-label="Escolha a modalidade" onKeyDown={aoTeclar} className="flex flex-1 min-w-0 gap-2.5 max-[860px]:gap-1.5">
          {ESPORTES.map((e, i) => {
            const ativo = i === atual;
            return (
              <button
                key={e.id}
                ref={(el) => (abasRef.current[i] = el)}
                id={`he-aba-${e.id}`}
                role="tab"
                aria-selected={ativo}
                aria-controls="he-painel"
                tabIndex={ativo ? 0 : -1}
                data-sport={e.id}
                onClick={() => ir(i)}
                className={`he-card ${ativo ? "is-active" : ""}`}
              >
                <span className="he-card-inner">
                  <span className="he-name">{e.nome}</span>
                </span>
                {entrou && ativo && (
                  <span key={trocas} className="he-progress" onAnimationEnd={() => ir(atual + 1)} />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-label={pausado ? "Continuar troca automática" : "Pausar troca automática"}
          className="he-pause"
        >
          {pausado ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </section>
  );
}

export default HeroEsportes;
