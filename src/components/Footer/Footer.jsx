import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      id="contatos"
      className="w-full py-2 bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 -mt-12.5 uppercase"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* CONTAINER PRINCIPAL */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 pt-4">
          {/* LOGOTIPO */}
          <div className="flex items-center justify-center shrink-0">
            <img
              src="./src/Imagens/logotipo.png"
              alt="logotipo"
              className="w-20 h-28 object-contain opacity-90"
            />
          </div>

          {/* ACOMPANHE + NAVEGAÇÃO + NEWSLETTER */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-14 w-full lg:w-auto">
            {/* ACOMPANHE */}
            <div className="flex flex-col items-center lg:items-start justify-center gap-2 w-full lg:w-60">
              <div>
                <p className="text-center lg:text-left font-bold text-white text-sm mb-2">
                  ACOMPANHE O{" "}
                  <span className="text-blue-400">TAUBATÉ ESPORTES</span>
                </p>

                <p className="text-white text-center lg:text-left text-sm leading-6">
                  NOTÍCIAS, MODALIDADES,
                  <br />
                  CAMPEONATOS E TUDO SOBRE O
                  <br />
                  ESPORTE EM TAUBATÉ.
                </p>
              </div>

              {/* REDES */}
              <div className="flex justify-center lg:justify-start gap-2 mt-1">
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-[#1877F2] hover:opacity-80 flex items-center justify-center text-white transition"
                >
                  <i className="bi bi-facebook text-sm"></i>
                </a>

                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-linear-to-tr from-[#FEE411] via-[#E1306C] to-[#833AB4] hover:opacity-80 flex items-center justify-center text-white transition"
                >
                  <i className="bi bi-instagram text-sm"></i>
                </a>

                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-[#FF0000] hover:opacity-80 flex items-center justify-center text-white transition"
                >
                  <i className="bi bi-youtube text-sm"></i>
                </a>
              </div>
            </div>

            {/* NAVEGAÇÃO */}
            <nav className="flex flex-col items-center lg:items-start gap-2 w-full lg:w-auto lg:shrink-0">
              <ul className="flex flex-col items-center lg:items-start gap-3 text-blue-300 text-sm font-semibold">
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-2 hover:text-blue-100 transition"
                  >
                    <i className="bi bi-house-door-fill w-4 text-center shrink-0"></i>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Contato"
                    className="flex items-center gap-2 hover:text-blue-100 transition"
                  >
                    <i className="bi bi-person-fill w-4 text-center shrink-0"></i>
                    CONTATO
                  </Link>
                </li>
                <li>
                  <Link
                    to="/News"
                    className="flex items-center gap-2 hover:text-blue-100 transition"
                  >
                    <i className="bi bi-newspaper w-4 text-center shrink-0"></i>
                    NOTÍCIAS
                  </Link>
                </li>
              </ul>
            </nav>

            {/* NEWSLETTER */}
            <div className="flex flex-col items-center lg:items-end justify-center gap-2 w-full lg:w-72">
              <h2 className="flex items-center justify-center lg:justify-end gap-2 text-white font-bold text-sm mb-2">
                <i className="bi bi-envelope-fill"></i>
                NEWSLETTER
              </h2>

              <p className="text-white text-center lg:text-right text-sm leading-6">
                RECEBA NOTÍCIAS ESPORTIVAS
                <br />
                DIRETAMENTE NO SEU E-MAIL.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-row gap-2 mt-1 justify-center lg:justify-end"
              >
                <input
                  type="email"
                  placeholder="SEU E-MAIL"
                  className="w-40 h-9 px-3 rounded-lg bg-slate-950 border border-blue-700 text-center text-xs text-white placeholder:text-gray-500 outline-none focus:border-blue-400 transition"
                />

                <button
                  type="submit"
                  className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition whitespace-nowrap"
                >
                  ENVIAR
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <p className="text-center lg:text-center text-[10px] text-gray-400 mt-3">
          © {new Date().getFullYear()} TAUBATÉ ESPORTES — TODOS OS DIREITOS
          RESERVADOS
        </p>
      </div>
    </footer>
  );
}