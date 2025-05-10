import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss']
})
export class SenhaComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() submitSenha = new EventEmitter<string>();

  senhaForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.senhaForm = this.fb.group(
      {
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  get senha(): AbstractControl | null {
    return this.senhaForm.get('senha');
  }

  get confirmarSenha(): AbstractControl | null {
    return this.senhaForm.get('confirmarSenha');
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha && confirmar && senha !== confirmar ? { mustMatch: true } : null;
  }

  voltar(): void {
    this.prev.emit();
  }

  onSubmit(): void {
    if (this.senhaForm.valid) {
      this.submitSenha.emit(this.senha?.value);
      this.next.emit();
    } else {
      this.senhaForm.markAllAsTouched();
    }
  }
}
