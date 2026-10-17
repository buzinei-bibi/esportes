import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Navigation, Ticket, DoorOpen } from "lucide-react";
import { listarProximosJogos, srcSetDaFoto, linkDoMapa } from "../../data/jogos";

function SeloEntrada({ jogo }) {
  return jogo.entradaLivre ? (
    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/10 ring-1 ring-emerald-400/30 px-2 py-0.5 text-[0.625rem] font-black text-emerald-300">
      <DoorOpen size={12} aria-hidden="true" /> ENTRADA LIVRE
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-400/10 ring-1 ring-amber-400/30 px-2 py-0.5 text-[0.625rem] font-black text-amber-300">
      <Ticket size={12} aria-hidden="true" /> INGRESSO
    </span>
  );
}

// "TAUBATÉ x ADVERSÁRIO" na ordem certa de mandante/visitante
function confronto(jogo) {
  return jogo.mandante ? [jogo.timeCasa, jogo.adversario] : [jogo.adversario, jogo.timeCasa];
}

// bloco "próximo jogo": o jogo mais perto em destaque + os seguintes
function ProximosJogos() {
  const [destaque, ...seguintes] = listarProximosJogos();
  if (!destaque) return null;
  const [casa, fora] = confronto(destaque);

  return (
    <section
      id="proximos-jogos"
      aria-labelledby="proximos-jogos-titulo"
      className="mt-10 sm:mt-14 scroll-mt-28 text-white uppercase"
    >
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="text-[0.625rem] sm:text-xs font-semibold tracking-[0.25em] text-blue-300">
            AGENDA
          </p>
          <h2 id="proximos-jogos-titulo" className="mt-1 text-xl sm:text-3xl font-black tracking-tight">
            PRÓXIMOS JOGOS
          </h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        {/* jogo em destaque */}
        <article className="relative overflow-hidden rounded-2xl sm:rounded-3xl ring-1 ring-white/10 bg-slate-900">
          <img
            src={`${destaque.esporte.foto}-640.webp`}
            srcSet={srcSetDaFoto(destaque.esporte.foto)}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt=""
            className={`absolute inset-y-0 right-0 h-full w-full sm:w-3/5 object-cover ${destaque.esporte.foco} opacity-35 sm:opacity-60`}
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 sm:via-slate-900/80 to-slate-900/40" />

          <div className="relative p-5 sm:p-8 flex flex-col gap-5 sm:gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-[0.625rem] font-black tracking-wider">
                PRÓXIMO JOGO
              </span>
              <span className="text-[0.625rem] sm:text-xs font-bold tracking-wider text-slate-300">
                {destaque.esporte.nome} · {destaque.categoria}
              </span>
            </div>

            <div>
              <p className="text-[0.625rem] sm:text-xs font-bold tracking-widest text-blue-300">
                {destaque.competicao}
              </p>
              <p className="mt-2 text-lg sm:text-3xl font-black leading-tight">
                <span className={casa === destaque.timeCasa ? "text-white" : "text-slate-300"}>{casa}</span>
                <span className="block text-xs sm:text-sm font-bold text-blue-400 my-1">X</span>
                <span className={fora === destaque.timeCasa ? "text-white" : "text-slate-300"}>{fora}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* data em destaque */}
              <div className="flex items-center gap-3">
                <div className="grid place-items-center size-14 sm:size-16 rounded-2xl bg-white text-slate-950 leading-none">
                  <span className="text-xl sm:text-2xl font-black">{destaque.dia}</span>
                  <span className="-mt-2 text-[0.625rem] font-bold">{destaque.mes}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold leading-snug">
                  <p>{destaque.diaSemana}</p>
                  <p className="flex items-center gap-1 text-slate-300">
                    <Clock size={13} aria-hidden="true" /> {destaque.hora}
                  </p>
                </div>
              </div>
              <div className="min-w-0">
                <p className="flex items-start gap-1.5 text-xs sm:text-sm font-semibold text-slate-300">
                  <MapPin size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {destaque.local}
                </p>
                <div className="mt-2">
                  <SeloEntrada jogo={destaque} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={linkDoMapa(destaque.local)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 hover:bg-blue-100 px-4 py-2.5 text-xs font-black transition-colors"
              >
                <Navigation size={14} aria-hidden="true" />
                COMO CHEGAR
              </a>
              <Link
                to={destaque.esporte.rota}
                className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/25 hover:ring-white/60 hover:bg-white/5 px-4 py-2.5 text-xs font-black transition"
              >
                AGENDA DO {destaque.esporte.nome}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>

        {/* jogos seguintes */}
        <div className="rounded-2xl sm:rounded-3xl ring-1 ring-white/10 bg-white/[0.03] p-3 sm:p-4">
          <h3 className="px-2 pt-1 pb-3 text-[0.625rem] sm:text-xs font-semibold tracking-[0.2em] text-slate-400">
            DEPOIS VEM
          </h3>
          <ul className="space-y-1.5">
            {seguintes.slice(0, 4).map((jogo) => {
              const [a, b] = confronto(jogo);
              return (
                <li key={jogo.chave}>
                  <Link
                    to={jogo.esporte.rota}
                    className="group flex items-center gap-3 rounded-xl p-2 sm:p-2.5 hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="grid place-items-center size-12 shrink-0 rounded-xl bg-white/[0.06] ring-1 ring-white/10 leading-none">
                      <span className="text-base font-black">{jogo.dia}</span>
                      <span className="-mt-2.5 text-[0.5625rem] font-bold text-slate-400">{jogo.mes}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.5625rem] sm:text-[0.625rem] font-bold tracking-wider text-blue-300 truncate">
                        {jogo.esporte.nome} · {jogo.categoria}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-[0.8125rem] font-black truncate">
                        {a} <span className="text-blue-400">X</span> {b}
                      </p>
                      <p className="mt-0.5 text-[0.5625rem] sm:text-[0.625rem] font-semibold text-slate-400 truncate">
                        {jogo.diaSemana} · {jogo.hora} · {jogo.local}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProximosJogos;
