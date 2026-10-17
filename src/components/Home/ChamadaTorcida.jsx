import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ESPORTES, srcSetDaFoto } from "../../data/jogos";

// faixa final: convida a pessoa a apoiar as equipes (como o "all custom" da referência)
function ChamadaTorcida() {
  const foto = ESPORTES[0].foto; // handebol: foto com o time em quadra

  return (
    <section aria-labelledby="torcida-titulo" className="mt-14 sm:mt-20 text-white uppercase">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black ring-1 ring-white/10 min-h-[22rem] sm:min-h-[26rem] flex items-end sm:items-center">
        <img
          src={`${foto}-1200.webp`}
          srcSet={srcSetDaFoto(foto)}
          sizes="100vw"
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[60%_center] grayscale contrast-125 opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t sm:bg-linear-to-r from-black via-black/80 to-black/10" />

        <div className="relative p-6 sm:p-12 lg:p-16 max-w-xl">
          <p className="text-[0.625rem] sm:text-xs font-semibold tracking-[0.22em] text-slate-400">
            ARQUIBANCADA CHEIA, TIME MAIS FORTE
          </p>
          <h2 id="torcida-titulo" className="mt-2 text-3xl sm:text-5xl font-black leading-[1.02] tracking-tight text-blue-400">
            VENHA TORCER
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
            O ESPORTE DA CIDADE CRESCE COM QUEM ACOMPANHA. VEJA A AGENDA, CHAME OS AMIGOS E APOIE AS EQUIPES DE TAUBATÉ NO GINÁSIO.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col items-start gap-4">
            <a
              href="#proximos-jogos"
              className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs sm:text-sm font-black transition-colors"
            >
              VER A AGENDA
            </a>
            <Link to="/Contato" className="group inline-flex items-center gap-2.5 text-[0.6875rem] sm:text-xs font-black">
              QUER APOIAR OU PATROCINAR? FALE COM A GENTE
              <span className="grid place-items-center size-6 rounded-full bg-white text-slate-950 transition-transform group-hover:translate-x-1">
                <ArrowRight size={13} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChamadaTorcida;
