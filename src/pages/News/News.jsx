import Button from "../../components/Button/Button";

function News() {
  return (
    <>
      <main className="w-full px-4 -mt-2 uppercase">
      <section className="w-full text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* título */}
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold tracking-wider leading-none">
              notícias
            </h1>

            <div className="w-32 h-1 bg-blue-500 rounded-full mt-4"></div>

            <p className="text-gray-300 mt-4 text-sm md:text-base">
              acompanhe as principais novidades dos esportes de taubaté
            </p>
          </div>

          {/* destaques */}

          <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
            {/* futebol */}

            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 duration-300">
              <img
                src="/imagens/vôlei.jpg"
                className="w-full h-52 object-cover"
                alt="vôlei"
              />

              <div className="p-5">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
               vôlei
                </span>

                <h2 className="mt-4 text-lg font-bold leading-tight">
                  taubaté inicia preparação para o próximo desafio da temporada
                </h2>

                <p className="text-gray-300 text-sm mt-3">
                  equipe intensifica treinos buscando evolução e melhor
                  desempenho.
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  taubaté • há 2 horas
                </p>
              </div>
            </div>

            {/* handebol */}

            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 duration-300">
              <img
                src="/imagens/handebol.jpg"
                className="w-full h-52 object-cover"
                alt="handebol"
              />

              <div className="p-5">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  handebol
                </span>

                <h2 className="mt-4 text-lg font-bold leading-tight">
                  taubaté busca manter boa fase no campeonato
                </h2>

                <p className="text-gray-300 text-sm mt-3">
                  elenco segue confiante para a próxima rodada.
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  taubaté • há 4 horas
                </p>
              </div>
            </div>

            {/* tênis de mesa */}

            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 duration-300">
              <img
                src="/imagens/tênis de mesa.jpg"
                className="w-full h-52 object-cover"
                alt="tênis de mesa"
              />

              <div className="p-5">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  tênis de mesa
                </span>

                <h2 className="mt-4 text-lg font-bold leading-tight">
                  segue firme na preparação
                </h2>

                <p className="text-gray-300 text-sm mt-3">
                  equipe ajusta detalhes para as próximas competições.
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  taubaté • há 6 horas
                </p>
              </div>
            </div>

            {/* vôlei */}

            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 duration-300">
              <img
                src="/imagens/vôlei.jpg"
                className="w-full h-52 object-cover"
                alt="vôlei"
              />

              <div className="p-5">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  vôlei
                </span>

                <h2 className="mt-4 text-lg font-bold leading-tight">
                  vôlei de taubaté mantém foco nas próximas partidas
                </h2>

                <p className="text-gray-300 text-sm mt-3">
                  treinamentos intensos marcam a semana da equipe.
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  taubaté • há 8 horas
                </p>
              </div>
            </div>
          </section>

          {/* notícias grandes */}

          <section className="grid lg:grid-cols-2 gap-8">
            {/* tênis */}

            <div className="bg-black/20 backdrop-blur-md border border-white/10  rounded-2xl overflow-hidden hover:scale-105 duration-300">
              <div className="md:flex">
                <img
                  src="/imagens/tênis de mesa.jpg"
                  className="w-full md:w-1/2 h-72 object-cover"
                  alt="tênis de mesa"
                />

                <div className="p-6 flex flex-col justify-center">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold w-fit">
                    tênis de mesa
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    tênis de mesa de taubaté conquista destaques regionais
                  </h2>

                  <p className="text-gray-300 mt-4 leading-relaxed">
                    atletas representam a cidade em diversas competições e
                    seguem acumulando bons resultados.
                  </p>

                  <p className="text-xs text-gray-400 mt-5">
                    taubaté • há 10 horas
                  </p>
                </div>
              </div>
            </div>

            {/* geral */}

            <article className="bg-black/20 backdrop-blur-md border border-white/10  rounded-2xl overflow-hidden hover:scale-105 duration-300">
              <div className="md:flex">
                <img
                  src="/imagens/handebol.jpg"
                  className="w-full md:w-1/2 h-72 object-cover"
                  alt="handebol"
                />

                <div className="p-6 flex flex-col justify-center">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold w-fit">
                    handebol
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                   movimentam a semana com treinos intensos 
                   para próximo jogo
                  </h2>

                  <p className="text-gray-300 mt-4 leading-relaxed">
                   se preparando para os jogos, equipe de handebol
                   seguem representando a cidade em alto nível.
                  </p>

                  <p className="text-xs text-gray-400 mt-5">taubaté • hoje</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>

     {/* BOTÃO DE ACESSIBILIDADE */}
    <Button />
  </>
  );
}

export default News;
