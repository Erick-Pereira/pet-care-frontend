import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-etapa4-confirm',
  templateUrl: './etapa4Confirm.component.html'
})
export class Etapa4ConfirmComponent implements OnChanges {
  @Input() formGroup!: FormGroup;
  @Output() voltarEtapa = new EventEmitter<void>();
  @Output() concluir = new EventEmitter<void>();

  dadosPessoaisForm!: FormGroup;
  dadosPetForm!: FormGroup;
  senhaForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup'] && this.formGroup) {
      this.dadosPessoaisForm = this.formGroup.get('dadosPessoais') as FormGroup;
      this.dadosPetForm = this.formGroup.get('dadosPet') as FormGroup;
      this.senhaForm = this.formGroup.get('senha') as FormGroup;

      console.log('Dados pessoais:', this.dadosPessoaisForm.value);
      console.log('Dados do pet:', this.dadosPetForm.value);
      console.log('Senha:', this.senhaForm.value);
    }
  }

  onSubmit(): void {
    if (
      this.dadosPessoaisForm.valid &&
      this.dadosPetForm.valid &&
      this.senhaForm.valid
    ) {
      this.concluir.emit();
    } else {
      this.dadosPessoaisForm.markAllAsTouched();
      this.dadosPetForm.markAllAsTouched();
      this.senhaForm.markAllAsTouched();
    }
  }
}
