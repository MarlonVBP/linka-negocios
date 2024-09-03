export interface Comentario {
 id: number;
 pagina_id?: number;  // ID da página, se aplicável
 postagem_id?: number;  // ID da postagem, se aplicável
 produto_id?: number;  // ID do produto, se aplicável
 user_name: string;
 profissao: string;
 email: string;
 conteudo: string;
 avaliacao: number;
 viewed: boolean;  // Novo campo para indicar se o comentário foi visualizado
}
