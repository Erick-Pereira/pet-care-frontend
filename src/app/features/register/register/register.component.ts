import { Component } from '@angular/core';
import { RegisterData } from './register-data.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  etapaAtual = 1;

  formData: RegisterData = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    uf: '',
    cidade: '',

    nomePet: '',
    especie: '',
    raca: '',
    idade: 0,

    senha: '',
    confirmarSenha: ''
  };

  irParaProximaEtapa(): void {
    if (this.etapaAtual < 4) {
      this.etapaAtual++;
    }
  }

  voltarEtapa(): void {
    if (this.etapaAtual > 1) {
      this.etapaAtual--;
    }
  }

  concluirCadastro(): void {
    console.log('Dados do formulário:', this.formData);
    alert('Cadastro concluído!');
  }
}
