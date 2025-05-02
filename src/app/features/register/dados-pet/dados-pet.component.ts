import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dados-pet',
  templateUrl: './dados-pet.component.html',
  styleUrls: ['./dados-pet.component.scss']
})
export class DadosPetComponent {
  @Input() form!: FormGroup;
  @Output() prev = new EventEmitter<void>();
  @Output() proximo = new EventEmitter<void>();
  etapaAtual = 2;

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Dados do Pet:', this.form.value);
      this.proximo.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  voltar(): void {
    this.prev.emit();
  }
}
