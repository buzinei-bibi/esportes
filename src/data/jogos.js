// junta os próximos jogos dos três esportes num lugar só (usado na home)
import * as handebol from "./handebol";
import * as volei from "./volei";
import * as tenisDeMesa from "./tenisDeMesa";

// atleta: atleta em destaque no card da home.
//   nome   → nome do(a) atleta (vazio = mostra só a modalidade)
//   foto   → caminho da foto em /public (vazio = usa a foto da modalidade)
//   recortada → true se a foto for PNG com fundo transparente:
//               o(a) atleta "sai" do card, como na referência
// fotoBanner: foto real da equipe para o banner da home (vazio = só a bola animada).
//   Use apenas fotos com autorização de uso (clube, assessoria ou prefeitura).
export const ESPORTES = [
  {
    id: "handebol",
    nome: "HANDEBOL",
    rota: "/Handebol",
    foto: "/Imagens/banner/handebol",
    // onde está o atleta na foto (para o recorte vertical)
    foco: "object-[28%_center]",
    dados: handebol,
    fotoBanner: "",
    atleta: { nome: "", posicao: "", foto: "", recortada: false },
  },
  {
    id: "volei",
    nome: "VÔLEI",
    rota: "/Volleyball",
    foto: "/Imagens/banner/volei",
    foco: "object-[40%_center]",
    dados: volei,
    fotoBanner: "",
    atleta: { nome: "", posicao: "", foto: "", recortada: false },
  },
  {
    id: "tenis-de-mesa",
    nome: "TÊNIS DE MESA",
    rota: "/Tabletennis",
    foto: "/Imagens/banner/tenis-de-mesa",
    foco: "object-[22%_center]",
    dados: tenisDeMesa,
    fotoBanner: "",
    atleta: { nome: "", posicao: "", foto: "", recortada: false },
  },
];

const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

// "03/08/2026" + "20H00" → Date
function paraData(data, hora) {
  const [d, m, a] = data.split("/").map(Number);
  const [h, min] = (hora || "0h0").toLowerCase().split("h").map((n) => Number(n) || 0);
  return new Date(a, m - 1, d, h, min);
}

export function srcSetDaFoto(foto) {
  return `${foto}-640.webp 640w, ${foto}-1200.webp 1200w`;
}

export function linkDoMapa(local) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local)}`;
}

// todos os próximos jogos, do mais perto para o mais longe
export function listarProximosJogos() {
  const jogos = ESPORTES.flatMap((esporte) => {
    const { CATEGORIAS, TIME_CASA, DADOS } = esporte.dados;
    return CATEGORIAS.flatMap((categoria) =>
      (DADOS[categoria.id]?.proximosJogos ?? []).map((jogo) => {
        const quando = paraData(jogo.data, jogo.hora);
        return {
          ...jogo,
          chave: `${esporte.id}-${categoria.id}-${jogo.id}`,
          esporte,
          categoria: categoria.label.toUpperCase(),
          timeCasa: TIME_CASA.toUpperCase(),
          adversario: jogo.adversario.toUpperCase(),
          competicao: jogo.competicao.toUpperCase(),
          local: jogo.local.toUpperCase(),
          hora: jogo.hora.toUpperCase(),
          quando,
          dia: String(quando.getDate()).padStart(2, "0"),
          mes: MESES[quando.getMonth()],
          diaSemana: DIAS[quando.getDay()],
        };
      })
    );
  }).sort((a, b) => a.quando - b.quando);

  // mostra só o que ainda vai acontecer; se a agenda estiver desatualizada,
  // mostra os jogos cadastrados para a seção não ficar vazia
  const agora = new Date();
  const futuros = jogos.filter((j) => j.quando >= agora);
  return futuros.length > 0 ? futuros : jogos;
}
