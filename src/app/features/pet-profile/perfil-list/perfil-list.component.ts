import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '@app/core/entities/profile/profile.model';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
})
export class PerfilListComponent implements OnInit {
  @Output() criar = new EventEmitter<void>();
  @Output() selecionar = new EventEmitter<string>();

  estaCriandoNovo = false;
  modalSelecionado: Perfil | null = null;
  perfilSelecionado: Perfil | null = null;
  profiles: Perfil[] = [];
  hoverMap: Record<string, boolean> = {};
  speciesOptions: any[] = [];
  breedOptions: any[] = [];
  profileForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.profileForm = this.getFormGroup();
    this.carregarPerfis();
    this.buscarEspecies();
  }

  getFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      specieId: ['', [Validators.required]],
      breedId: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      approximateBirthDate: ['', [Validators.required]],
      color: ['', [Validators.required]],
      acquisition: ['', [Validators.required]],
      isCastrated: [false],
      isChipped: [false],
      chipNumber: [''],
    });
  }

  carregarPerfis(): void {
    const userId = this.obterIdUsuarioDoCookie();
    console.log('ID do usuário:', userId);

    this.http.get<any>('https://localhost:7296/api/Pet').subscribe(
      (response) => {
        if (response.success) {
          this.profiles = response.data.filter((pet: any) => pet.ownerId === userId);
          console.log('Perfis carregados:', this.profiles);
        } else {
          console.error('Erro ao carregar os perfis:', response.message);
        }
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
    );
  }

  obterIdUsuarioDoCookie(): string {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('auth_token='));
    if (!tokenCookie) {
      console.error('Token não encontrado nos cookies.');
      return '';
    }

    const token = tokenCookie.split('=')[1];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload decodificado:', payload);

      if (!payload.nameid) {
        console.error('Token inválido: nameid não encontrado no payload.');
        return '';
      }

      return payload.nameid; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return '';
    }
  }

  buscarEspecies(): void {
    this.http.get<any>('https://localhost:7296/api/Specie').subscribe({
      next: (response) => {
        this.speciesOptions = response.data.map((specie: any) => ({
          value: specie.id,
          label: specie.name,
        }));
      },
      error: (err) => console.error('Erro ao buscar espécies:', err),
    });
  }

  onSpecieChange(event: any): void {
    const specieId = event.target.value;
    this.http.get<any>(`https://localhost:7296/api/Breed?specieId=${specieId}`).subscribe({
      next: (response) => {
        this.breedOptions = response.data.map((breed: any) => ({
          value: breed.id,
          label: breed.name,
        }));
      },
      error: (err) => console.error('Erro ao buscar raças:', err),
    });
  }

  salvarPerfil(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const perfilData = this.profileForm.value;

    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('auth_token='));
    if (!tokenCookie) {
      console.error('Token não encontrado nos cookies.');
      return;
    }
    const token = tokenCookie.split('=')[1];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload decodificado:', payload);

      perfilData.tokenPayload = payload;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    this.http.post('https://localhost:7296/api/Pet/registerPet', perfilData, { headers }).subscribe({
      next: () => {
        alert('Perfil criado com sucesso!');
        this.fecharModal();
        this.carregarPerfis();
      },
      error: (err) => {
        console.error('Erro ao salvar perfil:', err);
        console.log('Dados enviados:', perfilData);
      },
    });
  }

  fecharModal(): void {
    this.modalSelecionado = null;
    this.estaCriandoNovo = false;
  }

  adicionar(): void {
    if (this.profiles.length >= 5) {
      alert('Você atingiu o limite de 5 perfis.');
      return;
    }
    this.abrirModalNovoPerfil();
  }

  abrirModalNovoPerfil(): void {
    this.modalSelecionado = this.criarPerfilVazio();
    this.estaCriandoNovo = true;
  }

  onSelecionar(id: string): void {
    const profile = this.profiles.find((p) => p.id === id);
    if (!profile) return;

    this.perfilSelecionado = { ...profile };
    this.selecionar.emit(profile.id);
    this.router.navigate(['/pet-profile', id]);
  }

  onChipChange(): void {
    const isChipped = this.profileForm.get('isChipped')?.value;
    if (!isChipped) {
      this.profileForm.get('chipNumber')?.reset();
    }
  }

  private criarPerfilVazio(): Perfil {
    const dataAtual = new Date();
    return {
      acquisition: dataAtual,
      age: 0,
      approximateBirthDate: dataAtual,
      color: '',
      gender: '',
      id: '',
      isCastrated: false,
      isChipped: false,
      chipNumber: '',
      sex: '',
      name: '',
      owner: '',
      race: '',
      specie: '',
      type: '',
    };
  }
}
