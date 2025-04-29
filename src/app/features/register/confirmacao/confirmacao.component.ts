import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
})
export class ConfirmacaoComponent {
  @Input() dadosPessoaisForm!: FormGroup;
  @Input() dadosPetForm!: FormGroup;
  @Input() senhaForm!: FormGroup;

  confirmarRegistro(): void {
    const dadosCompletos = {
      ...this.dadosPessoaisForm.value,
      ...this.dadosPetForm.value,
      senha: this.senhaForm.value.senha,
    };
    console.log('📦 Dados enviados:', dadosCompletos);
    // Aqui você pode enviar os dados para o backend via service
  }
}
