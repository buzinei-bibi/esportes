import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";

const now = Date.now();

// links de referência por esporte (fontes regionais reais — PortalR3)
const LINKS = {
  "vôlei":
    "https://www.portalr3.com.br/2026/03/24/temporada-esportiva-taubate-2026-fadat",
  handebol:
    "https://www.portalr3.com.br/2026/05/23/handebol-taubate-estreia-neste-sabado-23-na-liga-nacional-contra-pinheiros",
  "tênis de mesa": "https://www.portalr3.com.br/editoria/esportes/tenis-de-mesa",
};

// lista de notícias — adicione novos itens aqui (cada card usa esses dados)
const noticias = [
  {
    id: "volei1",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "taubaté inicia preparação para o próximo desafio da temporada",
    resumo: "equipe intensifica treinos buscando evolução e melhor desempenho.",
    publicadoEm: new Date(now - 2 * 60 * 60 * 1000), // há 2 horas
  },
  {
    id: "handebol1",
    esporte: "handebol",
    imagem: "/Imagens/handebol.jpg",
    titulo: "taubaté busca manter boa fase no campeonato",
    resumo: "elenco segue confiante para a próxima rodada.",
    publicadoEm: new Date(now - 4 * 60 * 60 * 1000), // há 4 horas
  },
  {
    id: "tenis1",
    esporte: "tênis de mesa",
    imagem: "/Imagens/tênis de mesa.jpg",
    titulo: "segue firme na preparação",
    resumo: "equipe ajusta detalhes para as próximas competições.",
    publicadoEm: new Date(now - 6 * 60 * 60 * 1000), // há 6 horas
  },
  {
    id: "volei2",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "vôlei de taubaté mantém foco nas próximas partidas",
    resumo: "treinamentos intensos marcam a semana da equipe.",
    publicadoEm: new Date(now - 8 * 60 * 60 * 1000), // há 8 horas
  },
  {
    id: "tenis2",
    esporte: "tênis de mesa",
    imagem: "/Imagens/tênis de mesa.jpg",
    titulo: "tênis de mesa de taubaté conquista destaques regionais",
    resumo: "atletas representam a cidade em diversas competições e seguem acumulando bons resultados.",
    publicadoEm: new Date(now - 10 * 60 * 60 * 1000), // há 10 horas
  },
  {
    id: "handebol2",
    esporte: "handebol",
    imagem: "/Imagens/handebol.jpg",
    titulo: "movimentam a semana com treinos intensos para próximo jogo",
    resumo: "se preparando para os jogos, equipe de handebol segue representando a cidade em alto nível.",
    publicadoEm: new Date(now - 30 * 60 * 1000), // há 30 min
  },
  {
    id: "volei3",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "categoria de base do vôlei se destaca em torneio estadual",
    resumo: "jovens atletas de taubaté chamam atenção pelo desempenho coletivo.",
    publicadoEm: new Date(now - 14 * 60 * 60 * 1000), // há 14 horas
  },
  {
    id: "handebol3",
    esporte: "handebol",
    imagem: "/Imagens/handebol.jpg",
    titulo: "handebol feminino se prepara para clássico regional",
    resumo: "comissão técnica define estratégias para o confronto decisivo.",
    publicadoEm: new Date(now - 18 * 60 * 60 * 1000), // há 18 horas
  },
  {
    id: "tenis3",
    esporte: "tênis de mesa",
    imagem: "/Imagens/tênis de mesa.jpg",
    titulo: "tênis de mesa recebe novos equipamentos para treinos",
    resumo: "investimento visa melhorar estrutura para os atletas da cidade.",
    publicadoEm: new Date(now - 22 * 60 * 60 * 1000), // há 22 horas
  },
  {
    id: "volei4",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "vôlei encerra fase classificatória em boa posição",
    resumo: "equipe garante vaga nas quartas de final da competição.",
    publicadoEm: new Date(now - 26 * 60 * 60 * 1000), // há 1 dia e 2h
  },
  {
    id: "handebol4",
    esporte: "handebol",
    imagem: "/Imagens/handebol.jpg",
    titulo: "handebol de taubaté anuncia reforços para a temporada",
    resumo: "novos atletas chegam para fortalecer o elenco nos próximos jogos.",
    publicadoEm: new Date(now - 30 * 60 * 60 * 1000), // há 1 dia e 6h
  },
  {
    id: "tenis4",
    esporte: "tênis de mesa",
    imagem: "/Imagens/tênis de mesa.jpg",
    titulo: "tênis de mesa disputa etapa decisiva do campeonato paulista",
    resumo: "atletas de taubaté buscam classificação para a fase final.",
    publicadoEm: new Date(now - 34 * 60 * 60 * 1000), // há 1 dia e 10h
  },
  {
    id: "volei5",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "vôlei masculino inicia bateria de amistosos preparatórios",
    resumo: "comissão técnica testa novas formações antes da temporada oficial.",
    publicadoEm: new Date(now - 38 * 60 * 60 * 1000), // há 1 dia e 14h
  },
  {
    id: "handebol5",
    esporte: "handebol",
    imagem: "/Imagens/handebol.jpg",
    titulo: "handebol de taubaté é destaque em ranking estadual",
    resumo: "equipe sobe posições após sequência de bons resultados.",
    publicadoEm: new Date(now - 42 * 60 * 60 * 1000), // há 1 dia e 18h
  },
  {
    id: "tenis5",
    esporte: "tênis de mesa",
    imagem: "/Imagens/tênis de mesa.jpg",
    titulo: "jovens promessas do tênis de mesa se destacam em seletiva",
    resumo: "categoria de base chama atenção de olheiros durante avaliação.",
    publicadoEm: new Date(now - 46 * 60 * 60 * 1000), // há 1 dia e 22h
  },
  {
    id: "volei6",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "vôlei de taubaté realiza ação social antes da rodada decisiva",
    resumo: "atletas participam de evento com a comunidade local.",
    publicadoEm: new Date(now - 50 * 60 * 60 * 1000), // há 2 dias e 2h
  },
  {
    id: "handebol6",
    esporte: "handebol",
    imagem: "/Imagens/handebol.jpg",
    titulo: "handebol de taubaté define calendário para o segundo semestre",
    resumo: "confederação divulga datas dos próximos confrontos da equipe.",
    publicadoEm: new Date(now - 54 * 60 * 60 * 1000), // há 2 dias e 6h
  },
  {
    id: "volei7",
    esporte: "vôlei",
    imagem: "/Imagens/vôlei.jpg",
    titulo: "vôlei de taubaté fecha parceria com novo patrocinador",
    resumo: "acordo reforça estrutura da equipe para a próxima temporada.",
    publicadoEm: new Date(now - 58 * 60 * 60 * 1000), // há 2 dias e 10h
  },
].map((noticia) => ({ ...noticia, link: LINKS[noticia.esporte] }));

// transforma a diferença de tempo em texto tipo "há 2 min", "há 3 h", "agora"
function formatarTempo(data, agora) {
  const diffMs = agora - data;
  const diffSeg = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSeg / 60);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffSeg < 60) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  if (diffHoras < 24) return `há ${diffHoras} ${diffHoras === 1 ? "hora" : "horas"}`;
  return `há ${diffDias} ${diffDias === 1 ? "dia" : "dias"}`;
}

function News() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    // atualiza o "tempo atrás" a cada 30 segundos, como um feed ao vivo
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <main className="w-full px-4 -mt-2 uppercase">
        <section className="w-full text-white py-20 px-4">
          <div className="w-full">
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

            {/* grade de notícias */}
            <section className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-10">
              {noticias.map((noticia) => (
                <div
                  key={noticia.id}
                  className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-105 duration-300"
                >
                  <img
                    src={noticia.imagem}
                    className="w-full h-52 object-cover"
                    alt={noticia.esporte}
                  />

                  <div className="p-5">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      {noticia.esporte}
                    </span>

                    <h2 className="mt-4 text-lg font-bold leading-tight">
                      {noticia.titulo}
                    </h2>

                    <p className="text-gray-300 text-sm mt-3">
                      {noticia.resumo}
                    </p>

                    <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
                      taubaté • {formatarTempo(noticia.publicadoEm, agora)}
                    </p>

                    <a
                      href={noticia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block uppercase text-blue-400 hover:text-blue-300 text-xs font-bold tracking-wide transition-colors duration-300"
                    >
                      ver mais →
                    </a>
                  </div>
                </div>
              ))}
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