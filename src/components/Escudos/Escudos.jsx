import { useId } from "react";

// escudos dos times de taubaté, redesenhados em svg (sem fundo).
// ficam como componentes (e não arquivos .svg) para o texto usar a fonte do site.
// useId: cada cópia na tela tem seus próprios gradientes/recortes.

const FONTE = '"Barlow Condensed", "Arial Narrow", system-ui, sans-serif';

// estrela de 5 pontas centrada em 0,0
const ESTRELA = "M0,-66 L15.9,-21.8 62.8,-20.4 25.7,8.3 38.8,53.4 0,27 -38.8,53.4 -25.7,8.3 -62.8,-20.4 -15.9,-21.8Z";

export function EscudoHandebol({ className = "", titulo = "Escudo do Handebol Taubaté" }) {
  return (
    <svg viewBox="190 55 700 985" className={className} role="img" aria-label={titulo}>
      {/* estrelas em arco */}
      <g fill="#fdea1a">
        <path d={ESTRELA} transform="translate(260 222) rotate(-12)" />
        <path d={ESTRELA} transform="translate(392 188) rotate(-6)" />
        <path d={ESTRELA} transform="translate(522 126)" />
        <path d={ESTRELA} transform="translate(654 196) rotate(6)" />
        <path d={ESTRELA} transform="translate(798 214) rotate(12)" />
      </g>

      {/* borda amarela, faixa cinza, filete branco e miolo preto */}
      <path fill="#fdea1a" d="M244,316 Q543,188 842,316 C870,420 880,520 872,600 C860,780 720,940 543,1032 C366,940 226,780 214,600 C206,520 216,420 244,316Z" />
      <path fill="#6d6e72" d="M262,330 Q543,208 824,330 C850,430 858,525 851,600 C840,770 705,920 543,1008 C381,920 246,770 235,600 C228,525 236,430 262,330Z" />
      <path fill="#fff" d="M303,302 Q543,236 783,302 C806,420 818,520 810,600 C794,760 690,902 543,1004 C396,902 292,760 276,600 C268,520 280,420 303,302Z" />
      <path fill="#1f1f1f" d="M321,314 Q543,254 765,314 C786,425 796,520 789,598 C774,750 676,882 543,984 C410,882 312,750 297,598 C290,520 302,425 321,314Z" />

      {/* detalhe amarelo em três pontas */}
      <path fill="#fdea1a" d="M543,292 C548,470 610,642 770,722 C650,694 600,684 543,684 C486,684 436,694 316,722 C476,642 538,470 543,292Z" />

      {/* nome */}
      <g fill="#fff" stroke="#1f1f1f" strokeWidth="7" paintOrder="stroke" fontFamily={FONTE} fontWeight="800" textAnchor="middle">
        <text x="543" y="472" fontSize="150" textLength="470" lengthAdjust="spacingAndGlyphs">
          HANDEBOL
        </text>
        <text x="543" y="686" fontSize="178" textLength="480" lengthAdjust="spacingAndGlyphs">
          TAUBATÉ
        </text>
      </g>
    </svg>
  );
}

export function EscudoVolei({ className = "", titulo = "Escudo do Vôlei Taubaté" }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="146 70 478 648" className={className} role="img" aria-label={titulo}>
      <defs>
        <linearGradient id={`${id}-azul`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2347e0" />
          <stop offset="1" stopColor="#0a168a" />
        </linearGradient>
        <radialGradient id={`${id}-bola`} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffec80" />
          <stop offset="0.6" stopColor="#f6d43a" />
          <stop offset="1" stopColor="#dcae1e" />
        </radialGradient>
        <clipPath id={`${id}-recorte`}>
          <circle cx="385" cy="372" r="104" />
        </clipPath>
        <path id={`${id}-arco-cima`} d="M232,388 A153,153 0 0 1 538,388" />
        <path id={`${id}-arco-baixo`} d="M248,386 A137,137 0 0 0 522,386" />
      </defs>

      {/* escudo: borda branca, fundo azul e filete branco */}
      <path fill="#fff" d="M156,162 Q385,76 614,162 L614,562 L385,708 L156,562Z" />
      <path fill={`url(#${id}-azul)`} d="M168,171 Q385,90 602,171 L602,555 L385,694 L168,555Z" />
      <path fill="none" stroke="#fff" strokeWidth="4" d="M182,182 Q385,106 588,182 L588,547 L385,677 L182,547Z" />

      {/* bola */}
      <circle cx="385" cy="372" r="104" fill={`url(#${id}-bola)`} />
      <g clipPath={`url(#${id}-recorte)`} fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round">
        <path d="M385,372 C388,318 356,280 300,270" />
        <path d="M352,366 C352,318 326,292 284,292" />
        <path d="M385,372 C436,382 474,366 498,334" />
        <path d="M398,404 C450,414 486,398 504,372" />
        <path d="M385,372 C350,404 342,440 352,482" />
        <path d="M352,366 C316,398 306,432 312,470" />
      </g>
      <circle cx="385" cy="372" r="104" fill="none" stroke="#fff" strokeWidth="6" />

      {/* nome em arco e lema */}
      <text fill="#fff" fontFamily={FONTE} fontWeight="800" fontSize="58" letterSpacing="2">
        <textPath href={`#${id}-arco-cima`} startOffset="50%" textAnchor="middle">
          VÔLEI TAUBATÉ
        </textPath>
      </text>
      <text fill="#fff" fontFamily={FONTE} fontWeight="600" fontSize="19" letterSpacing="6">
        <textPath href={`#${id}-arco-baixo`} startOffset="50%" textAnchor="middle">
          - ORGULHO DE SER TAUBATÉ -
        </textPath>
      </text>
    </svg>
  );
}

export function EscudoTenisDeMesa({ className = "", titulo = "Escudo do Tênis de Mesa Taubaté (Ametta)" }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="70 18 460 462" className={className} role="img" aria-label={titulo}>
      <defs>
        <linearGradient id={`${id}-verde`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#47a63a" />
          <stop offset="1" stopColor="#62ea3a" />
        </linearGradient>
        <linearGradient id={`${id}-azul`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#04073a" />
          <stop offset="0.6" stopColor="#202290" />
          <stop offset="1" stopColor="#1c1c86" />
        </linearGradient>
        <clipPath id={`${id}-recorte`}>
          <circle cx="300" cy="255" r="220" />
        </clipPath>
      </defs>

      {/* disco verde, meia-lua azul e bola verde por cima */}
      <circle cx="300" cy="255" r="220" fill={`url(#${id}-verde)`} />
      <circle cx="262" cy="212" r="210" fill={`url(#${id}-azul)`} clipPath={`url(#${id}-recorte)`} />
      <circle cx="270" cy="270" r="135" fill={`url(#${id}-verde)`} />

      {/* rede e bolinha */}
      <path d="M188,70 L232,143" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M364,364 L370,374" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="268" cy="60" r="32" fill="#fff" />
    </svg>
  );
}
