import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() label = 'Entrar';
  @Input() label2 = 'Esqueci minha senha';
  @Input() label3 = 'Não tem uma conta?';
  @Input() rota = '/dashboard'; 

  loginForm!: FormGroup;
  public registrar = 'Registrar';

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  navegar(): void {
    this.router.navigate([this.rota]);
  }

  irParaDadosPessoais(): void {
    this.router.navigate(['/DadosPessoais']);
  }
}
