// busca do site: transforma o que a pessoa digitou (ou falou) numa página
import { ESPORTES } from "./jogos";

// tira acentos e deixa minúsculo: "Vôlei" → "volei"
export function normalizar(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// palavras que levam direto para uma página
const ATALHOS = [
  { rota: "/Handebol", palavras: ["handebol", "handball", "hand"] },
  { rota: "/Volleyball", palavras: ["volei", "voleibol", "volley", "volleyball"] },
  { rota: "/Tabletennis", palavras: ["tenis de mesa", "tenis", "ping pong", "pingue pongue", "pingpong", "mesa"] },
  { rota: "/Contato", palavras: ["contato", "contatos", "telefone", "email", "e-mail", "endereco", "fale", "falar", "mapa"] },
  { rota: "/News", palavras: ["noticia", "noticias", "news", "novidade", "novidades"] },
  { rota: "/", palavras: ["home", "inicio", "pagina inicial"] },
];

// devolve a rota da página que melhor responde à busca
export function destinoDaBusca(texto) {
  const termo = normalizar(texto);
  if (!termo) return null;

  // 1) nome de esporte ou de página
  for (const atalho of ATALHOS) {
    if (atalho.palavras.some((p) => termo === p || termo.includes(p))) return atalho.rota;
  }

  // 2) times, competições e locais que aparecem nos dados de cada esporte
  for (const esporte of ESPORTES) {
    const dados = normalizar(JSON.stringify(esporte.dados.DADOS));
    if (termo.length >= 3 && dados.includes(termo)) return esporte.rota;
  }

  // 3) se nada bater, procura nas notícias
  return `/News?busca=${encodeURIComponent(texto.trim())}`;
}
