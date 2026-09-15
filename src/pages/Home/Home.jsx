import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 pb-4 w-full ">
        {/* BANNER */}
        <section className="mt-4 sm:mt-8 sm:w-screen sm:relative sm:left-1/2 sm:right-1/2 sm:mx-[-50vw]">
          <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-125 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-360 mx-auto bg-linear-to-br from-slate-900 to-slate-950">
            {/* formas decorativas */}
            <div className="absolute -top-10 -right-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-blue-700 opacity-30"></div>
            <div className="absolute -bottom-16 right-8 sm:right-16 w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-blue-500 opacity-20"></div>

            {/* conteúdo do banner, centralizado */}
            <div className="relative h-full flex flex-col items-center justify-center text-center gap-3 sm:gap-4 px-6 sm:px-8 lg:px-12">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span className="text-[10px] sm:text-sm font-semibold tracking-wide text-blue-300">
                  PORTAL ESPORTIVO
                </span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-snug sm:leading-tight text-white max-w-xs sm:max-w-xl">
                VIVA O ESPORTE DE TAUBATÉ
              </h1>

              <p className="hidden sm:block text-sm md:text-base lg:text-lg text-slate-400 max-w-md lg:max-w-xl">
                ACOMPANHE CAMPEONATOS, RESULTADOS, MODALIDADES E OS PRINCIPAIS DESTAQUES ESPORTIVOS DA CIDADE.
              </p>

              <div className="flex items-center gap-4 mt-1 sm:mt-2">
                <Link
                  to="/News"
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-semibold text-white transition w-fit"
                >
                  ÚLTIMAS NOTÍCIAS
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ESPORTES */}
        <section className="mt-10 text-white uppercase">
          {/* título */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="hidden sm:block h-0.5 w-28 md:w-52 bg-blue-500"></div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-[6px] text-center">
              ESPORTES
            </h2>

            <div className="hidden sm:block h-0.5 w-28 md:w-52 bg-blue-500"></div>
          </div>

          {/* cards */}
          <div className="flex flex-wrap justify-center gap-8">
            {/* HANDEBOL */}
            <Link
              to="/Handebol"
              className="group w-72 rounded-2xl overflow-hidden bg-linear-to-b from-blue-900 to-slate-950 border border-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-blue-400 hover:shadow-blue-500/30 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                  <img
                    src="/Imagens/handebol.png"
                    alt="escudo"
                    className="w-20 h-28 object-contain opacity-90"
                  />
                </div>

                <h3 className="text-2xl font-extrabold tracking-wide">
                  HANDEBOL
                </h3>

                <p className="text-gray-300 text-sm mt-3 text-center">
                  EQUIPES E COMPETIÇÕES
                </p>

                <div className="w-full border-t border-blue-800 mt-6 pt-4">
                  <span className="flex justify-center items-center gap-2 text-blue-300 font-bold group-hover:text-white transition">
                    VER MAIS →
                  </span>
                </div>
              </div>
            </Link>

            {/* VÔLEI */}
            <Link
              to="/Volleyball"
              className="group w-72 rounded-2xl overflow-hidden bg-linear-to-b from-blue-900 to-slate-950 border border-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-blue-400 hover:shadow-blue-500/30 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                  <img
                    src="/Imagens/vôlei.png"
                    alt="escudo"
                    className="w-20 h-28 object-contain opacity-90"
                  />
                </div>

                <h3 className="text-2xl font-extrabold tracking-wide">VÔLEI</h3>

                <p className="text-gray-300 text-sm mt-3 text-center">
                  JOGOS E TORNEIOS
                </p>

                <div className="w-full border-t border-blue-800 mt-6 pt-4">
                  <span className="flex justify-center items-center gap-2 text-blue-300 font-bold group-hover:text-white transition">
                    VER MAIS →
                  </span>
                </div>
              </div>
            </Link>

            {/* TÊNIS DE MESA */}
            <Link
              to="/Tabletennis"
              className="group w-72 rounded-2xl overflow-hidden bg-linear-to-b from-blue-900 to-slate-950 border border-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-blue-400 hover:shadow-blue-500/30 hover:shadow-2xl">
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-5 w-20 h-20 flex items-center justify-center">

                  <img
                    src="/Imagens/tênis de mesa.png"
                    alt="escudo"
                    className="w-20 h-28 object-contain opacity-90"
                  />
                </div>

                <h3 className="text-2xl font-extrabold tracking-wide text-center">
                  TÊNIS DE MESA
                </h3>

                <p className="text-gray-300 text-sm mt-3 text-center">
                  RANKING E PARTIDAS
                </p>

                <div className="w-full border-t border-blue-800 mt-6 pt-4">
                  <span className="flex justify-center items-center gap-2 text-blue-300 font-bold group-hover:text-white transition">
                    VER MAIS →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button />
    </>
  );
}

export default Home;