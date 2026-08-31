import { useState, useEffect, useRef } from "react";
import {
  Accessibility,
  X,
  Eye,
  Type,
  Link as LinkIcon,
  Image,
  PauseCircle,
  MousePointer2,
  Droplets,
  RotateCcw,
  BookOpen,
  ScanLine,
  Palette,
  ZoomIn,
  Volume2,
  Mic,
} from "lucide-react";

function Button() {
  const [menuAcessibilidade, setMenuAcessibilidade] = useState(false);
  const [menuGrande, setMenuGrande] = useState(false);

  const [contrasteAtivo, setContrasteAtivo] = useState(false);
  const [linksDestacados, setLinksDestacados] = useState(false);
  const [textoMaior, setTextoMaior] = useState(0); // 0 a 3
  const [pararAnimacoes, setPararAnimacoes] = useState(false);
  const [ocultarImagens, setOcultarImagens] = useState(false);
  const [cursorGrande, setCursorGrande] = useState(false);
  const [saturacao, setSaturacao] = useState(0); // 0,1,2
  const [fonteDislexia, setFonteDislexia] = useState(false);
  const [guiaLeitura, setGuiaLeitura] = useState(false);
  const [mascaraLeitura, setMascaraLeitura] = useState(false);
  const [ajusteCores, setAjusteCores] = useState(0); // 0,1,2,3
  const [zoomPagina, setZoomPagina] = useState(0); // 0 a 3
  const [leitorAtivo, setLeitorAtivo] = useState(false);
  const [buscaVozAtiva, setBuscaVozAtiva] = useState(false);

  const guiaRef = useRef(null);
  const mascaraTopoRef = useRef(null);
  const mascaraBaixoRef = useRef(null);
  const reconhecimentoRef = useRef(null);

  // ---- atalho de teclado ----
  useEffect(() => {
    function handleKeyDown(e) {
      const tecla = e.key?.toLowerCase();
      if (e.ctrlKey && tecla === "l") {
        e.preventDefault();
        setMenuAcessibilidade((aberto) => !aberto);
      }
      if (e.key === "Escape") setMenuAcessibilidade(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---- CONTRASTE: classes Tailwind reais no <html> ----
  useEffect(() => {
    const html = document.documentElement;
    // usa variantes arbitrárias do Tailwind para atingir TODOS os elementos filhos
    html.classList.toggle("bg-black", contrasteAtivo);
    html.classList.toggle("[&_*]:!bg-black", contrasteAtivo);
    html.classList.toggle("[&_*]:!text-yellow-300", contrasteAtivo);
    html.classList.toggle("[&_*]:!border-yellow-300", contrasteAtivo);
    html.classList.toggle("[&_a]:!underline", contrasteAtivo);
    html.classList.toggle("[&_img]:grayscale", contrasteAtivo);
    html.classList.toggle("[&_svg]:grayscale", contrasteAtivo);
  }, [contrasteAtivo]);

  // ---- LINKS DESTACADOS ----
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("[&_a]:!bg-yellow-300", linksDestacados);
    html.classList.toggle("[&_a]:!text-black", linksDestacados);
    html.classList.toggle("[&_a]:!underline", linksDestacados);
    html.classList.toggle("[&_a]:!font-bold", linksDestacados);
  }, [linksDestacados]);

  // ---- TEXTO MAIOR (classes de tamanho reais do Tailwind) ----
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("text-[112.5%]", "text-[125%]", "text-[150%]");
    if (textoMaior === 1) html.classList.add("text-[112.5%]");
    if (textoMaior === 2) html.classList.add("text-[125%]");
    if (textoMaior === 3) html.classList.add("text-[150%]");
  }, [textoMaior]);

  // ---- PARAR ANIMAÇÕES ----
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("[&_*]:!animate-none", pararAnimacoes);
    html.classList.toggle("[&_*]:!transition-none", pararAnimacoes);
  }, [pararAnimacoes]);

  // ---- OCULTAR IMAGENS ----
  useEffect(() => {
    document.documentElement.classList.toggle(
      "[&_img]:invisible",
      ocultarImagens
    );
  }, [ocultarImagens]);

  // ---- CURSOR (única exceção pequena: cursor customizado via arbitrary value do próprio Tailwind) ----
  useEffect(() => {
    document.documentElement.classList.toggle(
      "cursor-[url('data:image/svg+xml;utf8,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2740%27_height=%2740%27_viewBox=%270_0_24_24%27%3E%3Cpath_fill=%27black%27_stroke=%27white%27_stroke-width=%271%27_d=%27M4_2l14_8-6_2-2_6z%27/%3E%3C/svg%3E'),_auto]",
      cursorGrande
    );
  }, [cursorGrande]);

  // ---- SATURAÇÃO (utilitários de filtro nativos do Tailwind) ----
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("saturate-50", "saturate-200");
    if (saturacao === 1) html.classList.add("saturate-50");
    if (saturacao === 2) html.classList.add("saturate-200");
  }, [saturacao]);

  // ---- FONTE PARA DISLEXIA (arbitrary value, sem @font-face customizado) ----
  useEffect(() => {
    document.documentElement.classList.toggle(
      "[&_*]:!font-[Comic_Sans_MS,_Verdana,_sans-serif]",
      fonteDislexia
    );
    document.documentElement.classList.toggle("tracking-wide", fonteDislexia);
  }, [fonteDislexia]);

  // ---- AJUSTE DE CORES (filtros nativos do Tailwind, empilháveis) ----
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("sepia", "grayscale", "invert", "hue-rotate-180");
    if (ajusteCores === 1) html.classList.add("sepia");
    if (ajusteCores === 2) html.classList.add("grayscale");
    if (ajusteCores === 3) html.classList.add("invert", "hue-rotate-180");
  }, [ajusteCores]);

  // ---- ZOOM: exceção real, precisa de valor numérico livre (0 a 3), sem classe fixa do Tailwind ----
  useEffect(() => {
    const niveis = ["100%", "115%", "130%", "150%"];
    document.documentElement.style.fontSize = niveis[zoomPagina];
  }, [zoomPagina]);

  // ---- GUIA DE LEITURA: exceção real, posição calculada a cada movimento do mouse ----
  useEffect(() => {
    if (!guiaLeitura) return;
    function mover(e) {
      if (guiaRef.current) guiaRef.current.style.top = `${e.clientY}px`;
    }
    window.addEventListener("mousemove", mover);
    return () => window.removeEventListener("mousemove", mover);
  }, [guiaLeitura]);

  // ---- MÁSCARA DE LEITURA: mesma exceção (posição do mouse) ----
  useEffect(() => {
    if (!mascaraLeitura) return;
    function mover(e) {
      const altura = 120;
      if (mascaraTopoRef.current)
        mascaraTopoRef.current.style.height = `${e.clientY - altura / 2}px`;
      if (mascaraBaixoRef.current)
        mascaraBaixoRef.current.style.top = `${e.clientY + altura / 2}px`;
    }
    window.addEventListener("mousemove", mover);
    return () => window.removeEventListener("mousemove", mover);
  }, [mascaraLeitura]);

  // ---- LEITOR DE TEXTO ----
  useEffect(() => {
    if (!leitorAtivo) return;
    function lerAoClicar(e) {
      const texto = e.target.innerText || e.target.textContent;
      if (!texto || !texto.trim()) return;
      window.speechSynthesis.cancel();
      const fala = new SpeechSynthesisUtterance(texto.trim());
      fala.lang = "pt-BR";
      window.speechSynthesis.speak(fala);
    }
    document.addEventListener("click", lerAoClicar, true);
    return () => {
      document.removeEventListener("click", lerAoClicar, true);
      window.speechSynthesis.cancel();
    };
  }, [leitorAtivo]);

  // ---- BUSCA POR VOZ ----
  function alternarBuscaPorVoz() {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Seu navegador não suporta busca por voz. Tente o Google Chrome.");
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
      const campos = document.querySelectorAll('input[placeholder*="pesquis" i]');
      campos.forEach((campo) => {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        setter.call(campo, texto);
        campo.dispatchEvent(new Event("input", { bubbles: true }));
      });
    };

    reconhecimento.onerror = () => setBuscaVozAtiva(false);
    reconhecimento.onend = () => setBuscaVozAtiva(false);

    reconhecimento.start();
    reconhecimentoRef.current = reconhecimento;
    setBuscaVozAtiva(true);
  }

  function redefinirConfiguracoes() {
    setContrasteAtivo(false);
    setMenuGrande(false);
    setLinksDestacados(false);
    setTextoMaior(0);
    setPararAnimacoes(false);
    setOcultarImagens(false);
    setCursorGrande(false);
    setSaturacao(0);
    setFonteDislexia(false);
    setGuiaLeitura(false);
    setMascaraLeitura(false);
    setAjusteCores(0);
    setZoomPagina(0);
    setLeitorAtivo(false);
    if (buscaVozAtiva) alternarBuscaPorVoz();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 pb-20 text-white uppercase">
      {/* guia de leitura */}
      {guiaLeitura && (
        <div
          ref={guiaRef}
          className="fixed left-0 w-full h-9 bg-yellow-300/40 border-y-2 border-yellow-400 pointer-events-none z-9998"
        />
      )}

      {/* máscara de leitura */}
      {mascaraLeitura && (
        <>
          <div
            ref={mascaraTopoRef}
            className="fixed top-0 left-0 w-full bg-black/80 pointer-events-none z-9998"
          />
          <div
            ref={mascaraBaixoRef}
            className="fixed bottom-0 left-0 w-full bg-black/80 pointer-events-none z-9998"
            style={{ height: "100vh" }}
          />
        </>
      )}

      {/* botão de acessibilidade */}
      <button
        onClick={() => setMenuAcessibilidade(true)}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-800 border-4 border-blue-800 shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all"
      >
        <Accessibility size={20} className="sm:hidden" />
        <Accessibility size={22} className="hidden sm:block" />
      </button>

      {menuAcessibilidade && (
        <div
          onClick={() => setMenuAcessibilidade(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-85 ${
          menuGrande ? "sm:w-125 sm:max-w-125" : "sm:w-85"
        } bg-[#171c2d] z-50 shadow-2xl transition-all duration-300 ${
          menuAcessibilidade ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-blue-950">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 uppercase">
                  <Accessibility size={22} className="shrink-0" />
                  MENU ACESSIBILIDADE
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-300 mt-1 uppercase">
                  ATALHO PARA ABRIR O MENU:
                  <span className="font-semibold"> CTRL + L</span>
                </p>
              </div>
              <button
                onClick={() => setMenuAcessibilidade(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-blue-950 transition shrink-0"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-blue-800">
            <span className="text-xs sm:text-sm font-semibold uppercase">
              MENU SUPERDIMENSIONADO
            </span>
            <button
              onClick={() => setMenuGrande(!menuGrande)}
              className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                menuGrande ? "bg-blue-600" : "bg-gray-500"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  menuGrande ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 pl-4 sm:pl-5 pr-6 sm:pr-8 py-4 sm:py-5 overflow-y-auto h-[calc(100vh-96px)] sm:h-[calc(100vh-90px)]">
          <Card icon={<Eye size={20} />} titulo="CONTRASTE +" ativo={contrasteAtivo} onClick={() => setContrasteAtivo((v) => !v)} />
          <Card icon={<LinkIcon size={20} />} titulo="LINKS DESTACADOS" ativo={linksDestacados} onClick={() => setLinksDestacados((v) => !v)} />
          <Card icon={<Type size={20} />} titulo={textoMaior > 0 ? `TEXTO MAIOR (${textoMaior}/3)` : "TEXTO MAIOR"} ativo={textoMaior > 0} onClick={() => setTextoMaior((v) => (v + 1) % 4)} />
          <Card icon={<PauseCircle size={20} />} titulo="PARAR ANIMAÇÕES" ativo={pararAnimacoes} onClick={() => setPararAnimacoes((v) => !v)} />
          <Card icon={<Image size={20} />} titulo="OCULTAR IMAGENS" ativo={ocultarImagens} onClick={() => setOcultarImagens((v) => !v)} />
          <Card icon={<MousePointer2 size={20} />} titulo="CURSOR" ativo={cursorGrande} onClick={() => setCursorGrande((v) => !v)} />
          <Card icon={<Droplets size={20} />} titulo="SATURAÇÃO" ativo={saturacao > 0} onClick={() => setSaturacao((v) => (v + 1) % 3)} />
          <Card icon={<BookOpen size={20} />} titulo="FONTE PARA DISLEXIA" ativo={fonteDislexia} onClick={() => setFonteDislexia((v) => !v)} />
          <Card icon={<ScanLine size={20} />} titulo="GUIA DE LEITURA" ativo={guiaLeitura} onClick={() => setGuiaLeitura((v) => !v)} />
          <Card icon={<Image size={20} />} titulo="MÁSCARA DE LEITURA" ativo={mascaraLeitura} onClick={() => setMascaraLeitura((v) => !v)} />
          <Card icon={<Palette size={20} />} titulo="AJUSTE DE CORES" ativo={ajusteCores > 0} onClick={() => setAjusteCores((v) => (v + 1) % 4)} />
          <Card icon={<ZoomIn size={20} />} titulo={zoomPagina > 0 ? `ZOOM (${zoomPagina}/3)` : "ZOOM DA PÁGINA"} ativo={zoomPagina > 0} onClick={() => setZoomPagina((v) => (v + 1) % 4)} />
          <Card icon={<Volume2 size={20} />} titulo="LEITOR DE TEXTO" ativo={leitorAtivo} onClick={() => setLeitorAtivo((v) => !v)} />
          <Card icon={<Mic size={20} />} titulo="BUSCA POR VOZ" ativo={buscaVozAtiva} onClick={alternarBuscaPorVoz} />

          <button
            onClick={redefinirConfiguracoes}
            className="col-span-2 mt-1 mb-3 sm:mb-4 min-h-12 sm:min-h-14 py-2 px-3 rounded-xl border border-gray-600 bg-[#1f2436] hover:bg-blue-600 transition font-bold uppercase text-xs sm:text-sm flex items-center justify-center gap-2 text-center leading-tight"
          >
            <RotateCcw size={18} className="shrink-0" />
            <span>redefinir configurações</span>
          </button>
        </div>
      </aside>
    </main>
  );
}

function Card({ icon, titulo, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-20 sm:h-24 rounded-xl border transition flex flex-col justify-center items-center gap-1.5 sm:gap-1.5 p-2 ${
        ativo ? "bg-blue-600 border-blue-600" : "border-gray-600 bg-[#1f2436] hover:bg-blue-600"
      }`}
    >
      <div className="sm:scale-90">{icon}</div>
      <span className="text-[10px] sm:text-[10px] font-semibold text-center px-1 sm:px-2 leading-tight">
        {titulo}
      </span>
    </button>
  );
}

export default Button;