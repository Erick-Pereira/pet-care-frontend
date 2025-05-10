import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  currentStep() {
    throw new Error('Method not implemented.');
  }
  nextStep() {
    throw new Error('Method not implemented.');
  }
  @Output() proximaEtapa = new EventEmitter<void>();
  dadosPessoais!: FormGroup;
  progress = 0;

  constructor(private router: Router, private fb: FormBuilder) {}
    ngOnInit(): void {
      this.dadosPessoais = this.fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, this.cpfValidator]],
        telefone: [''],
        celular: ['', Validators.required],
        cep: [''],
        endereco: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        uf: [''],
        cidade: ['']
      });

    this.dadosPessoais.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  irParaDadosPet(): void {
    this.router.navigate(['/DadosPet']);
  }

  get nome() { return this.dadosPessoais.get('nome'); }
  get email() { return this.dadosPessoais.get('email'); }
  get cpf() { return this.dadosPessoais.get('cpf'); }
  get telefone() { return this.dadosPessoais.get('telefone'); }
  get celular() { return this.dadosPessoais.get('celular'); }
  get cep() { return this.dadosPessoais.get('cep'); }
  get endereco() { return this.dadosPessoais.get('endereco'); }
  get numero() { return this.dadosPessoais.get('numero'); }
  get complemento() { return this.dadosPessoais.get('complemento'); }
  get bairro() { return this.dadosPessoais.get('bairro'); }
  get uf() { return this.dadosPessoais.get('uf'); }
  get cidade() { return this.dadosPessoais.get('cidade'); }

  onSubmit(): void {
    if (this.dadosPessoais.valid) {
      this.proximaEtapa.emit();
    } else {
      this.dadosPessoais.markAllAsTouched();
    }
  }

  private updateProgress(): void {
    const totalFields = Object.keys(this.dadosPessoais.controls).length;
    const filledFields = Object.values(this.dadosPessoais.controls).filter(control => control.value).length;
    this.progress = (filledFields / totalFields) * 100;
  }

  private cpfValidator(control: AbstractControl) {
    const cpf = control.value?.replace(/[^\d]+/g, '');
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return { invalidCPF: true };

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return { invalidCPF: true };

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return { invalidCPF: true };

    return null;
  }
}
