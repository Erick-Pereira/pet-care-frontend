import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, this.cpfValidator]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.pattern(/^(\(\d{2}\))? \d{4}-\d{4}$/)]],
      celular: ['', [Validators.required, Validators.pattern(/^(\(\d{2}\))? \d{9}$/)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      uf: ['', Validators.required],
      cidade: ['', Validators.required]
    });
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (control.value && !cpfPattern.test(control.value)) {
      return { 'cpfInvalid': true };
    }
    return null;
  }

  onCancel(): void {
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Dados:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
