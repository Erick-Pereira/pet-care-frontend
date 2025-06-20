import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilService } from '@app/core/entities/profile/profile.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  label = '';
  usuario = '';

  formFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Digite seu e-mail',
      errorMessage: '',
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      required: true,
      placeholder: 'Digite sua senha',
      errorMessage: '',
    },
  ];

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      this.formFields.reduce((acc, field) => {
        acc[field.name] = [
          '',
          [
            field.required ? Validators.required : null,
            field.type === 'email' ? Validators.email : null,
            field.name === 'password' ? Validators.minLength(6) : null,
          ].filter(Boolean),
        ];
        return acc;
      }, {} as any),
    );

    this.loginForm.valueChanges.subscribe(() => {
      this.updateFieldErrors();
    });
  }

  updateFieldErrors() {
    this.formFields.forEach((field) => {
      const control = this.loginForm.get(field.name);
      field.errorMessage = '';
      if (control && control.touched && control.invalid) {
        if (control.hasError('required')) {
          field.errorMessage = `${field.label} é obrigatório.`;
        } else if (field.name === 'email' && control.hasError('email')) {
          field.errorMessage = 'E-mail inválido.';
        } else if (field.name === 'password' && control.hasError('minlength')) {
          field.errorMessage = 'Senha deve ter pelo menos 6 caracteres.';
        }
      }
    });
  }

  public onLogin(): void {
    this.formFields.forEach((field) => {
      const control = this.loginForm.get(field.name);
      control?.markAsTouched();
    });
    this.updateFieldErrors();
    if (this.loginForm.invalid) {
      this.errorMessage = '❌ Preencha todos os campos corretamente.';
      return;
    }

    const formValues = this.loginForm.value;

    this.perfilService
      .logar(formValues.email, formValues.password)
      .subscribe((response) => {
        if (response && response.token) {
          this.setCookie('auth_token', response.token, 7); // 7 dias de validade
          this.router.navigate(['/pet-profile/1']);
        } else {
          this.errorMessage = '❌ Resposta inválida da API.';
        }
      });
  }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    this.document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`;
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? match[2] : null;
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  irParaRegistro(): void {
    this.router.navigate(['/register']);
  }

  public login(): void {
    const formValues = this.loginForm.getRawValue();
    console.log(formValues);
  }
}
