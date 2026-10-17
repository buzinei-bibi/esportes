import Button from "../../components/Button/Button";
import HeroEsportes from "../../components/Home/HeroEsportes";

function Home() {
  return (
    <>
      {/* BANNER em tela cheia: uma modalidade por vez */}
      <HeroEsportes />

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button espacoFinal={false} />
    </>
  );
}

export default Home;
