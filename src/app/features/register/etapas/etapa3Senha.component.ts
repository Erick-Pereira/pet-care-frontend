import { Component, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-etapa3-senha',
  templateUrl: './etapa3Senha.component.html',
})
export class SenhaComponent {
  @Input() formGroup!: FormGroup;
  @Output() proximo = new EventEmitter<void>();
  @Output() anterior = new EventEmitter<void>();

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group(
      {
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  /** Alterna visibilidade do campo "senha" */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /** Alterna visibilidade do campo "confirmarSenha" */
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  /** Validação cruzada de senha e confirmação */
  private passwordsMatchValidator(
    group: AbstractControl,
  ): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;

    // Verificando se ambos os campos são preenchidos e se são diferentes
    if (senha && confirmar && senha !== confirmar) {
      return { mustMatch: true };
    }

    return null; // Caso contrário, nenhuma validação de erro
  }

  voltar(): void {
    this.anterior.emit();
  }

  onSubmit(): void {
    const senha = this.formGroup.get('senha')?.value;
    const confirmar = this.formGroup.get('confirmarSenha')?.value;

    if (senha && confirmar && senha === confirmar) {
      console.log('Payload sendo enviado:', senha);
      this.proximo.emit();
    } else {
      console.warn('Senhas não coincidem ou estão vazias');
      this.formGroup.get('senha')?.markAsTouched();
      this.formGroup.get('confirmarSenha')?.markAsTouched();
    }
  }

  /** Verifica se o campo de senha possui erro de validação */
  get senhaInvalid(): boolean {
    return (
      (this.formGroup.get('senha')?.invalid &&
        this.formGroup.get('senha')?.touched) ??
      false
    );
  }

  /** Verifica se o campo de confirmação de senha possui erro de validação */
  get confirmarSenhaInvalid(): boolean {
    return (
      (this.formGroup.get('confirmarSenha')?.invalid &&
        this.formGroup.get('confirmarSenha')?.touched) ??
      false
    );
  }

  /** Verifica se as senhas não coincidem */
  get senhasNaoCoincidem(): boolean {
    return (
      this.formGroup.hasError('mustMatch') &&
      (this.formGroup.get('confirmarSenha')?.touched ?? false)
    );
  }
}
