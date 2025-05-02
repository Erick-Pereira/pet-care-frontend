import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {
  form!: FormGroup;
  etapaAtual = 1;

  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      celular: ['', Validators.required],
      cep: [''],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      uf: ['', Validators.required],
      cidade: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Dados pessoais válidos:', this.form.value);
      this.etapaAtual = 2;
      this.next.emit();  
    } else {
      this.form.markAllAsTouched();
    }
  }
}
