import { Component, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
})
export class SenhaComponent {
  @Input() formGroup!: FormGroup;
  @Input() formFields: any[] = [];
  @Output() proximo = new EventEmitter<void>();
  @Output() anterior = new EventEmitter<void>();

  hidePassword = true;
  hideConfirmPassword = true;
  senhaDiferenteMsg = '';

  constructor(private fb: FormBuilder) {
    // Não inicializa formGroup aqui, pois ele é passado pelo pai
  }

  /** Alterna visibilidade do campo "senha" */
  togglePasswordVisibility(fieldName: string): void {
    if (fieldName === 'senha') {
      this.hidePassword = !this.hidePassword;
    } else if (fieldName === 'confirmarSenha') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
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
      this.senhaDiferenteMsg = '';
      this.proximo.emit();
    } else {
      this.senhaDiferenteMsg = 'As senhas não coincidem.';
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

  // Mapeia o tipo do input dinamicamente para mostrar/ocultar senha
  getInputType(field: any): string {
    if (field.type === 'password') {
      if (field.name === 'senha') {
        return this.hidePassword ? 'password' : 'text';
      }
      if (field.name === 'confirmarSenha') {
        return this.hideConfirmPassword ? 'password' : 'text';
      }
    }
    return field.type;
  }

  // Retorna o ícone correto para o botão de mostrar/ocultar senha
  getEyeIcon(fieldName: string): string {
    if (fieldName === 'senha') {
      return this.hidePassword ? 'fa-eye' : 'fa-eye-slash';
    }
    if (fieldName === 'confirmarSenha') {
      return this.hideConfirmPassword ? 'fa-eye' : 'fa-eye-slash';
    }
    return 'fa-eye';
  }
}
