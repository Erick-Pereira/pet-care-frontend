import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '@app/core/entities/register/register.service';
import { RegisterPayloadDTO } from '@app/core/entities/register/register-payload.dto';
import { GeneroPet } from '@app/core/enum/genero-pet.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  etapaAtual = 1;

  dadosPessoaisFields = [
    {
      name: 'nome',
      label: 'Nome',
      type: 'text',
      required: true,
      placeholder: 'Ex: João da Silva',
    },
    {
      name: 'cpf',
      label: 'CPF',
      type: 'text',
      required: true,
      placeholder: 'Ex: 000.000.000-00',
      mask: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      maskErrorKey: 'cpfInvalido',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Ex: exemplo@email.com',
    },
    {
      name: 'telefone',
      label: 'N° do Celular',
      type: 'text',
      required: true,
      placeholder: 'Ex: (11) 91234-5678',
      mask: /^\(\d{2}\) \d{4,5}-\d{4}$/,
      maskErrorKey: 'telefoneInvalido',
    },
    {
      name: 'cep',
      label: 'CEP',
      type: 'text',
      required: true,
      placeholder: 'Ex: 01001-000',
      mask: /^\d{5}-\d{3}$/,
      maskErrorKey: 'cepInvalido',
    },
    {
      name: 'logradouro',
      label: 'Rua',
      type: 'text',
      required: true,
      placeholder: '',
      disabled: true,
    },
    {
      name: 'numero',
      label: 'Número',
      type: 'text',
      required: true,
      placeholder: 'Ex: 123',
    },
    {
      name: 'complemento',
      label: 'Complemento',
      type: 'text',
      required: false,
      placeholder: 'Ex: Casa, Ap',
    },
    {
      name: 'bairro',
      label: 'Bairro',
      type: 'text',
      required: true,
      placeholder: '',
      disabled: true,
    },
    {
      name: 'uf',
      label: 'UF',
      type: 'text',
      required: true,
      placeholder: '',
      disabled: true,
    },
    {
      name: 'cidade',
      label: 'Cidade',
      type: 'text',
      required: true,
      placeholder: '',
      disabled: true,
    },
  ];

  dadosPetFields = [
    {
      name: 'nomePet',
      label: 'Nome do Pet',
      type: 'text',
      required: true,
      placeholder: 'Ex: Rex',
    },
    {
      name: 'especie',
      label: 'Espécie',
      type: 'select',
      required: true,
      placeholder: 'Selecione a espécie',
    },
    {
      name: 'raca',
      label: 'Raça',
      type: 'select',
      required: true,
      placeholder: 'Selecione a raça',
    },
    {
      name: 'sexo',
      label: 'Sexo',
      type: 'select',
      required: true,
      placeholder: 'Selecione o sexo',
      options: [
        { value: 'Macho', label: 'Macho' },
        { value: 'Fêmea', label: 'Fêmea' },
      ],
    },
    {
      name: 'dataNascimento',
      label: 'Data de Nascimento',
      type: 'date',
      required: true,
      placeholder: '',
    },
    {
      name: 'cor',
      label: 'Cor',
      type: 'text',
      required: true,
      placeholder: 'Ex: Preto',
    },
    {
      name: 'aquisicao',
      label: 'Aquisição',
      type: 'text',
      required: false,
      placeholder: 'Ex: Adoção',
    },
    { name: 'castrado', label: 'Castrado', type: 'checkbox', required: false },
    { name: 'chipado', label: 'Chipado', type: 'checkbox', required: false },
    {
      name: 'numeroChip',
      label: 'Número do Chip',
      type: 'text',
      required: false,
      placeholder: 'Ex: 123456',
    },
  ];

  senhaFields = [
    {
      name: 'senha',
      label: 'Senha',
      type: 'password',
      required: true,
      placeholder: 'Digite sua senha',
    },
    {
      name: 'confirmarSenha',
      label: 'Confirmar Senha',
      type: 'password',
      required: true,
      placeholder: 'Confirme sua senha',
    },
  ];

  speciesOptions: any[] = [];
  breedOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
  ) {
    this.registerForm = this.fb.group({
      dadosPessoais: this.buildFormGroup(this.dadosPessoaisFields),
      dadosPet: this.fb.group({
        nomePet: ['', Validators.required],
        especie: ['', Validators.required],
        raca: ['', Validators.required],
        sexo: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        cor: ['', Validators.required],
        aquisicao: [''],
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

  buildFormGroup(fields: any[]): FormGroup {
    const group: any = {};
    fields.forEach((field) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.mask) validators.push(Validators.pattern(field.mask));
      group[field.name] = [
        { value: '', disabled: !!field.disabled },
        validators,
      ];
    });
    return this.fb.group(group);
  }

  // Atualiza speciesOptions e breedOptions ao avançar para a etapa de confirmação
  irParaProximaEtapa(): void {
    if (this.etapaAtual === 2) {
      // Busca as opções atuais dos componentes filhos
      const dadosPetComponent =
        (window as any).ng &&
        (window as any).ng.getComponent(
          document.querySelector('app-dados-pet'),
        );
      if (dadosPetComponent) {
        this.speciesOptions = dadosPetComponent.getSpeciesOptions();
        this.breedOptions = dadosPetComponent.getBreedOptions();
      }
    }
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

  getSpeciesOptions() {
    const especieField = this.dadosPetFields.find((f) => f.name === 'especie');
    return especieField && Array.isArray(especieField.options)
      ? especieField.options
      : [];
  }

  getBreedOptions() {
    const racaField = this.dadosPetFields.find((f) => f.name === 'raca');
    return racaField && Array.isArray(racaField.options)
      ? racaField.options
      : [];
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const dados = this.registerForm.value;
      const payload: RegisterPayloadDTO = {
        name: dados.dadosPet.nomePet,
        specieId: dados.dadosPet.especie,
        breedId: dados.dadosPet.raca,
        gender:
          dados.dadosPet.sexo === 'Macho' ? GeneroPet.Macho : GeneroPet.Femea,
        approximateBirthDate: dados.dadosPet.dataNascimento,
        color: dados.dadosPet.cor,
        acquisition: dados.dadosPet.aquisicao,
        isCastrated: dados.dadosPet.castrado,
        isChipped: dados.dadosPet.chipado,
        chipNumber: dados.dadosPet.numeroChip,
        owner: {
          fullName: dados.dadosPessoais.nome,
          email: dados.dadosPessoais.email,
          phoneNumber: dados.dadosPessoais.telefone,
          password: dados.senha.senha,
          cpf: dados.dadosPessoais.cpf,
          address: {
            street: dados.dadosPessoais.logradouro,
            complement: dados.dadosPessoais.complemento,
            number: dados.dadosPessoais.numero,
            zipCode: dados.dadosPessoais.cep,
            neighborhood: {
              name: dados.dadosPessoais.bairro,
              city: {
                name: dados.dadosPessoais.cidade,
                state: {
                  abbreviation: dados.dadosPessoais.uf,
                },
              },
            },
          },
        },
      };
      this.registerService.register(payload).subscribe({
        next: () => {
          alert('✅ Registro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          alert(
            '❌ Erro ao registrar: ' +
              (err?.error?.message || 'Erro desconhecido'),
          );
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
