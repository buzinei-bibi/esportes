import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 text-white uppercase bg-linear-to-r from-slate-950 via-blue-950 to-slate-900">
      <header className="w-full flex flex-col">
        {/* faixa branca */}
        <div className="w-full bg-white h-7"></div>

        {/* barra principal */}
        <div className="relative w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
          {/* botão menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute top-6 text-white text-3xl"
          >
            {menuOpen ? (
              <i class="bi bi-arrow-right-circle"></i>
            ) : (
              <i className="bi bi-list left-2"></i>
            )}
          </button>
          {/* pesquisa */}
          <div className="order-2 flex-1 flex justify-center min-w-0">
            <div className="flex items-start md:items-center bg-black rounded-xl px-3 md:px-4 pt-2 pb-2.5 md:py-3 w-full max-w-48 md:max-w-lg mx-auto">
              <i className="bi bi-search text-white mr-2 md:mr-3 shrink-0"></i>

              {/* mobile */}
              <input
                type="text"
                placeholder="pesquise"
                className="block md:hidden bg-transparent outline-none text-white placeholder-white text-base w-full min-w-50 uppercase"
              />

              {/* desktop */}
              <input
                type="text"
                placeholder="pesquise por partidas, competições, times..."
                className="hidden md:block bg-transparent outline-none text-white placeholder-white w-full min-w-0"
              />
            </div>
          </div>

          {/* logotipo */}
          <img
            src="./src/Imagens/logotipo.png"
            alt="logotipo"
            className="order-3 md:order-1 w-14 md:w-16 lg:w-20 h-auto object-contain shrink-0"
          />

          {/* menu desktop */}
          <nav className="hidden md:flex items-center gap-6 text-lg font-semibold shrink-0 order-4">
            <Link
              to="/"
              className="hover:text-blue-300 flex items-center gap-2"
            >
              <i className="bi bi-house text-xl"></i>
            </Link>

            <Link
              to="/News"
              className="hover:text-blue-300 flex items-center gap-2"
            >
              <i className="bi bi-newspaper text-xl"></i>
              NOTÍCIAS
            </Link>

            <Link
              to="/Contato"
              className="hover:text-blue-300 flex items-center gap-2"
            >
              <i className="bi bi-person text-xl"></i>
              CONTATOS
            </Link>
          </nav>
        </div>
      </header>

      {/* overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* menu mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 z-50 pt-24 px-6 transition-transform duration-300 md:hidden shadow-2xl ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-10 text-white text-3xl"
        >
          <i class="bi bi-arrow-right-circle"></i>
        </button>

        <nav className="flex flex-col gap-6 text-lg font-bold">
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
        </nav>
      </div>
    </div>
  );
}
