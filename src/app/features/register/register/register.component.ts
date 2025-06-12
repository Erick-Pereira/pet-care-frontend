import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  FormGroup!: FormGroup;
  etapaAtual = 1;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.FormGroup = this.fb.group({
      dadosPessoais: this.fb.group({
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
        cidade: [''],
      }),
      dadosPet: this.fb.group({
        petNome: ['', Validators.required],
        petTipo: ['', Validators.required],
      }),
      senha: this.fb.group(
        {
          senha: ['', Validators.required],
          confirmarSenha: ['', Validators.required],
        },
        { validators: this.senhaMatchValidator },
      ),
    });
  }

  irParaProximaEtapa(): void {
    if (this.etapaAtual < 4) {
      this.etapaAtual++;
    }
  }

  voltarEtapa(): void {
    if (this.etapaAtual > 1) {
      this.etapaAtual--;
    }
  }

  onSubmit(): void {
    if (this.FormGroup.valid) {
      console.log('Formulário enviado com sucesso:', this.FormGroup.value);
      this.FormGroup.reset();
      this.etapaAtual = 1;
      this.router.navigate(['/login']);
    } else {
      console.log('Formulário inválido');
      this.FormGroup.markAllAsTouched();
    }
  }

  senhaMatchValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhaMismatch: true };
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value?.replace(/[^\d]+/g, '');
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
      return { invalidCPF: true };

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

  get dadosPessoais() {
    return this.FormGroup.get('dadosPessoais') as FormGroup;
  }
  get dadosPet() {
    return this.FormGroup.get('dadosPet') as FormGroup;
  }
  get senhaGroup() {
    return this.FormGroup.get('senha') as FormGroup;
  }
}
