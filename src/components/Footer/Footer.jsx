import { Link } from "react-router-dom";

const REDES = [
  {
    nome: "Facebook",
    link: "https://www.facebook.com/groups/ttesp/",
    icone: "bi-facebook",
    cor: "bg-[#1877F2]",
  },
  {
    nome: "Instagram",
    link: "https://www.instagram.com/ec.taubate/",
    icone: "bi-instagram",
    cor: "bg-linear-to-tr from-[#FEE411] via-[#E1306C] to-[#833AB4]",
  },
  {
    nome: "YouTube",
    link: "https://www.youtube.com/hashtag/taubate",
    icone: "bi-youtube",
    cor: "bg-[#FF0000]",
  },
];

const LINKS = [
  { nome: "HOME", link: "/", icone: "bi-house-door-fill" },
  { nome: "CONTATO", link: "/Contato", icone: "bi-person-fill" },
  { nome: "NOTÍCIAS", link: "/News", icone: "bi-newspaper" },
];

// fontes do site (as mesmas do banner)
const TITULO = "font-['Barlow_Condensed',sans-serif] font-bold tracking-[0.08em]";
const TEXTO = "font-['Barlow',sans-serif]";

// celular: tudo empilhado e centralizado
// tablet: marca | newsletter, links embaixo
// desktop: logo | acompanhe   —   links no centro da página   —   newsletter
export default function Footer() {
  return (
    <footer id="contatos" className={`relative w-full bg-linear-to-r from-slate-950 via-blue-950 to-slate-900 uppercase text-white ${TEXTO}`}>
      {/* mesmo recuo lateral do header: o logo do rodapé fica na mesma linha do logo do topo */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-10 pt-7 pb-20 sm:pb-4">
        <div className="relative grid gap-7 md:grid-cols-2 md:gap-x-12 md:gap-y-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center xl:gap-x-16">
          {/* MARCA: logo separado do texto. No desktop largo o logo fica na borda (alinhado ao do header)
              e o texto se aproxima da navegação */}
          <div className="flex flex-col items-center text-center gap-5 md:flex-row md:items-center md:text-left md:gap-10 lg:gap-14 xl:justify-self-end">
            <Link
              to="/"
              aria-label="Taubaté Esportes: ir para a home"
              className="shrink-0 xl:absolute xl:left-0 xl:top-1/2 xl:-translate-y-1/2"
            >
              <img
                src="/Imagens/logotipo.png"
                alt="Taubaté Esportes"
                className="w-12 md:w-11 lg:w-12 h-auto object-contain"
              />
            </Link>

            <div>
              <p className={`${TITULO} text-base`}>
                ACOMPANHE O <span className="text-blue-400">TAUBATÉ ESPORTES</span>
              </p>
              <p className="mt-0.5 text-xs sm:text-sm leading-snug text-slate-400 max-w-xs">
                NOTÍCIAS, MODALIDADES, CAMPEONATOS E TUDO SOBRE O ESPORTE EM TAUBATÉ.
              </p>

              {/* REDES */}
              <div className="mt-2.5 flex justify-center md:justify-start gap-2">
                {REDES.map((rede) => (
                  <a
                    key={rede.nome}
                    href={rede.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${rede.nome} (abre em nova aba)`}
                    title={rede.nome}
                    className={`size-8 rounded-full ${rede.cor} hover:opacity-80 flex items-center justify-center transition`}
                  >
                    <i className={`bi ${rede.icone} text-sm`} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* NAVEGAÇÃO (no centro da página) */}
          <nav aria-label="Rodapé" className="md:col-span-2 md:order-last lg:col-span-1 lg:order-none lg:justify-self-center">
            <p className={`hidden lg:block mb-2 text-center text-xs text-slate-500 ${TITULO}`}>NAVEGAÇÃO</p>
            <ul className={`flex flex-wrap justify-center lg:flex-col lg:items-start gap-x-6 gap-y-2 text-[0.95rem] text-blue-300 ${TITULO}`}>
              {LINKS.map((item) => (
                <li key={item.nome}>
                  <Link to={item.link} className="flex items-center gap-2 hover:text-white transition">
                    <i className={`bi ${item.icone} w-4 text-center shrink-0`} aria-hidden="true"></i>
                    {item.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* NEWSLETTER */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:justify-self-end xl:justify-self-start lg:w-full lg:max-w-sm">
            <h2 className={`flex items-center gap-2 text-base ${TITULO}`}>
              <i className="bi bi-envelope-fill text-blue-400" aria-hidden="true"></i>
              NEWSLETTER
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm leading-snug text-slate-400">
              RECEBA NOTÍCIAS ESPORTIVAS DIRETAMENTE NO SEU E-MAIL.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-2.5 flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder="SEU E-MAIL"
                aria-label="Seu e-mail"
                className="flex-1 min-w-0 h-10 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-400 transition"
              />
              <button
                type="submit"
                className={`h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm transition whitespace-nowrap ${TITULO}`}
              >
                ENVIAR
              </button>
            </form>
          </div>
        </div>

        {/* BARRA FINAL */}
        <p className="mt-6 pt-3 border-t border-white/10 text-center text-[0.65rem] tracking-wider text-slate-500">
          © {new Date().getFullYear()} TAUBATÉ ESPORTES — TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}
