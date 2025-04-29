// src/app/shared/components/models/register-data.model.ts

export interface PersonalData {
  nome: string;
  email: string;
}

export interface PetData {
  nome: string;
  especie: string;
  genero: string;
  nascimento: string; // ou Date, se você estiver usando objetos Date
  cor: string;
}

export interface PasswordData {
  password: string;
  confirmPassword: string;
}
export interface PersonalData {
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  celular: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  uf: string;
  cidade: string;
}
