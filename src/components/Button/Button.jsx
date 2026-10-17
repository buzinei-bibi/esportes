import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { destinoDaBusca } from "../../data/busca";
import { createPortal } from "react-dom";
import {
  Accessibility,
  X,
  Contrast,
  ALargeSmall,
  Link as LinkIcon,
  ImageOff,
  PauseCircle,
  MousePointer2,
  Droplets,
  RotateCcw,
  BookOpen,
  ScanLine,
  RectangleHorizontal,
  Palette,
  ZoomIn,
  Volume2,
  Mic,
  Check,
} from "lucide-react";

// ---- configuração salva (vale para todas as páginas) ----
const CHAVE_STORAGE = "a11y-config";

const PADRAO = {
  contraste: false,
  links: false,
  texto: 0, // 0 a 3
  semAnimacao: false,
  semImagens: false,
  cursor: false,
  saturacao: 0, // 0 a 2
  dislexia: false,
  guia: false,
  mascara: false,
  cores: 0, // 0 a 3
  zoom: 0, // 0 a 3
  leitor: false,
  grande: false,
};

// nomes de cada nível, na ordem (o nível 0 é "desligado")
const NIVEIS = {
  texto: ["112%", "125%", "150%"],
  zoom: ["115%", "130%", "150%"],
  saturacao: ["BAIXA", "ALTA"],
  cores: ["SÉPIA", "CINZA", "INVERTIDO"],
};

// atributo no <html> → chave da configuração (as regras estão no index.css)
const ATRIBUTOS = {
  "data-a11y-contraste": "contraste",
  "data-a11y-links": "links",
  "data-a11y-texto": "texto",
  "data-a11y-sem-animacao": "semAnimacao",
  "data-a11y-sem-imagens": "semImagens",
  "data-a11y-cursor": "cursor",
  "data-a11y-saturacao": "saturacao",
  "data-a11y-dislexia": "dislexia",
  "data-a11y-cores": "cores",
  "data-a11y-zoom": "zoom",
};

function lerConfig() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    return { ...PADRAO, ...salvo };
  } catch {
    return PADRAO;
  }
}

// ---- voz em português para o leitor ----
// sem escolher a voz, o Chrome/Edge no Windows usa a voz padrão do sistema (em inglês)
let vozPortugues = null;
function escolherVozPortugues() {
  if (!("speechSynthesis" in window)) return null;
  const vozes = window.speechSynthesis.getVoices();
  const pt = vozes.filter((v) => /^pt([-_]|$)/i.test(v.lang));
  const br = pt.filter((v) => /^pt[-_]br/i.test(v.lang));
  // prefere as vozes mais naturais (Google / Microsoft Online), depois qualquer pt-BR, depois pt-PT
  vozPortugues =
    br.find((v) => /google|natural|online/i.test(v.name)) || br[0] || pt[0] || null;
  return vozPortugues;
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  escolherVozPortugues();
  window.speechSynthesis.addEventListener?.("voiceschanged", escolherVozPortugues);
}

function falar(texto) {
  if (!("speechSynthesis" in window) || !texto) return;
  window.speechSynthesis.cancel();
  // o site é todo em MAIÚSCULAS: em minúsculas a voz lê palavras, não soletra siglas
  const frase = texto.replace(/\s+/g, " ").trim().toLocaleLowerCase("pt-BR");
  const fala = new SpeechSynthesisUtterance(frase);
  const voz = vozPortugues || escolherVozPortugues();
  if (voz) fala.voice = voz;
  fala.lang = voz?.lang || "pt-BR";
  fala.rate = 1;
  window.speechSynthesis.speak(fala);
}

// elementos que o leitor de texto lê como um bloco
const BLOCOS_LEITURA =
  "a, button, h1, h2, h3, h4, h5, h6, p, li, label, td, th, figcaption, img, input, textarea, select";

function textoDoElemento(el) {
  if (el.tagName === "IMG") return el.alt;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
    return el.getAttribute("aria-label") || el.value || el.placeholder;
  return el.getAttribute("aria-label") || el.innerText || el.textContent;
}

function Button({ espacoFinal = true }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [config, setConfig] = useState(lerConfig);
  const [buscaVozAtiva, setBuscaVozAtiva] = useState(false);
  // mensagem curta no menu (ex.: "ouvindo...", "não ouvi nada")
  const [aviso, setAviso] = useState("");
  const navigate = useNavigate();

  const gatilhoRef = useRef(null);
  const fecharRef = useRef(null);
  const painelRef = useRef(null);
  const guiaRef = useRef(null);
  const mascaraTopoRef = useRef(null);
  const mascaraBaixoRef = useRef(null);
  const reconhecimentoRef = useRef(null);

  const alternar = (chave) => setConfig((c) => ({ ...c, [chave]: !c[chave] }));
  const proximoNivel = (chave) =>
    setConfig((c) => ({ ...c, [chave]: (c[chave] + 1) % (NIVEIS[chave].length + 1) }));

  // ---- aplica a configuração no <html> e salva ----
  useEffect(() => {
    const html = document.documentElement;
    for (const [atributo, chave] of Object.entries(ATRIBUTOS)) {
      const valor = config[chave];
      if (valor) html.setAttribute(atributo, valor === true ? "" : String(valor));
      else html.removeAttribute(atributo);
    }
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(config));
    } catch {
      // sem storage (aba privada etc.): segue só nesta página
    }
  }, [config]);

  // ---- atalho de teclado ----
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key?.toLowerCase() === "l") {
        e.preventDefault();
        setMenuAberto((aberto) => !aberto);
      }
      if (e.key === "Escape") setMenuAberto(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---- menu aberto: trava o foco no menu e devolve ao fechar ----
  useEffect(() => {
    const html = document.documentElement;
    const root = document.getElementById("root");
    html.toggleAttribute("data-a11y-menu-aberto", menuAberto);
    if (root) root.inert = menuAberto;

    if (menuAberto) {
      fecharRef.current?.focus();
    } else if (painelRef.current?.contains(document.activeElement)) {
      gatilhoRef.current?.focus();
    }
  }, [menuAberto]);

  useEffect(
    () => () => {
      // ao trocar de página o menu é desmontado: não deixa a página travada
      const root = document.getElementById("root");
      if (root) root.inert = false;
      document.documentElement.removeAttribute("data-a11y-menu-aberto");
    },
    []
  );

  // ---- guia e máscara de leitura: seguem o mouse ou o dedo ----
  useEffect(() => {
    if (!config.guia && !config.mascara) return;
    const meiaJanela = 60;
    function mover(y) {
      if (guiaRef.current) guiaRef.current.style.top = `${y - 18}px`;
      if (mascaraTopoRef.current)
        mascaraTopoRef.current.style.height = `${Math.max(0, y - meiaJanela)}px`;
      if (mascaraBaixoRef.current)
        mascaraBaixoRef.current.style.top = `${y + meiaJanela}px`;
    }
    const aoMover = (e) => mover(e.clientY);
    mover(window.innerHeight / 2);
    window.addEventListener("pointermove", aoMover);
    return () => window.removeEventListener("pointermove", aoMover);
  }, [config.guia, config.mascara]);

  // ---- leitor de texto: lê o que é clicado ou focado pelo teclado ----
  useEffect(() => {
    if (!config.leitor) return;
    function ler(el) {
      if (!el || el.closest(".a11y-ui")) return;
      const bloco = el.closest(BLOCOS_LEITURA);
      const texto = bloco ? textoDoElemento(bloco) : el.innerText;
      // clique num container grande (sem bloco de texto) não lê a página toda
      if (!bloco && texto && texto.length > 300) return;
      falar(texto);
    }
    const aoClicar = (e) => ler(e.target);
    const aoFocar = (e) => e.target.matches?.(":focus-visible") && ler(e.target);
    document.addEventListener("click", aoClicar, true);
    document.addEventListener("focusin", aoFocar);
    return () => {
      document.removeEventListener("click", aoClicar, true);
      document.removeEventListener("focusin", aoFocar);
      window.speechSynthesis?.cancel();
    };
  }, [config.leitor]);

  function alternarLeitor() {
    if (!("speechSynthesis" in window)) {
      setAviso("SEU NAVEGADOR NÃO TEM LEITOR DE TEXTO. TENTE O GOOGLE CHROME OU O EDGE.");
      return;
    }
    if (!config.leitor) {
      if (!escolherVozPortugues()) {
        setAviso(
          "NÃO ACHEI VOZ EM PORTUGUÊS NO SEU APARELHO. NO WINDOWS: CONFIGURAÇÕES > HORA E IDIOMA > FALA > ADICIONAR VOZES > PORTUGUÊS (BRASIL)."
        );
      } else {
        setAviso("");
      }
      falar("Leitor de texto ativado. Clique em um texto para ouvir.");
    } else {
      setAviso("");
    }
    alternar("leitor");
  }

  // ---- busca por voz ----
  function alternarBuscaPorVoz() {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setAviso("SEU NAVEGADOR NÃO TEM BUSCA POR VOZ. USE O GOOGLE CHROME OU O EDGE.");
      return;
    }

    if (buscaVozAtiva) {
      reconhecimentoRef.current?.stop();
      setBuscaVozAtiva(false);
      return;
    }

    const reconhecimento = new SpeechRecognitionAPI();
    reconhecimento.lang = "pt-BR";
    reconhecimento.interimResults = false;
    reconhecimento.maxAlternatives = 1;

    reconhecimento.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      setAviso(`VOCÊ DISSE: "${texto.toUpperCase()}"`);
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      const campos = document.querySelectorAll('input[placeholder*="pesquis" i]');
      campos.forEach((campo) => {
        setter.call(campo, texto);
        campo.dispatchEvent(new Event("input", { bubbles: true }));
      });
      // fecha o menu e já leva para a página que responde à busca
      setMenuAberto(false);
      const destino = destinoDaBusca(texto);
      if (destino) navigate(destino);
    };

    const ERROS = {
      "not-allowed": "PERMITA O USO DO MICROFONE NO NAVEGADOR (ÍCONE DO CADEADO NA BARRA DE ENDEREÇO).",
      "service-not-allowed": "PERMITA O USO DO MICROFONE NO NAVEGADOR (ÍCONE DO CADEADO NA BARRA DE ENDEREÇO).",
      "no-speech": "NÃO OUVI NADA. TOQUE EM BUSCA POR VOZ E FALE LOGO EM SEGUIDA.",
      "audio-capture": "NENHUM MICROFONE ENCONTRADO NESTE APARELHO.",
      network: "A BUSCA POR VOZ PRECISA DE INTERNET. CONFIRA SUA CONEXÃO.",
    };
    reconhecimento.onerror = (e) => {
      if (e.error !== "aborted") setAviso(ERROS[e.error] || "NÃO DEU PARA OUVIR. TENTE DE NOVO.");
      setBuscaVozAtiva(false);
    };
    reconhecimento.onend = () => setBuscaVozAtiva(false);

    try {
      reconhecimento.start();
    } catch {
      setAviso("NÃO DEU PARA LIGAR O MICROFONE. TENTE DE NOVO.");
      return;
    }
    reconhecimentoRef.current = reconhecimento;
    setAviso("OUVINDO... DIGA O QUE VOCÊ PROCURA (EX.: \"VÔLEI\", \"CONTATO\").");
    setBuscaVozAtiva(true);
  }

  function redefinirConfiguracoes() {
    setConfig(PADRAO);
    setAviso("");
    if (buscaVozAtiva) alternarBuscaPorVoz();
  }

  const totalAtivos =
    Object.keys(PADRAO).filter((k) => k !== "grande" && config[k]).length +
    (buscaVozAtiva ? 1 : 0);
  const g = config.grande;

  const secoes = [
    {
      titulo: "TEXTO E LEITURA",
      itens: [
        { chave: "texto", icon: ALargeSmall, titulo: "TEXTO MAIOR" },
        { chave: "zoom", icon: ZoomIn, titulo: "ZOOM DA PÁGINA" },
        { chave: "dislexia", icon: BookOpen, titulo: "FONTE PARA DISLEXIA" },
        { chave: "leitor", icon: Volume2, titulo: "LEITOR DE TEXTO", acao: "leitor" },
        { chave: "guia", icon: ScanLine, titulo: "GUIA DE LEITURA" },
        { chave: "mascara", icon: RectangleHorizontal, titulo: "MÁSCARA DE LEITURA" },
      ],
    },
    {
      titulo: "CORES",
      itens: [
        { chave: "contraste", icon: Contrast, titulo: "CONTRASTE +" },
        { chave: "saturacao", icon: Droplets, titulo: "SATURAÇÃO" },
        { chave: "cores", icon: Palette, titulo: "AJUSTE DE CORES" },
        { chave: "links", icon: LinkIcon, titulo: "LINKS DESTACADOS" },
      ],
    },
    {
      titulo: "NAVEGAÇÃO",
      itens: [
        { chave: "semImagens", icon: ImageOff, titulo: "OCULTAR IMAGENS" },
        { chave: "semAnimacao", icon: PauseCircle, titulo: "PARAR ANIMAÇÕES" },
        { chave: "cursor", icon: MousePointer2, titulo: "CURSOR GRANDE" },
        {
          chave: "buscaVoz",
          icon: Mic,
          titulo: buscaVozAtiva ? "OUVINDO..." : "BUSCA POR VOZ",
          ativo: buscaVozAtiva,
          acao: "buscaVoz",
        },
      ],
    },
  ];

  return (
    <>
      {/* espaço no fim da página (antes do rodapé); a home não usa */}
      {espacoFinal && <div aria-hidden="true" className="h-7.5" />}

      {createPortal(
        <div className="a11y-ui text-white uppercase">
          {/* guia de leitura */}
          {config.guia && (
            <div
              ref={guiaRef}
              className="fixed left-0 w-full h-9 bg-yellow-300/30 border-y-2 border-yellow-400 pointer-events-none z-9990"
            />
          )}

          {/* máscara de leitura: escurece tudo menos uma faixa */}
          {config.mascara && (
            <>
              <div
                ref={mascaraTopoRef}
                className="fixed top-0 left-0 w-full bg-black/80 pointer-events-none z-9990"
              />
              <div
                ref={mascaraBaixoRef}
                className="fixed bottom-0 left-0 w-full bg-black/80 pointer-events-none z-9990"
              />
            </>
          )}

          {/* botão de acessibilidade */}
          <button
            ref={gatilhoRef}
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu de acessibilidade (Ctrl + L)"
            aria-expanded={menuAberto}
            aria-controls="menu-acessibilidade"
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-9991 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-700 ring-4 ring-blue-950/60 shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <Accessibility className="size-5 sm:size-[22px]" />
            {totalAtivos > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-yellow-300 text-black text-[0.625rem] font-bold grid place-items-center">
                {totalAtivos}
              </span>
            )}
          </button>

          {/* fundo escuro */}
          <div
            onClick={() => setMenuAberto(false)}
            className={`fixed inset-0 bg-black/55 z-9995 transition-opacity duration-300 ${
              menuAberto ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          <aside
            id="menu-acessibilidade"
            ref={painelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de acessibilidade"
            inert={!menuAberto}
            className={`fixed top-0 right-0 h-dvh w-[88%] flex flex-col bg-[#131829] scheme-dark z-9996 shadow-2xl transition-[translate,max-width] duration-300 ${
              g ? "max-w-[23rem]" : "max-w-[18rem]"
            } ${menuAberto ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* cabeçalho */}
            <div className="shrink-0 bg-blue-950">
              <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
                <div className="min-w-0">
                  <h2 className={`font-bold flex items-center gap-2 whitespace-nowrap ${g ? "text-xl" : "text-[0.9375rem]"}`}>
                    <Accessibility className="size-[22px] shrink-0" />
                    MENU ACESSIBILIDADE
                  </h2>
                  <p className="text-[0.6875rem] text-blue-200/70 mt-1.5 flex items-center gap-1.5">
                    ATALHO
                    <kbd className="font-sans font-semibold text-white bg-white/10 border border-white/15 rounded-md px-1.5 py-0.5">
                      CTRL + L
                    </kbd>
                  </p>
                </div>
                <button
                  ref={fecharRef}
                  onClick={() => setMenuAberto(false)}
                  aria-label="Fechar menu de acessibilidade"
                  className="size-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-blue-950 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-white/10">
                <span id="rotulo-menu-grande" className={`font-semibold ${g ? "text-sm" : "text-xs"}`}>
                  MENU SUPERDIMENSIONADO
                </span>
                <button
                  role="switch"
                  aria-checked={g}
                  aria-labelledby="rotulo-menu-grande"
                  onClick={() => alternar("grande")}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${
                    g ? "bg-blue-500" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      g ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* opções */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:#000_transparent] px-4 sm:px-5 py-4 space-y-4">
              {secoes.map((secao) => (
                <section key={secao.titulo} aria-label={secao.titulo}>
                  <h3 className={`font-semibold tracking-[0.14em] text-blue-200/60 mb-2.5 ${g ? "text-xs" : "text-[0.625rem]"}`}>
                    {secao.titulo}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {secao.itens.map((item) => (
                      <Card
                        key={item.chave}
                        icon={item.icon}
                        titulo={item.titulo}
                        grande={g}
                        niveis={NIVEIS[item.chave]}
                        nivel={NIVEIS[item.chave] ? config[item.chave] : undefined}
                        ativo={item.ativo ?? Boolean(config[item.chave])}
                        onClick={() => {
                          if (item.acao === "leitor") alternarLeitor();
                          else if (item.acao === "buscaVoz") alternarBuscaPorVoz();
                          else if (NIVEIS[item.chave]) proximoNivel(item.chave);
                          else alternar(item.chave);
                        }}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* aviso (ouvindo, erro do microfone, voz em português...) */}
            {aviso && (
              <p
                role="status"
                className="shrink-0 mx-4 sm:mx-5 mb-2 rounded-xl border border-blue-500/40 bg-blue-600/15 px-3 py-2 text-[0.6875rem] leading-snug text-blue-100"
              >
                {aviso}
              </p>
            )}

            {/* rodapé fixo */}
            <div className="shrink-0 border-t border-white/10 bg-[#131829] px-4 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                onClick={redefinirConfiguracoes}
                disabled={totalAtivos === 0}
                className={`w-full rounded-xl border border-white/15 bg-white/5 hover:bg-blue-600 hover:border-blue-600 disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:border-white/15 transition-colors font-bold flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${
                  g ? "h-14 text-sm" : "h-12 text-xs"
                }`}
              >
                <RotateCcw size={16} className="shrink-0" />
                REDEFINIR CONFIGURAÇÕES
                {totalAtivos > 0 && (
                  <span className="text-blue-200/80 font-semibold">({totalAtivos})</span>
                )}
              </button>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}

function Card({ icon: Icone, titulo, ativo, onClick, niveis, nivel, grande }) {
  const nomeNivel = niveis && nivel > 0 ? niveis[nivel - 1] : null;

  return (
    <button
      onClick={onClick}
      aria-pressed={ativo}
      aria-label={nomeNivel ? `${titulo}: ${nomeNivel}` : titulo}
      className={`group relative rounded-2xl border px-2 text-center flex flex-col items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${
        grande ? "min-h-28 gap-2 py-3.5" : "min-h-[4.5rem] gap-1.5 py-2.5"
      } ${
        ativo
          ? "bg-blue-600/20 border-blue-500"
          : "bg-white/[0.035] border-white/10 hover:bg-white/[0.07] hover:border-white/25"
      }`}
    >
      {/* selo de ativo (opções liga/desliga) */}
      {ativo && !niveis && (
        <span className="absolute top-2 right-2 size-4 rounded-full bg-blue-500 grid place-items-center">
          <Check size={11} strokeWidth={3} />
        </span>
      )}

      <span
        className={`rounded-xl grid place-items-center transition-colors ${
          grande ? "size-10" : "size-8"
        } ${ativo ? "bg-blue-600 text-white" : "bg-white/[0.06] text-white/85 group-hover:text-white"}`}
      >
        <Icone className={grande ? "size-5" : "size-4"} />
      </span>

      <span className={`font-semibold leading-tight tracking-wide ${grande ? "text-sm" : "text-[0.6875rem]"}`}>
        {titulo}
      </span>

      {/* níveis: pontinhos + nome do nível atual */}
      {niveis && (
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="flex gap-1">
            {niveis.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i < nivel ? "w-3 bg-blue-400" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </span>
          {nomeNivel && (
            <span className={`font-semibold text-blue-300 ${grande ? "text-xs" : "text-[0.5625rem]"}`}>
              {nomeNivel}
            </span>
          )}
        </span>
      )}
    </button>
  );
}

export default Button;
