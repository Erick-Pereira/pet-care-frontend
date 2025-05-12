import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent {
adicionarPerfil() {
throw new Error('Method not implemented.');
}

  perfis = [
    {
      nome: 'Perfil 1',
      imagem: 'imagem1.png',
      nomeUsuario: 'usuario1',
      email: 'usuario1@example.com',
      telefone: '123456789',
      celular: '987654321',
      cpf: '123.456.789-00',
      cep: '12345-678',
      endereco: 'Rua Exemplo',
      numero: '123',
      complemento: 'Apto 1',
      bairro: 'Bairro Exemplo',
      cidade: 'Cidade Exemplo',
      uf: 'EX',
      imagemPerfilUrl: 'imagem1-perfil.png',
      pets: []
    },
    {
      nome: 'Perfil 2',
      imagem: 'imagem2.png',
      nomeUsuario: 'usuario2',
      email: 'usuario2@example.com',
      telefone: '123456789',
      celular: '987654321',
      cpf: '987.654.321-00',
      cep: '87654-321',
      endereco: 'Avenida Exemplo',
      numero: '456',
      complemento: 'Casa',
      bairro: 'Outro Bairro',
      cidade: 'Outra Cidade',
      uf: 'OT',
      imagemPerfilUrl: 'imagem2-perfil.png',
      pets: []
  },
  // Adicione mais perfis conforme necessário
  {
    nome: 'Perfil 3',
    imagem: 'imagem3.png',
    nomeUsuario: 'usuario3',
    email: 'usuario3@example.com',
    telefone: '123456789',
    celular: '987654321',
    cpf: '123.456.789-00',
    cep: '12345-678',
    endereco: 'Rua Exemplo',
    numero: '123',
    complemento: 'Apto 1',
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    uf: 'EX',
    imagemPerfilUrl: 'imagem3-perfil.png',
    pets: []
  },
  {
    nome: 'Perfil 4',
    imagem: 'imagem4.png',
    nomeUsuario: 'usuario4',
    email: 'usuario4@example.com',
    telefone: '123456789',
    celular: '987654321',
    cpf: '987.654.321-00',
    cep: '87654-321',
    endereco: 'Avenida Exemplo',
    numero: '456',
    complemento: 'Casa',
    bairro: 'Outro Bairro',
    cidade: 'Outra Cidade',
    uf: 'OT',
    imagemPerfilUrl: 'imagem4-perfil.png',
    pets: []
  }
  ];
}
