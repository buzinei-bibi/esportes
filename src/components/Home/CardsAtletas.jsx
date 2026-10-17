import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ESPORTES, srcSetDaFoto } from "../../data/jogos";

// forma inclinada do card; --s é o tamanho da inclinação
const RECORTE =
  "[clip-path:polygon(var(--s)_0,100%_0,calc(100%_-_var(--s))_100%,0_100%)]";

// cards inclinados com um(a) atleta de cada modalidade (estilo da referência)
function CardsAtletas() {
  return (
    <section id="equipes" aria-labelledby="equipes-titulo" className="mt-14 sm:mt-20 scroll-mt-28 text-white uppercase">
      <div className="max-w-xl">
        <p className="inline-flex items-center gap-2 text-[0.625rem] sm:text-xs font-semibold tracking-[0.22em] text-blue-300">
          <span aria-hidden="true" className="h-px w-6 bg-blue-400" />
          AS EQUIPES DE TAUBATÉ
        </p>
        <h2 id="equipes-titulo" className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
          ESCOLHA SEU ESPORTE
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          TOQUE NA MODALIDADE PARA VER JOGOS, RESULTADOS E CLASSIFICAÇÃO.
        </p>
      </div>

      <ul className="mt-8 sm:mt-10 grid gap-3 md:flex md:gap-0 md:items-start md:pb-14">
        {ESPORTES.map((esporte, i) => {
          const escuro = i % 2 === 0;
          const { atleta } = esporte;
          const foto = atleta.foto || null;

          return (
            <li
              key={esporte.id}
              className={`[--s:7%] md:[--s:22%] md:w-[38%] md:shrink-0 ${i > 0 ? "md:-ml-[7%]" : ""} ${
                escuro ? "md:translate-y-14" : ""
              }`}
            >
              <Link
                to={esporte.rota}
                aria-label={`${esporte.nome}${atleta.nome ? `, ${atleta.nome}` : ""}: ver jogos e resultados`}
                className="group relative block h-56 sm:h-72 md:h-[26rem] lg:h-[30rem] focus-visible:outline-none"
              >
                {/* forma inclinada com a foto */}
                <div
                  className={`absolute inset-0 overflow-hidden ${RECORTE} ${
                    escuro ? "bg-slate-950 ring-1 ring-white/10" : "bg-blue-600"
                  } group-focus-visible:brightness-125 transition`}
                >
                  {!atleta.recortada && (
                    <img
                      src={foto || `${esporte.foto}-640.webp`}
                      srcSet={foto ? undefined : srcSetDaFoto(esporte.foto)}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      alt=""
                      loading="lazy"
                      className={`absolute inset-0 size-full object-cover ${esporte.foco} grayscale contrast-125 transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 ${
                        escuro ? "opacity-75 group-hover:opacity-100" : "mix-blend-luminosity group-hover:mix-blend-normal"
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                </div>

                {/* foto recortada (PNG sem fundo): o(a) atleta sai do card */}
                {atleta.recortada && foto && (
                  <img
                    src={foto}
                    alt=""
                    loading="lazy"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[112%] w-auto max-w-none object-contain object-bottom grayscale group-hover:grayscale-0 transition duration-500 drop-shadow-2xl pointer-events-none"
                  />
                )}

                {/* nome */}
                <div className="absolute inset-x-0 bottom-0 pl-6 pr-[calc(var(--s)+1rem)] pb-5 sm:pb-6 md:pl-7 md:pb-8">
                  <span className="block text-[0.625rem] font-semibold tracking-[0.25em] text-white/60">
                    MODALIDADE 0{i + 1}
                  </span>
                  <span className="mt-1 block text-2xl sm:text-3xl lg:text-4xl font-black italic leading-[0.95] tracking-tight">
                    {esporte.nome}
                  </span>
                  {atleta.nome && (
                    <span className="mt-1.5 block text-[0.6875rem] sm:text-xs font-bold text-white/80">
                      {atleta.nome}
                      {atleta.posicao && <span className="text-white/50"> · {atleta.posicao}</span>}
                    </span>
                  )}
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.625rem] sm:text-xs font-black">
                    VER EQUIPE
                    <span className="grid place-items-center size-6 rounded-full bg-white text-slate-950 transition-transform group-hover:translate-x-1">
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CardsAtletas;
