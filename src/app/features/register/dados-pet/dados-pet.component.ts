import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dados-pet',
  templateUrl: './dados-pet.component.html',
  styleUrls: ['./dados-pet.component.scss']
})
export class DadosPetComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomePet: ['', Validators.required],
      tipo: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(0)]],
      cor: [''],
      peso: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Dados do Pet:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
