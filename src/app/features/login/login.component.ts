import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilService } from '@app/core/entities/profile/profile.service';

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

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.getFormGroup();
  }

  getFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = '❌ Preencha todos os campos corretamente.';
      return;
    }

    const formValues = this.loginForm.value;

    // Agora que o método logar retorna um Observable, podemos usar subscribe
    this.perfilService.logar(formValues.email, formValues.password).subscribe(
      (response) => {
        console.log('Login realizado com sucesso:', response);
        this.router.navigate(['/pet-profile/1']);
      },
      (error) => {
        this.errorMessage =
          '❌ Ocorreu um erro ao tentar fazer o login. Tente novamente!';
        console.error('Erro de login:', error);
      },
    );
  }

  irParaRegistro(): void {
    this.router.navigate(['/register']);
  }

  public login(): void {
    const formValues = this.loginForm.getRawValue();
    console.log(formValues);
  }
}
