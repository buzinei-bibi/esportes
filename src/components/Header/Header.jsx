import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 text-white uppercase bg-linear-to-r from-slate-950 via-blue-950 to-slate-900">
      <header className="w-full flex flex-col">
        {/* faixa branca */}
        <div className="w-full bg-white h-7"></div>

        {/* barra principal */}
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-10 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 md:gap-4 lg:gap-8">
          {/* coluna esquerda: menu (mobile) + logo (desktop) */}
          <div className="flex items-center gap-3 justify-self-start min-w-0">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="shrink-0 text-white text-2xl sm:text-3xl md:hidden"
            >
              {menuOpen ? (
                <i className="bi bi-arrow-right-circle"></i>
              ) : (
                <i className="bi bi-list"></i>
              )}
            </button>

            {/* logo no desktop (lado esquerdo) */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hidden md:block shrink-0"
            >
              <img
                src="/Imagens/logotipo.png"
                alt="logotipo"
                className="w-12 md:w-16 lg:w-18 h-auto object-contain"
              />
            </Link>
          </div>
          {/* coluna central: pesquisa */}
          <div className="justify-self-stretch md:justify-self-start lg:justify-self-center w-full flex justify-center md:justify-start lg:justify-center min-w-0">
            <div className="flex items-center bg-black border border-white/10 focus-within:border-blue-400/60 rounded-xl md:rounded-2xl px-3 md:px-4 h-10 md:h-12 lg:h-14 w-full max-w-40 sm:max-w-55 md:max-w-55 lg:max-w-md xl:max-w-lg min-w-0 transition-colors duration-200 shadow-inner">
              <i className="bi bi-search text-white/80 mr-2 md:mr-3 shrink-0 text-sm md:text-lg"></i>
              {/* MOBILE: só até 767px */}
              <input
                type="text"
                placeholder="pesquise"
                className="block md:hidden bg-transparent outline-none text-white placeholder-white/80 text-xs w-full min-w-0 uppercase"
              />

              {/* TABLET: 768px até 1279px */}
              <input
                type="text"
                placeholder="pesquise aqui"
                className="hidden md:block xl:hidden bg-transparent outline-none text-white placeholder-white/80 text-sm w-full min-w-0 uppercase"
              />

              {/* DESKTOP: 1280px+ */}
              <input
                type="text"
                placeholder="pesquise por partidas, competições, times..."
                className="hidden xl:block bg-transparent outline-none text-white placeholder-white/60 text-base w-full min-w-0 normal-case tracking-normal"
              />
            </div>
          </div>

          {/* coluna direita: logo (mobile) + ícones desktop */}
          <div className="justify-self-end shrink-0 flex items-center">
            {/* logo no mobile (lado oposto ao menu) */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block md:hidden shrink-0"
            >
              <img
                src="/Imagens/logotipo.png"
                alt="logotipo"
                className="w-10 sm:w-12 h-auto object-contain"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-3 lg:gap-8 text-sm lg:text-lg font-semibold shrink-0">
              <Link
                to="/"
                className="hover:text-blue-300 flex items-center gap-2"
              >
                <i className="bi bi-house text-lg lg:text-xl"></i>
                <span className="hidden lg:inline">HOME</span>
              </Link>

              {/* ESPORTES (dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => setSportsOpen(true)}
                onMouseLeave={() => setSportsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSportsOpen((prev) => !prev)}
                  className="hover:text-blue-300 flex items-center gap-2"
                >
                  <i className="bi bi-trophy text-lg lg:text-xl"></i>
                  <span className="hidden lg:inline">ESPORTES</span>
                  <i
                    className={`bi bi-chevron-down text-sm transition-transform duration-200 ${
                      sportsOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                <div
                  className={`absolute right-0 top-full pt-3 w-52 transition-all duration-200 ${
                    sportsOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="flex flex-col bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 rounded-xl shadow-2xl overflow-hidden border border-white/10">
                    <Link
                      to="/Handebol"
                      onClick={() => setSportsOpen(false)}
                      className="px-4 py-3 hover:bg-blue-900/50 flex items-center gap-3 text-sm"
                    >
                      <i className="bi bi-dribbble text-lg"></i>
                      HANDEBOL
                    </Link>
                    <Link
                      to="/Tabletennis"
                      onClick={() => setSportsOpen(false)}
                      className="px-4 py-3 hover:bg-blue-900/50 flex items-center gap-3 text-sm"
                    >
                      <svg
                        className="w-4.5 h-4.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.5 1a4.5 4.5 0 0 0-4.473 4.03 3.5 3.5 0 0 0-1.99 5.917L1.146 13.84a.5.5 0 1 0 .708.708l2.892-2.892a3.5 3.5 0 0 0 4.706-4.706A4.5 4.5 0 1 0 10.5 1Zm0 1a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM6.379 8.243a2.5 2.5 0 1 0 3.379 3.379 3.5 3.5 0 0 1-3.379-3.379Z" />
                      </svg>
                      TÊNIS DE MESA
                    </Link>
                    <Link
                      to="/Volleyball"
                      onClick={() => setSportsOpen(false)}
                      className="px-4 py-3 hover:bg-blue-900/50 flex items-center gap-3 text-sm"
                    >
                      <i className="bi bi-circle text-lg"></i>
                      VÔLEI
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to="/News"
                className="hover:text-blue-300 flex items-center gap-2"
              >
                <i className="bi bi-newspaper text-lg lg:text-xl"></i>
                <span className="hidden lg:inline">NOTÍCIAS</span>
              </Link>

              <Link
                to="/Contato"
                className="hover:text-blue-300 flex items-center gap-2"
              >
                <i className="bi bi-person text-lg lg:text-xl"></i>
                <span className="hidden lg:inline">CONTATOS</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* overlay (apenas mobile) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* menu lateral (apenas mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 z-50 pt-24 px-6 transition-transform duration-300 md:hidden shadow-2xl overflow-y-auto ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-10 text-white text-3xl"
        >
          <i className="bi bi-arrow-right-circle"></i>
        </button>

        <nav className="flex flex-col gap-6 text-lg font-bold pb-10">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-300 flex items-center gap-3"
          >
            <i className="bi bi-house text-2xl"></i>
            HOME
          </Link>

          <Link
            to="/News"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-300 flex items-center gap-3"
          >
            <i className="bi bi-newspaper text-2xl"></i>
            NOTÍCIAS
          </Link>

          <Link
            to="/Contato"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-300 flex items-center gap-3"
          >
            <i className="bi bi-person text-2xl"></i>
            CONTATOS
          </Link>

          <Link
            to="/Handebol"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-300 flex items-center gap-3"
          >
            <i className="bi bi-dribbble text-2xl"></i>
            HANDEBOL
          </Link>

          <Link
            to="/Volleyball"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-300 flex items-center gap-3"
          >
            <i className="bi bi-circle text-2xl"></i>
            VÔLEI
          </Link>

          <Link
            to="/Tabletennis"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-300 flex items-center gap-3"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.5 1a4.5 4.5 0 0 0-4.473 4.03 3.5 3.5 0 0 0-1.99 5.917L1.146 13.84a.5.5 0 1 0 .708.708l2.892-2.892a3.5 3.5 0 0 0 4.706-4.706A4.5 4.5 0 1 0 10.5 1Zm0 1a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM6.379 8.243a2.5 2.5 0 1 0 3.379 3.379 3.5 3.5 0 0 1-3.379-3.379Z" />
            </svg>
            TÊNIS DE MESA
          </Link>
        </nav>
      </div>
    </div>
  );
}
