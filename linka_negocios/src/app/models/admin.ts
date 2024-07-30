export interface Admin {
    id?: number;
    nome_admin: string;
    email: string;
    senha: string;
    foto_perfil?: string;
    cargo?: string;
    criado_em?: Date;
    ultimo_login?: Date; 
  }
  