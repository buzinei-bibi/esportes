import { useState, useEffect } from "react";
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

  // Atalho de teclado: CTRL + L abre/fecha o menu de acessibilidade
  useEffect(() => {
    function handleKeyDown(e) {
      const tecla = e.key?.toLowerCase();
      if (e.ctrlKey && tecla === "l") {
        e.preventDefault(); // evita o CTRL+L padrão do navegador (focar na barra de endereço)
        setMenuAcessibilidade((aberto) => !aberto);
      }
      if (e.key === "Escape") {
        setMenuAcessibilidade(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Aplica/remove o alto contraste na página inteira
  useEffect(() => {
    document.documentElement.classList.toggle(
      "acessibilidade-alto-contraste",
      contrasteAtivo
    );
  }, [contrasteAtivo]);

  function redefinirConfiguracoes() {
    setContrasteAtivo(false);
    setMenuGrande(false);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 pb-20 text-white uppercase">
      {/* estilos do alto contraste, aplicados na página inteira */}
      <style>{`
        .acessibilidade-alto-contraste,
        .acessibilidade-alto-contraste * {
          background-color: #000 !important;
          color: #fef200 !important;
          border-color: #fef200 !important;
        }
        .acessibilidade-alto-contraste img,
        .acessibilidade-alto-contraste svg {
          filter: grayscale(1) contrast(1.4);
        }
        .acessibilidade-alto-contraste a,
        .acessibilidade-alto-contraste button {
          text-decoration: underline;
        }
      `}</style>

      {/* botão de acessibilidade */}
      <button
        onClick={() => setMenuAcessibilidade(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-800 border-4 border-blue-800 shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all"
      >
        <Accessibility size={26} className="sm:hidden" />
        <Accessibility size={30} className="hidden sm:block" />
      </button>

      {/* fundo escuro */}
      {menuAcessibilidade && (
        <div
          onClick={() => setMenuAcessibilidade(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* menu */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-85 ${
          menuGrande ? "sm:w-125 sm:max-w-125" : "sm:w-85"
        } bg-[#171c2d] z-50 shadow-2xl transition-all duration-300 ${
          menuAcessibilidade ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* cabeçalho */}
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

          {/* Menu Superdimensionado */}
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

        {/* cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pl-4 sm:pl-5 pr-6 sm:pr-8 py-4 sm:py-5 overflow-y-auto h-[calc(100vh-96px)] sm:h-[calc(100vh-90px)]">
          <Card
            icon={<Eye size={26} />}
            titulo="CONTRASTE +"
            ativo={contrasteAtivo}
            onClick={() => setContrasteAtivo((v) => !v)}
          />
          <Card icon={<LinkIcon size={26} />} titulo="LINKS DESTACADOS" />
          <Card icon={<Type size={26} />} titulo="TEXTO MAIOR" />
          <Card icon={<PauseCircle size={26} />} titulo="PARAR ANIMAÇÕES" />
          <Card icon={<Image size={26} />} titulo="OCULTAR IMAGENS" />
          <Card icon={<MousePointer2 size={26} />} titulo="CURSOR" />
          <Card icon={<Droplets size={26} />} titulo="SATURAÇÃO" />
          <Card icon={<BookOpen size={26} />} titulo="FONTE PARA DISLEXIA" />
          <Card icon={<ScanLine size={26} />} titulo="GUIA DE LEITURA" />
          <Card icon={<Image size={26} />} titulo="MÁSCARA DE LEITURA" />
          <Card icon={<Palette size={26} />} titulo="AJUSTE DE CORES" />
          <Card icon={<ZoomIn size={26} />} titulo="ZOOM DA PÁGINA" />
          <Card icon={<Volume2 size={26} />} titulo="LEITOR DE TEXTO" />
          <Card icon={<Mic size={26} />} titulo="BUSCA POR VOZ" />

          {/* botão grande */}
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
      className={`h-28 sm:h-32 rounded-xl border transition flex flex-col justify-center items-center gap-2 sm:gap-3 p-2 ${
        ativo
          ? "bg-blue-600 border-blue-600"
          : "border-gray-600 bg-[#1f2436] hover:bg-blue-600"
      }`}
    >
      <div>{icon}</div>

      <span className="text-xs sm:text-sm font-semibold text-center px-1 sm:px-2 leading-tight">
        {titulo}
      </span>
    </button>
  );
}

export default Button;