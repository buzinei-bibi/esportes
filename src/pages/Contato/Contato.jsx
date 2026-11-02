import { useState } from "react";
import Button from "../../components/Button/Button";
import { EscudoHandebol, EscudoVolei, EscudoTenisDeMesa } from "../../components/Escudos/Escudos";
import { REDES_SOCIAIS } from "../../data/jogos";
import "./Contato.css";

const EMAIL = "ttéesportes@gmail.com";
const TELEFONE = "+55 (12) 12345-6789";
// endereço da dona do site: a rua do Maracanã (exemplo: só a rua, sem número)
const ENDERECO = "R. PROF. EURICO RABELO - MARACANÃ, RIO DE JANEIRO - RJ, 20271-150";

// locais do mapa: o principal (o do site) e a casa de cada equipe — um de cada vez.
// busca = o que vai para o google maps
// centro = só o mapa daquele ponto, sem o quadro de texto do google por cima
const LOCAIS = [
  {
    id: "site",
    titulo: ["ONDE", "ESTAMOS"],
    local: "TAUBATÉ ESPORTES",
    endereco: ENDERECO,
    busca: "Rua Professor Eurico Rabelo, Maracanã, Rio de Janeiro - RJ",
    centro: { lat: -22.9139368, lng: -43.2310122 },
  },
  {
    id: "handebol",
    botao: "Handebol",
    titulo: ["CASA DO", "HANDEBOL"],
    local: "GINÁSIO DO CECAP",
    endereco: "CECAP, TAUBATÉ - SP",
    busca: "HANDEBOL TAUBATE GINASIO CECAP",
    Escudo: EscudoHandebol,
  },
  {
    id: "volei",
    botao: "Vôlei",
    titulo: ["CASA DO", "VÔLEI"],
    local: "GINÁSIO DO ABAETÉ",
    endereco: "CLUBE DE CAMPO ABAETÉ, TAUBATÉ - SP",
    busca: "Ginásio do Abaeté, Taubaté - SP",
    Escudo: EscudoVolei,
  },
  {
    id: "tenis-de-mesa",
    botao: "Tênis de mesa",
    titulo: ["CASA DO", "TÊNIS DE MESA"],
    // quadra cedida pela escola para a AMETTA (Associação dos Mesatenistas de Taubaté)
    local: "EMEF MONSENHOR EVARISTO CAMPISTA CÉSAR",
    endereco: "TAUBATÉ - SP",
    busca: "EMEF Monsenhor Evaristo Campista César, Taubaté - SP",
    Escudo: EscudoTenisDeMesa,
  },
];
const linkDoMapa = (busca) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
const mapaEmbutido = ({ busca, centro }) =>
  centro
    ? `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1500!2d${centro.lng}!3d${centro.lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1`
    : `https://www.google.com/maps?q=${encodeURIComponent(busca)}&output=embed`;

const CONTATOS = [
  { rotulo: "TELEFONE", valor: TELEFONE, icone: "bi-telephone-fill", link: "tel:+5512123456789" },
  { rotulo: "E-MAIL", valor: EMAIL, icone: "bi-envelope-at-fill", link: `mailto:${EMAIL}` },
  {
    rotulo: "ENDEREÇO",
    valor: ENDERECO,
    icone: "bi-geo-alt-fill",
    link: linkDoMapa(LOCAIS[0].busca),
    externo: true,
  },
];

// assuntos: o chip da esquerda já escolhe a opção no formulário
const ASSUNTOS = [
  { nome: "NOTÍCIAS ESPORTIVAS", valor: "notícias esportivas", icone: "bi-newspaper" },
  { nome: "CAMPEONATOS E EVENTOS", valor: "campeonatos", icone: "bi-calendar-event" },
  { nome: "PARCERIAS E DIVULGAÇÕES", valor: "parcerias", icone: "bi-megaphone-fill" },
];


// perguntas frequentes: explicam o que mandar em cada caso
const PERGUNTAS = [
  {
    pergunta: "COMO DIVULGAR UM JOGO OU CAMPEONATO?",
    resposta: "ENVIE PELO FORMULÁRIO A DATA, O LOCAL E AS EQUIPES, ESCOLHENDO O ASSUNTO CAMPEONATOS.",
  },
  {
    pergunta: "QUERO SER PARCEIRO OU PATROCINADOR.",
    resposta: "ESCOLHA PARCERIAS NO FORMULÁRIO E CONTE UM POUCO SOBRE SUA EMPRESA OU PROJETO.",
  },
  {
    pergunta: "ENCONTREI UMA INFORMAÇÃO ERRADA NO SITE.",
    resposta: "MANDE UMA MENSAGEM COM O LINK DA PÁGINA E A CORREÇÃO. A GENTE ATUALIZA.",
  },
];

// cena do banner: o avião de papel leva a mensagem até a carta
function CenaContato() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {/* rastro do voo */}
      <path
        className="ct-rastro"
        d="M -20 340 C 60 300, 100 272, 140 240 S 228 166, 262 162"
        fill="none"
        stroke="var(--ct-accent-claro)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".55"
      />

      {/* carta */}
      <g className="ct-flutua">
        <g className="ct-carta">
          <rect x="200" y="112" width="170" height="118" rx="6" fill="rgb(255 255 255 / .06)" stroke="var(--ct-accent-claro)" strokeWidth="2.5" />
          <path d="M202 116 L285 176 L368 116" fill="none" stroke="var(--ct-accent-claro)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M202 226 L262 182 M368 226 L308 182" stroke="var(--ct-accent-claro)" strokeWidth="2" opacity=".5" />
        </g>
        {/* check de entregue */}
        <g className="ct-check">
          <circle cx="366" cy="112" r="18" fill="var(--ct-accent)" stroke="#020617" strokeWidth="3" />
          <path d="M357 112 L363 118 L375 106" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* selos flutuando: telefone e localização */}
      <g className="ct-flutua d2">
        <circle cx="86" cy="118" r="32" fill="rgb(255 255 255 / .05)" stroke="rgb(255 255 255 / .15)" />
        <rect x="74" y="98" width="24" height="40" rx="5" fill="none" stroke="#f8fafc" strokeWidth="3" />
        <line x1="82" y1="131" x2="90" y2="131" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="ct-flutua">
        <circle cx="318" cy="306" r="30" fill="rgb(255 255 255 / .05)" stroke="rgb(255 255 255 / .15)" />
        <path d="M318 326 C 306 312, 302 304, 302 296 A 16 16 0 0 1 334 296 C 334 304, 330 312, 318 326 Z" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="318" cy="296" r="5" fill="var(--ct-accent-claro)" />
      </g>

      {/* avião de papel */}
      <g className="ct-aviao">
        <g transform="translate(-24 -16)">
          <path d="M0 0 L48 16 L0 32 L10 16 Z" fill="#f8fafc" />
          <path d="M10 16 L48 16 L14 26 Z" fill="var(--ct-accent-claro)" />
        </g>
      </g>
    </svg>
  );
}

function Contato() {
  const [assunto, setAssunto] = useState("");
  const [idLocal, setIdLocal] = useState("site");
  const local = LOCAIS.find((l) => l.id === idLocal);
  const [status, setStatus] = useState("");

  // sem servidor: abre o e-mail da pessoa com a mensagem já preenchida
  function enviar(e) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = dados.get("nome");
    const titulo = `[${(dados.get("assunto") || "contato").toString().toUpperCase()}] ${nome}`;
    const corpo = `${dados.get("mensagem")}\n\n${nome}\n${dados.get("email")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(corpo)}`;
    setStatus("SEU APLICATIVO DE E-MAIL VAI ABRIR COM A MENSAGEM PRONTA. É SÓ ENVIAR.");
  }

  return (
    <>
      <div className="ct uppercase">
        {/* BANNER */}
        <section className="ct-hero" aria-labelledby="ct-titulo">
          <div className="ct-palco">
            <div>
              <h1 id="ct-titulo" className="ct-titulo ct-anim">
                FALE COM
                <br />
                <em>NOSSA EQUIPE</em>
              </h1>
              <p className="ct-frase ct-anim">DÚVIDAS, SUGESTÕES, PARCERIAS OU CAMPEONATOS? FALE COM A GENTE.</p>
              <div className="ct-acoes ct-anim">
                <a href="#formulario" className="ct-botao">
                  <span>ENVIAR MENSAGEM</span>
                  <span className="ct-seta" aria-hidden="true">→</span>
                </a>
                <a href="#mapa" className="ct-link">
                  VER LOCALIZAÇÃO
                  <span aria-hidden="true">
                    <i className="bi bi-geo-alt-fill text-xs"></i>
                  </span>
                </a>
              </div>
            </div>

            <div className="ct-cena">
              <CenaContato />
            </div>
          </div>

          {/* contatos rápidos */}
          <ul className="ct-cards" aria-label="Formas de contato">
            {CONTATOS.map((c) => (
              <li key={c.rotulo} className="flex-1 min-w-0 flex">
                <a
                  href={c.link}
                  {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="ct-card"
                >
                  <span className="ct-card-inner">
                    <span className="ct-card-icone" aria-hidden="true">
                      <i className={`bi ${c.icone}`}></i>
                    </span>
                    <span className="min-w-0">
                      <span className="ct-card-rotulo">{c.rotulo}</span>
                      <span className="ct-card-valor">{c.valor.toUpperCase()}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* FORMULÁRIO */}
        <section id="formulario" className="ct-secao grid gap-8 lg:grid-cols-12 lg:gap-12 items-start" aria-labelledby="ct-form-titulo">
          <div className="lg:col-span-5">
            <p className="ct-eyebrow">ATENDIMENTO</p>
            <h2 className="ct-subtitulo">
              COMO PODEMOS
              <br />
              <em>AJUDAR?</em>
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
              ESCOLHA O ASSUNTO E ENVIE SUA MENSAGEM, NOSSO TIME RESPONDERÁ O MAIS RÁPIDO POSSÍVEL.
            </p>
            <div className="mt-6 grid gap-2.5 max-w-md">
              {ASSUNTOS.map((a) => (
                <button
                  key={a.valor}
                  type="button"
                  aria-pressed={assunto === a.valor}
                  onClick={() => setAssunto(a.valor)}
                  className="ct-assunto"
                >
                  <i className={`bi ${a.icone}`} aria-hidden="true"></i>
                  {a.nome}
                </button>
              ))}
            </div>

            {/* redes sociais */}
            <div className="mt-8">
              <p className="ct-rotulo">SIGA AS EQUIPES DE TAUBATÉ</p>
              {/* mesmas redes do rodapé: abrem, em nova aba, a página de links das equipes */}
              <ul className="mt-2 flex flex-wrap gap-2">
                {REDES_SOCIAIS.map((rede) => (
                  <li key={rede.id}>
                    <a
                      href={`/redes?rede=${rede.id}`}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${rede.nome} das equipes de Taubaté (abre em nova aba)`}
                      className="ct-rede"
                    >
                      <i className={`bi ${rede.icone}`} aria-hidden="true"></i>
                      {rede.nome.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={enviar} className="ct-form lg:col-span-7 w-full max-w-2xl lg:justify-self-end grid gap-4 sm:grid-cols-2">
            <h2 id="ct-form-titulo" className="ct-subtitulo sm:col-span-2 text-[1.75rem]! sm:text-[2.1rem]!">
              MANDE SUA <em>MENSAGEM</em>
            </h2>

            <div>
              <label htmlFor="ct-nome" className="ct-rotulo">NOME</label>
              <input id="ct-nome" name="nome" type="text" required placeholder="SEU NOME" autoComplete="name" className="ct-campo" />
            </div>
            <div>
              <label htmlFor="ct-email" className="ct-rotulo">E-MAIL</label>
              <input id="ct-email" name="email" type="email" required placeholder="SEU E-MAIL" autoComplete="email" className="ct-campo normal-case placeholder:uppercase" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ct-assunto" className="ct-rotulo">ASSUNTO</label>
              <select
                id="ct-assunto"
                name="assunto"
                required
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                className="ct-campo"
              >
                <option value="" disabled>
                  SELECIONE O ASSUNTO
                </option>
                <option value="notícias esportivas">NOTÍCIAS ESPORTIVAS</option>
                <option value="campeonatos">CAMPEONATOS</option>
                <option value="parcerias">PARCERIAS</option>
                <option value="outros assuntos">OUTROS ASSUNTOS</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ct-mensagem" className="ct-rotulo">MENSAGEM</label>
              <textarea id="ct-mensagem" name="mensagem" rows="4" required placeholder="ESCREVA SUA MENSAGEM" className="ct-campo resize-none" />
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <button type="submit" className="ct-botao">
                <span>ENVIAR MENSAGEM</span>
                <i className="bi bi-send-fill ct-seta" aria-hidden="true"></i>
              </button>
              <p role="status" className="text-xs text-blue-300 tracking-wide">
                {status}
              </p>
            </div>
          </form>
        </section>

        {/* MAPA + PERGUNTAS FREQUENTES */}
        <section id="mapa" className="ct-secao pb-16 sm:pb-20 grid gap-8 lg:grid-cols-12 lg:gap-12 items-start" aria-labelledby="ct-mapa-titulo">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
              <div>
                <p className="ct-eyebrow">GOOGLE MAPS</p>
                <h2 id="ct-mapa-titulo" className="ct-subtitulo">
                  {local.titulo[0]} <em>{local.titulo[1]}</em>
                </h2>
                {/* a casa do site (que abre primeiro) fica só com "onde estamos"; os esportes mostram o ginásio */}
                {local.id !== "site" && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-400" aria-live="polite">
                    <b className="text-white font-bold">{local.local}</b> · {local.endereco}
                  </p>
                )}
              </div>
              <a href={linkDoMapa(local.busca)} target="_blank" rel="noopener noreferrer" className="ct-link">
                COMO CHEGAR
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* um local de cada vez: o mapa abre no site; cada esporte mostra a casa da equipe.
                clicar de novo no esporte escolhido volta para o mapa do site */}
            <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Ver a casa de cada equipe no mapa">
              {LOCAIS.filter((l) => l.Escudo).map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={idLocal === l.id}
                  onClick={() => setIdLocal(idLocal === l.id ? "site" : l.id)}
                  className="ct-local"
                >
                  <span aria-hidden="true" className="contents">
                    <l.Escudo className="ct-local-escudo" titulo="" />
                  </span>
                  {l.botao.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="ct-mapa">
              <iframe
                key={local.id}
                src={mapaEmbutido(local)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa: ${local.local.toLowerCase()}`}
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="ct-eyebrow">DÚVIDAS</p>
            <h2 className="ct-subtitulo text-[1.75rem]! sm:text-[2.1rem]!">
              PERGUNTAS <em>FREQUENTES</em>
            </h2>
            <div className="mt-5 grid gap-2.5">
              {PERGUNTAS.map((item) => (
                <details key={item.pergunta} className="ct-pergunta">
                  <summary>
                    {item.pergunta}
                    <i className="bi bi-plus-lg" aria-hidden="true"></i>
                  </summary>
                  <p>{item.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button espacoFinal={false} />
    </>
  );
}

export default Contato;
