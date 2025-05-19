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
        nome: [''],
        email: [''],
        cpf: [''],
        telefone: [''],
        cep: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        uf: [''],
        cidade: [''],
        logradouro: ['']
      }),
      dadosPet: this.fb.group({
        nomePet: [''],
        especie: [''],
        raca: [''],
        sexo: [''],
        dataNascimento: [''],
        peso: [''],
        cor: [''],
        aquisicao: [''],
        castrado: [false],
        chipado: [false],
        numeroChip: ['']
      }),
      senha: this.fb.group({
        senha: [''],
        confirmarSenha: ['']
      })
    });
  }

  ngOnInit(): void { }

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

      const payload = {
        id: this.generateUUID(),
        active: true,
        updatedAt: new Date().toISOString(),
        fullName: dados.nome,
        email: dados.email,
        phoneNumber: dados.telefone || '',
        password: dados.senha,
        cpf: dados.cpf || '',
        permissionLevel: 'User',
        addressId: this.generateUUID(),
        address: {
          id: this.generateUUID(),
          active: true,
          updatedAt: new Date().toISOString(),
          street: dados.rua || '',
          complement: dados.complemento || '',
          number: dados.numero || '',
          zipCode: dados.cep || '',
          neighborhoodId: this.generateUUID(),
          neighborhood: {
            id: this.generateUUID(),
            active: true,
            updatedAt: new Date().toISOString(),
            name: dados.bairro || '',
            city: {
              id: this.generateUUID(),
              active: true,
              updatedAt: new Date().toISOString(),
              name: dados.cidade || '',
              stateId: this.generateUUID(),
              state: {
                id: this.generateUUID(),
                active: true,
                updatedAt: new Date().toISOString(),
                name: dados.estado || '',
                abreviation: dados.uf || ''
              }
            },
            cityId: this.generateUUID()
          }
        },
        pet: {
          id: this.generateUUID(),
          name: dados.nomePet,
          specieId: dados.especie,
          breedId: dados.raca,
          sex: dados.sexo,
          birthDate: dados.dataNascimento,
          weight: dados.peso,
          color: dados.cor,
          acquisitionType: dados.aquisicao,
          castrated: dados.castrado,
          chipped: dados.chipado,
          chipNumber: dados.numeroChip
        }
      };


      this.http.post('https://localhost:7295/api/Auth/register', payload).subscribe({
        next: () => {
          alert('✅ Registro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao registrar:', err);
          alert('❌ Erro ao registrar. Verifique os dados e tente novamente.');
        }
      });

    } else {
      console.warn('⚠️ Formulário inválido. Verifique os campos obrigatórios.');
      this.registerForm.markAllAsTouched(); // Marca todos os campos como tocados
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
