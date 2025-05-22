import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProcedimento } from '@app/core/enum/tipo-procedimento.enum';

@Component({
  selector: 'app-vet-history',
  templateUrl: './vet-history.component.html',
  styleUrls: ['./vet-history.component.scss']
  }
)
export class VetHistoryComponent implements OnInit {
  formGroup: FormGroup;
  tipoOptions = Object.values(TipoProcedimento);

    constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
    historico: this.fb.array([])
  });
}
  
  ngOnInit(): void {
    this.addEntry();
    }

    get historico(): FormArray {
      return this.formGroup.get('historico') as FormArray;
    }

  newEntry(): FormGroup {
    return this.fb.group({
      tipo: ['', Validators.required],
      data: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      profissional: ['', Validators.maxLength(100)],
      contatoProfissional: ['', Validators.maxLength(100)], 
      observacoes: ['', Validators.maxLength(500)],
    });
  }

  addEntry(): void {
    this.historico.push(this.newEntry());
    }

  removeEntry(index: number): void {
    this.historico.removeAt(index);
    }

  salvar(): void {
    if (this.formGroup.valid) {
      console.log('Histórico salvo:', this.formGroup.value);

    } else {
      this.formGroup.markAllAsTouched();
      }
    }
  }
