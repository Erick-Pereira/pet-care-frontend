import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-dados-pet',
  templateUrl: './dados-pet.component.html',
  styleUrls: ['./dados-pet.component.scss']
})
export class DadosPetComponent implements OnInit {
  formGroup!: FormGroup;
  progress = 0;
  currentStep = 2;

  @Output() proximaEtapa = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.setupValueChanges();
  }

  createForm() {
    this.formGroup = this.fb.group({
      nomePet: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', [Validators.required, this.idadeValidator]],
      porte: ['', Validators.required],
      peso: ['', [Validators.required, this.pesoValidator]],
      cor: ['', Validators.required]
    });
  }

  setupValueChanges() {
    this.formGroup.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  private idadeValidator(control: AbstractControl): ValidationErrors | null {
    const idade = Number(control.value);
    return isNaN(idade) || idade < 0 || idade > 100 ? { invalidIdade: true } : null;
  }

  private pesoValidator(control: AbstractControl): ValidationErrors | null {
    const peso = Number(control.value);
    return isNaN(peso) || peso <= 0 || peso > 200 ? { invalidPeso: true } : null;
  }

  private updateProgress(): void {
    const total = Object.keys(this.formGroup.controls).length;
    const filled = Object.values(this.formGroup.controls).filter(c => c.value && c.valid).length;
    this.progress = Math.floor((filled / total) * 100);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Dados do pet válidos:', this.formGroup.value);
      this.proximaEtapa.emit();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  get nomePet() { return this.formGroup.get('nomePet'); }
  get especie() { return this.formGroup.get('especie'); }
  get raca() { return this.formGroup.get('raca'); }
  get idade() { return this.formGroup.get('idade'); }
  get porte() { return this.formGroup.get('porte'); }
  get cor() { return this.formGroup.get('cor'); }
}
