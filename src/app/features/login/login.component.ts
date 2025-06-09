import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha email e senha.';
      return;
    }

    const loginData = {
      username: this.email,
      password: this.password
    };

    this.http.post<any>('https://localhost:7295/api/Auth/login', loginData)
      .subscribe({
        next: (response) => {
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 1);

          this.cookieService.set('auth_token', response.token, expiryDate);

          console.log('✅ Login realizado com sucesso!');
          this.router.navigate(['/perfillist']);
        },
        error: (error) => {
          console.error('Erro ao fazer login', error);
          this.errorMessage = '❌ Credenciais inválidas ou erro no servidor.';
        }
      });
  }

  irParaRegistro() {
    this.router.navigate(['/register']);
  }
}

