import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent {
  nomeUsuario = 'Nome do Usuário';
  email = '';
  imagemPerfil: string | null = null;
  telefone = '';
  celular = '';
  cpf = '';
  cep = '';
  endereco = '';
  numero = '';
  complemento = '';
  bairro = '';
  cidade = '';
  uf = '';

  perfis = [
    { nome: 'Usuário 1', imagem: '' },
    { nome: 'Usuário 2', imagem: '' },
    { nome: 'Usuário 3', imagem: '' },
    { nome: 'Usuário 4', imagem: '' }
  ];
  adicionarPerfil() {
    console.log('Adicionar perfil clicado');
  }
}

