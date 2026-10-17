import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizar } from "../../data/busca";
import { ESPORTES, srcSetDaFoto } from "../../data/jogos";
import "./News.css";

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


// uma fileira por esporte, na ordem do banner da home (mesmas cores dos títulos da home)
const FILEIRAS = [
  { esporte: "handebol", id: "handebol", cor: "#3b82f6" },
  { esporte: "vôlei", id: "volei", cor: "#38bdf8" },
  { esporte: "tênis de mesa", id: "tenis-de-mesa", cor: "#818cf8" },
];

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

// fileira que rola para o lado, com setas para quem usa mouse
function Fileira({ fileira, lista, agora }) {
  const secaoRef = useRef(null);
  const trilhoRef = useRef(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const esporte = ESPORTES.find((e) => e.id === fileira.id);

  function atualizarSetas() {
    const t = trilhoRef.current;
    if (!t) return;
    setInicio(t.scrollLeft <= 4);
    setFim(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4);
  }

  useEffect(() => {
    atualizarSetas();
    window.addEventListener("resize", atualizarSetas);
    return () => window.removeEventListener("resize", atualizarSetas);
  }, [lista.length]);

  // os cards entram em sequência quando a fileira aparece na tela
  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao || !("IntersectionObserver" in window)) {
      setVisivel(true);
      return;
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observador.observe(secao);
    return () => observador.disconnect();
  }, []);

  function rolar(direcao) {
    const t = trilhoRef.current;
    t?.scrollBy({ left: direcao * t.clientWidth * 0.9, behavior: "smooth" });
  }

  return (
    <section
      ref={secaoRef}
      id={`noticias-${fileira.id}`}
      aria-labelledby={`nt-${fileira.id}`}
      style={{ "--nt-accent": fileira.cor }}
      className={`nt-conteudo nt-fileira mt-12 sm:mt-14 ${visivel ? "is-visivel" : ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 id={`nt-${fileira.id}`} className="nt-fileira-titulo">
          {esporte.nome}
        </h2>
        <div className="flex items-center gap-3">
          <Link to={esporte.rota} className="nt-link-esporte">
            VER PÁGINA DO ESPORTE <span aria-hidden="true">→</span>
          </Link>
          <div className="hidden sm:flex gap-2">
            <button type="button" onClick={() => rolar(-1)} disabled={inicio} aria-label={`Notícias anteriores de ${fileira.esporte}`} className="nt-seta">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => rolar(1)} disabled={fim} aria-label={`Mais notícias de ${fileira.esporte}`} className="nt-seta">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <ul ref={trilhoRef} onScroll={atualizarSetas} className="nt-trilho">
        {lista.map((noticia, i) => (
          <li key={noticia.id} className="flex nt-item" style={{ "--i": i }}>
            <a
              href={noticia.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${noticia.titulo} (abre em nova aba)`}
              className="nt-card w-full"
            >
              <div className="nt-foto">
                <img
                  src={`${esporte.foto}-640.webp`}
                  srcSet={srcSetDaFoto(esporte.foto)}
                  sizes="300px"
                  alt=""
                  loading="lazy"
                  className={esporte.foco}
                />
              </div>
              <div className="nt-card-corpo">
                <h3 className="nt-card-titulo">{noticia.titulo}</h3>
                <p className="nt-card-rodape">
                  <span>TAUBATÉ • {formatarTempo(noticia.publicadoEm, agora)}</span>
                  <span aria-hidden="true" className="nt-ver-mais">
                    VER MAIS <span className="nt-ver-mais-seta">→</span>
                  </span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function News() {
  const [filtro, setFiltro] = useState("todos");
  const [agora, setAgora] = useState(new Date());
  // ?busca=... vem da pesquisa do header (digitada ou por voz)
  const [params] = useSearchParams();
  const busca = params.get("busca") || "";
  const termo = normalizar(busca);
  const encontradas = termo
    ? noticias.filter((n) => normalizar(`${n.esporte} ${n.titulo} ${n.resumo}`).includes(termo))
    : noticias;
  const fileiras = FILEIRAS.filter((f) => filtro === "todos" || f.id === filtro);

  useEffect(() => {
    // atualiza o "tempo atrás" a cada 30 segundos, como um feed ao vivo
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <div className="nt uppercase pb-16 sm:pb-20">
        {/* topo: faixa que varre a tela na chegada, título, subtítulo e filtros */}
        <section className="nt-topo pt-10 sm:pt-14 pb-2">
          <div className="nt-varre" aria-hidden="true" />
          <div className="nt-conteudo">
            <div>
              <h1 className="nt-titulo" aria-label="Notícias">
                {"NOTÍCIAS".split("").map((letra, i) => (
                  <span key={i} aria-hidden="true" className={`nt-letra ${i >= 4 ? "nt-letra-cor" : ""}`} style={{ "--i": i }}>
                    {letra}
                  </span>
                ))}
              </h1>
              <p className="nt-sub">ACOMPANHE AS PRINCIPAIS NOVIDADES DOS ESPORTES DE TAUBATÉ.</p>

              {/* filtros por esporte */}
              <div className="nt-filtros" role="group" aria-label="Filtrar notícias por esporte">
                {[{ id: "todos", nome: "TODOS", cor: "#2563eb" }, ...FILEIRAS.map((f) => ({ id: f.id, nome: ESPORTES.find((e) => e.id === f.id).nome, cor: f.cor }))].map((opcao) => (
                  <button
                    key={opcao.id}
                    type="button"
                    aria-pressed={filtro === opcao.id}
                    onClick={() => setFiltro(opcao.id)}
                    style={{ "--nt-accent": opcao.cor }}
                    className="nt-filtro"
                  >
                    {opcao.nome}
                  </button>
                ))}
              </div>

              {/* resultado da busca */}
              {busca && (
                <p role="status" className="mt-5 text-sm text-blue-200 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {encontradas.length > 0
                    ? `${encontradas.length} ${encontradas.length === 1 ? "notícia encontrada" : "notícias encontradas"} para "${busca}"`
                    : `nenhuma notícia encontrada para "${busca}"`}
                  <Link to="/News" className="underline underline-offset-4 hover:text-white">
                    ver todas
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* uma fileira para cada esporte */}
        {fileiras.map((fileira) => {
          const lista = encontradas.filter((n) => n.esporte === fileira.esporte);
          if (lista.length === 0) return null;
          return <Fileira key={fileira.id} fileira={fileira} lista={lista} agora={agora} />;
        })}
      </div>

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button espacoFinal={false} />
    </>
  );
}

export default News;
