import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 pb-4 w-full">
        {/* BANNER */}
        <section className="mt-8">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125 rounded-3xl overflow-hidden shadow-2xl">
            {/* overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* conteúdo do banner */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12 text-white">
              <span className="bg-blue-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold w-fit">
                PORTAL ESPORTIVO
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight uppercase">
                VIVA O ESPORTE DE TAUBATÉ
              </h1>

              <p className="hidden sm:block text-sm md:text-base lg:text-xl text-gray-200 mt-4 uppercase max-w-2xl">
                ACOMPANHE CAMPEONATOS, RESULTADOS, MODALIDADES E OS PRINCIPAIS
                DESTAQUES ESPORTIVOS DA CIDADE.
              </p>

              <div className="flex gap-4 mt-6">
                <Link
                  to="/News"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-sm sm:text-base font-bold transition"
                >
                  VER ESPORTES
                </Link>

                <Link
                  to="/News"
                  className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl text-sm sm:text-base font-bold transition"
                >
                  ÚLTIMAS NOTÍCIAS
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
            <Link
              to="/Handebol"
              className="group w-72 rounded-2xl overflow-hidden bg-linear-to-b from-blue-900 to-slate-950 border border-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-blue-400 hover:shadow-blue-500/30 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-25"></div>

                  <img
                    src="./src/Imagens/handebol.png"
                    alt="handebol"
                    className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110"
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
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-25"></div>

                  <img
                    src="./src/Imagens/vôlei.png"
                    alt="Vôlei"
                    className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110"
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
              className="group w-72 rounded-2xl overflow-hidden bg-linear-to-b from-blue-900 to-slate-950 border border-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-blue-400 hover:shadow-blue-500/30 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-25"></div>

                  <img
                    src="./src/Imagens/tênis de mesa.png"
                    alt="tênis de mesa"
                    className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110"
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
