import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss']
})
export class SenhaComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  senhaForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.senhaForm = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  /** Alterna visibilidade do campo "senha" */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /** Alterna visibilidade do campo "confirmarSenha" */
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  /** Validação cross-field: senha e confirmação devem ser iguais */
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha && confirmar && senha !== confirmar
      ? { mustMatch: true }
      : null;
  }

  /** Navega para a etapa anterior */
  voltar(): void {
    this.prev.emit();
  }

  /** Quando o formulário for válido, avança para a próxima etapa */
  onSubmit(): void {
    if (this.senhaForm.valid) {
      console.log('Senha salva:', this.senhaForm.value);
      this.next.emit();
    } else {
      this.senhaForm.markAllAsTouched();
    }
  }
}
