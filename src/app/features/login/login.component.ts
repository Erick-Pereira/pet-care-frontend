import { Component } from '@angular/core';
import { AuthService } from '../../features/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'Usuário ou senha inválidos.';
      }
    });
  }

  irParaRegistro() {
    this.router.navigate(['/register']);
  }
}
