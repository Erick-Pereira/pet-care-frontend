import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loginForm!: FormGroup;
  label = '';

  constructor(private router: Router) { }

  onLogin() {
    const dadosSalvos = localStorage.getItem('registroUsuario');

    if (!dadosSalvos) {
      this.errorMessage = '❌ Nenhum usuário registrado.';
      return;
    }

    const usuario = JSON.parse(dadosSalvos);

    if (usuario.usuario.email === this.email && usuario.senha === this.password) {
      console.log('✅ Login realizado com sucesso!');
      // Armazena "token" no localStorage
      localStorage.setItem('usuarioLogado', JSON.stringify({
        email: usuario.usuario.email,
        nome: usuario.usuario.nome,
        token: 'fake-token-' + Date.now()
      }));
      this.router.navigate(['/perfillist']);
    }

  }

  irParaRegistro() {
    this.router.navigate(['/register']);
  }
}
