import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  etapaAtual = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      dadosPessoais: this.fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        telefone: ['', [Validators.required, Validators.pattern(/^(\d{10}|\d{11})$/)]],
        cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: [{ value: '', disabled: true }, Validators.required],
        uf: [{ value: '', disabled: true }, Validators.required],
        cidade: [{ value: '', disabled: true }, Validators.required],
        logradouro: [{ value: '', disabled: true }, Validators.required]
      }),
      dadosPet: this.fb.group({
        nomePet: ['', Validators.required],
        especie: ['', Validators.required],
        raca: ['', Validators.required],
        sexo: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        peso: ['', Validators.required],
        cor: ['', Validators.required],
        aquisicao: ['', Validators.required],
        castrado: [false, Validators.required],
        chipado: [false, Validators.required],
        numeroChip: ['']
      }),
      senha: this.fb.group({
        senha: ['', Validators.required],
        confirmarSenha: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    console.log('RegisterComponent initialized')
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
        usuario: {
          nome: dados.dadosPessoais.nome,
          email: dados.dadosPessoais.email,
          telefone: dados.dadosPessoais.telefone,
          cpf: dados.dadosPessoais.cpf,
          endereco: {
            cep: dados.dadosPessoais.cep,
            numero: dados.dadosPessoais.numero,
            complemento: dados.dadosPessoais.complemento,
            bairro: dados.dadosPessoais.bairro,
            cidade: dados.dadosPessoais.cidade,
            uf: dados.dadosPessoais.uf,
            logradouro: dados.dadosPessoais.logradouro
          }
        },
        pet: {
          nome: dados.dadosPet.nomePet,
          especie: dados.dadosPet.especie,
          raca: dados.dadosPet.raca,
          sexo: dados.dadosPet.sexo,
          dataNascimento: dados.dadosPet.dataNascimento,
          peso: dados.dadosPet.peso,
          cor: dados.dadosPet.cor,
          aquisicao: dados.dadosPet.aquisicao,
          castrado: dados.dadosPet.castrado,
          chipado: dados.dadosPet.chipado,
          numeroChip: dados.dadosPet.numeroChip
        },
        senha: dados.senha.senha
      };

      try {
        localStorage.setItem('registroUsuario', JSON.stringify(payloadSimplificado));
        alert('✅ Registro salvo localmente com sucesso!');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        alert('❌ Erro ao salvar localmente.');
      }

    } else {
      console.warn('⚠️ Formulário inválido. Verifique os campos obrigatórios.');
      this.registerForm.markAllAsTouched();
    }
  }

}
