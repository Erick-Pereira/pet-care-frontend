import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  etapaAtual = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {
    this.registerForm = this.fb.group({
      dadosPessoais: this.fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        telefone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(\(\d{2}\)\s?\d{4,5}-\d{4})$/), // (00) 0000-0000 ou (00) 00000-0000
          ],
        ],
        cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: [{ value: '', disabled: true }, Validators.required],
        uf: [{ value: '', disabled: true }, Validators.required],
        cidade: [{ value: '', disabled: true }, Validators.required],
        logradouro: [{ value: '', disabled: true }, Validators.required],
      }),
      dadosPet: this.fb.group({
        nomePet: ['', Validators.required],
        especie: ['', Validators.required],
        raca: ['', Validators.required],
        sexo: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        cor: ['', Validators.required],
        aquisicao: ['', Validators.required],
        castrado: [false, Validators.required],
        chipado: [false, Validators.required],
        numeroChip: [''],
      }),
      senha: this.fb.group({
        senha: ['', Validators.required],
        confirmarSenha: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    console.log('RegisterComponent initialized');
  }

  irParaProximaEtapa(): void {
    this.etapaAtual++;
  }

  voltarEtapa(): void {
    this.etapaAtual--;
  }

  get dadosPetForm(): FormGroup {
    return this.registerForm.get('dadosPet') as FormGroup;
  }

  get dadosPessoaisForm(): FormGroup {
    return this.registerForm.get('dadosPessoais') as FormGroup;
  }

  get senhaForm(): FormGroup {
    return this.registerForm.get('senha') as FormGroup;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const dados = this.registerForm.value;

      const payloadSimplificado = {
        name: dados.dadosPet.nomePet,
        specieId: dados.dadosPet.especie,
        breedId: dados.dadosPet.raca,
        gender: Number(dados.dadosPet.sexo),
        approximateBirthDate: dados.dadosPet.dataNascimento,
        color: dados.dadosPet.cor,
        acquisition: dados.dadosPet.aquisicao,
        isCastrated: Boolean(dados.dadosPet.castrado),
        isChipped: Boolean(dados.dadosPet.chipado),
        chipNumber: dados.dadosPet.numeroChip || '',
        owner: {
          fullName: dados.dadosPessoais.nome,
          email: dados.dadosPessoais.email,
          phoneNumber: dados.dadosPessoais.telefone,
          cpf: dados.dadosPessoais.cpf,
          password: dados.senha.senha,
          address: {
            street: dados.dadosPessoais.logradouro,
            complement: dados.dadosPessoais.complemento || '', // Envie uma string vazia se o campo estiver vazio
            number: dados.dadosPessoais.numero,
            zipCode: dados.dadosPessoais.cep,
            neighborhood: {
              name: dados.dadosPessoais.bairro,
              city: {
                name: dados.dadosPessoais.cidade,
                state: {
                  abreviation: dados.dadosPessoais.uf,
                },
              },
            },
          },
        },
      };

      console.log('Payload sendo enviado:', payloadSimplificado);

      this.http
        .post('https://localhost:7295/api/Pet/register', payloadSimplificado)
        .subscribe({
          next: (response) => {
            console.log('Registro realizado com sucesso:', response);
            alert('✅ Registro realizado com sucesso!');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Erro ao registrar:', err);
            alert('❌ Erro ao registrar. Tente novamente mais tarde.');
          },
        });
    } else {
      console.warn('⚠️ Formulário inválido. Verifique os campos obrigatórios.');
      this.registerForm.markAllAsTouched();
    }
  }
}
