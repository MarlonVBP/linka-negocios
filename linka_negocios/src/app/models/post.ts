export interface Post {
  id?: number;
  titulo: string;
  conteudo: string;
  descricao:string;
  url_imagem: string | null;
  criado_em: string;
  usuario_nome: string;
  categoria_nome: string;
  views?: string;
  comentarios?: string;
  data?: string;
  imgUrl?: string;
  categoria_id?: number;
}
