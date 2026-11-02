import Button from "../../components/Button/Button";
import HeroEsportes from "../../components/Home/HeroEsportes";
import SobreSite from "../../components/Home/SobreSite";

function Home() {
  return (
    <>
      {/* BANNER em tela cheia: uma modalidade por vez */}
      <HeroEsportes />

      {/* logo abaixo: o que é o portal e como usar */}
      <SobreSite />

      {/* BOTÃO DE ACESSIBILIDADE */}
      <Button espacoFinal={false} />
    </>
  );
}

export default Home;
