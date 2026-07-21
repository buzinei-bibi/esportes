import Button from "../../components/Button/Button";

function Contato() {
  return (
    <>
    <main className="max-w-7xl mx-auto px-4 pb-20 text-white uppercase">
      {/* banner */}

      <section className="relative mt-10 min-h-100 rounded-[35px] overflow-hidden border border-blue-400/30 shadow-2xl shadow-blue-950/60 bg-slate-950">
        {/* <img
          src="/imagens/banner-contato.png"
          alt="banner contato esportivo"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        /> */}

        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-blue-950/90 to-transparent"></div>
        <div className="relative z-10 h-full min-h-150 flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <p className="text-blue-300 text-sm tracking-[0.4em] font-bold mb-4">
            central de contato
          </p>

          <h1 className="text-4xl md:text-7xl font-black leading-none">
            fale com nossa equipe
          </h1>

          <p className="text-gray-200 text-lg mt-6 leading-relaxed">
            dúvidas, sugestões, parcerias, campeonatos ou notícias esportivas?
            entre em contato de forma rápida, simples e acessível.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#formulario"
              className="px-8 py-4 rounded-xl bg-blue-700 hover:bg-blue-500 transition duration-300 font-bold shadow-lg shadow-blue-900/50"
            >
              enviar mensagem
            </a>

            <a
              href="#mapa"
              className="px-8 py-4 rounded-xl bg-white text-blue-950 hover:bg-blue-100 transition duration-300 font-bold"
            >
              ver localização
            </a>
          </div>
        </div>
      </section>

      {/* cards */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <div className="group bg-blue-950 border border-blue-800/20 rounded-[25px] p-7 hover:bg-blue-950 hover:border-blue-300 transition duration-300 shadow-xl">
          <i className="bi bi-telephone-fill text-5xl text-blue-300"></i>
          <h2 className="text-xl font-black mt-5">telefone</h2>
          <p className="mt-2">+55 (12) 99124-9368</p>
        </div>

        <div className="group bg-blue-950 border border-blue-400/20 rounded-[25px] p-7 hover:bg-blue-950 hover:border-blue-300 transition duration-300 shadow-xl">
          <i className="bi bi-envelope-at-fill text-5xl text-blue-300"></i>
          <h2 className="text-xl font-black mt-5">e-mail</h2>
          <p className="mt-2"> conectandoesportes@gmail.com</p>
        </div>

        <div className="group bg-blue-950 border border-blue-400/20 rounded-[25px] p-7 hover:bg-blue-950 hover:border-blue-300 transition duration-300 shadow-xl">
          <i className="bi bi-geo-alt-fill text-5xl text-blue-300"></i>
          <h2 className="text-xl font-black mt-5">endereço</h2>
          <p className="mt-2"> tv. amadeu ribeiro da costa,
            <br /> 272 - areão, 
            <br /> tremembé - SP, 12125-442
          </p>
        </div>
      </section>

      {/* formulário */}

      <section
        id="formulario"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12"
      >
        <aside className="lg:col-span-4 bg-blue-950 border border-blue-950 hover:border-blue-300 rounded-[30px] p-8 shadow-2xl">
          <p className="text-blue-300 tracking-[0.3em] text-sm font-bold mb-4">
            atendimento
          </p>

          <h2 className="text-3xl font-black mb-5">como podemos ajudar?</h2>
          <p className="text-white leading-relaxed mb-8">
            escolha o assunto e envie sua mensagem, nosso time responderá o mais
            rápido possível.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-blue-400/20">
              <i className="bi bi-newspaper text-blue-300 mr-2"></i>
              notícias esportivas
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-blue-400/20">
              <i className="bi bi-calendar-event text-blue-300 mr-2"></i>
              campeonatos e eventos
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-blue-400/20">
              <i className="bi bi-megaphone-fill text-blue-300 mr-2"></i>
              parcerias e divulgações
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8 bg-blue-950 border border-blue-950 hover:border-blue-300 rounded-[30px] p-8 md:p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            mande sua mensagem
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <input
              type="text"
              placeholder="SEU NOME"
              className="bg-slate-950/80 border border-blue-500/30 text-white placeholder-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              placeholder="SEU E-MAIL"
              className="bg-slate-950/80 border border-blue-500/30 text-white placeholder-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            <select className="md:col-span-2 bg-slate-950/80 border border-blue-500/30 text-white uppercase rounded-2xl px-5 py-4">
              <option>selecione o assunto</option>
              <option>notícias esportivas</option>
              <option>campeonatos</option>
              <option>parcerias</option>
              <option>outros assuntos</option>
            </select>

            <textarea
              rows="7"
              placeholder="ESCREVA SUA MENSAGEM"
              className="md:col-span-2 bg-slate-950/80 border border-blue-500/30 text-white placeholder-gray-300 rounded-2xl px-5 py-4 resize-none"
            ></textarea>

            <button
              type="submit"
              className="md:col-span-2 w-full md:w-fit px-9 py-4 rounded-xl bg-blue-700 hover:bg-blue-500 duration-300 font-black"
            >
              ENVIAR MENSAGEM
              <i className="bi bi-send-fill ml-2"></i>
            </button>
          </form>
        </section>
      </section>

      {/* google maps */}

      <section
        id="mapa"
        className="w-full rounded-[30px] p-6 mt-12 bg-blue-950 hover:border-blue-300 border border-blue-400/20 shadow-2xl"
      >
        <div className="mb-5">
          <p className="text-blue-300 text-sm tracking-[0.3em] font-bold">
            google maps
          </p>

          <h2 className="text-3xl font-black mt-2"></h2>
        </div>

        <div className="w-full h-550px rounded-[25px] overflow-hidden border-2 border-blue-400/30">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.857132836787!2d-45.5597409!3d-22.992280500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ccf90e2c49e509%3A0xeb2fa9c1ad7668bb!2sSmash%20Club%20-%20T%C3%AAnis%20de%20Mesa%20Taubat%C3%A9!5e0!3m2!1spt-BR!2sbr!4v1783079779265!5m2!1spt-BR!2sbr"
            className="w-full h-100"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="google maps"
          />
        </div>
      </section>
    </main>

    {/* BOTÃO DE ACESSIBILIDADE */}
    <Button />
    </>
  );
}

export default Contato;
