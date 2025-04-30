import { Component, Input } from '@angular/core';
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

  
  @Input() voltar!: () => void;
  @Input() concluir!: () => void;

  confirmarRegistro(): void {
    const dadosCompletos = {
      ...this.dadosPessoaisForm.value,
      ...this.dadosPetForm.value,
      senha: this.senhaForm.value.senha,
    };
    console.log('📦 Dados enviados:', dadosCompletos);
  }
}
