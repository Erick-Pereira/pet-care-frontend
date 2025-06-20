import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GeneroPet } from '@app/core/enum/genero-pet.enum';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
})
export class ConfirmacaoComponent implements OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() formFields: any[] = [];
  @Input() dadosPessoaisFields: any[] = [];
  @Input() dadosPetFields: any[] = [];
  @Input() speciesOptions: { value: string | number; label: string }[] = [];
  @Input() breedOptions: { value: string | number; label: string }[] = [];
  @Output() anterior = new EventEmitter<void>();
  @Output() concluir = new EventEmitter<void>();

  dadosPessoaisForm!: FormGroup;
  dadosPetForm!: FormGroup;
  senhaForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup'] && this.formGroup) {
      this.dadosPessoaisForm = this.formGroup.get('dadosPessoais') as FormGroup;
      this.dadosPetForm = this.formGroup.get('dadosPet') as FormGroup;
      this.senhaForm = this.formGroup.get('senha') as FormGroup;
    }
    // Atualiza speciesOptions e breedOptions se vierem como input
    if (changes['speciesOptions'] && changes['speciesOptions'].currentValue) {
      this.speciesOptions = changes['speciesOptions'].currentValue;
    }
    if (changes['breedOptions'] && changes['breedOptions'].currentValue) {
      this.breedOptions = changes['breedOptions'].currentValue;
    }
  }

  voltar(): void {
    this.anterior.emit();
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

  getGeneroLabel(value: number | string): string {
    if (value === GeneroPet.Macho || value === 0 || value === '0')
      return 'Macho';
    if (value === GeneroPet.Femea || value === 1 || value === '1')
      return 'Fêmea';
    return '';
  }

  getEspecieNome(): string {
    const especieId = this.dadosPetForm?.get('especie')?.value;
    const found = this.speciesOptions.find(
      (opt: any) => opt.value === especieId,
    );
    return found
      ? found.label
      : typeof especieId === 'object' && especieId?.name
      ? especieId.name
      : '';
  }

  getRacaNome(): string {
    const racaId = this.dadosPetForm?.get('raca')?.value;
    const found = this.breedOptions.find((opt: any) => opt.value === racaId);
    return found
      ? found.label
      : typeof racaId === 'object' && racaId?.name
      ? racaId.name
      : '';
  }
}
