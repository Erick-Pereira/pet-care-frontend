import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent {
  @Input() dadosPessoaisForm!: FormGroup;
  @Input() dadosPetForm!: FormGroup;
  @Input() senhaForm!: FormGroup;

  @Output() concluir: EventEmitter<void> = new EventEmitter<void>();
  @Output() voltarEtapa: EventEmitter<void> = new EventEmitter<void>();

  onSubmit(): void {
    if (
      this.dadosPessoaisForm.valid &&
      this.dadosPetForm.valid &&
      this.senhaForm.valid
    ) {
      console.log('Todos os dados:', {
        dadosPessoais: this.dadosPessoaisForm.value,
        dadosPet: this.dadosPetForm.value,
        senha: this.senhaForm.value
      });
      this.concluir.emit();
    } else {
      this.dadosPessoaisForm.markAllAsTouched();
      this.dadosPetForm.markAllAsTouched();
      this.senhaForm.markAllAsTouched();
    }
  }

  voltar(): void {
    this.voltarEtapa.emit();
  }
}
