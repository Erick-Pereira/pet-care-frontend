export interface DadosPessoais {
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface DadosPet {
  nomePet: string;
  tipoPet: string;
  idade: number;
  raca: string;
  porte: string;
}

export interface Senha {
  senha: string;
  confirmarSenha: string;
}

export interface RegisterModel {
  dadosPessoais: DadosPessoais;
  dadosPet: DadosPet;
  senha: Senha;
  FormGroup: string;
}
