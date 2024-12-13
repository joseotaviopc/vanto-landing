export interface Titulo {
    id_titulo: number;
    vencimento: string;
    pagamento: null;
    id_usuario: number;
    id_automovel: number;
    cpf_cnpj: string;
    valor: number;
    valor_pago: number;
    parcela: string;
    forma_pagamento: string;
    id_contrato: number;
    codigo_boleto: string;
    link_boleto: string;
    codigo_pix: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }
  
  export interface ErrorResponse {
    error: string;
    message: string;
  }
  
  export interface MySQLError extends Error {
    code: string;
    errno: number;
    sqlMessage: string;
    sqlState: string;
    sql: string;
  }
  
  export interface Usuario {
    id_usuario: number;
    nome: string;
    cpf_cnpj: string;
    data_nascimento: string;
    ativo: number;
  }
  
  export interface Automovel {
    id_automovel: number;
    placa: string;
    placa_mercosul: string;
    marca: string;
    modelo: string;
    id_usuario: number;
  }
  
  export interface AutomovelModalidade {
    id_automovel: number;
    placa: string;
    placa_mercosul: string;
    marca: string;
    modelo: string;
    modalidade_contrato: string;
    id_usuario: number;
    id_contrato: number;
  }

  export interface Loginresponse { 
    accessToken: string, 
    user: { 
      id: number,
      name: string 
    } 
  }