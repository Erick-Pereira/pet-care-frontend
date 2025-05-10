import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-perfil-create',
  templateUrl: './perfil-create.component.html',
  styleUrls: ['./perfil-create.component.scss']
})
export class PerfilCreateComponent {
  @Output() criar = new EventEmitter<void>();
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
  adicionar() {
    this.criar.emit();
  }
  
}