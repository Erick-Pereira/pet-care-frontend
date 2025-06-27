import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HTTP client
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
  profileForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient // Inject HTTP client
  ) {}

  ngOnInit(): void {
    this.profileForm = this.getFormGroup();
    this.carregarPerfis(); // Carrega os perfis ao iniciar o componente
  }

  getFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.email]],
      race: ['', [Validators.required, Validators.minLength(6)]],
      specie: ['', [Validators.required, Validators.minLength(6)]],
      breed: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required, Validators.minLength(6)]],
      approximateBirthDate: ['', [Validators.required]],
      color: ['', [Validators.required, Validators.minLength(6)]],
      acquisition: ['', [Validators.required, Validators.minLength(6)]],
      isCastraded: [false, [Validators.required]],
      isChipped: [false, [Validators.required]],
      chipNumber: ['', [Validators.required, Validators.minLength(6)]],
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

      return payload.nameid; // Retorna o ID do usuário
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return '';
    }
  }

  // 🔹 Métodos de Evento
  onSelecionar(id: string): void {
    const profile = this.profiles.find((p) => p.id === id);
    if (!profile) return;

    this.perfilSelecionado = { ...profile };
    this.selecionar.emit(profile.id);
    this.router.navigate(['/pet-profile', id]);
  }

  navegarParaPerfil(id: string): void {
    this.router.navigate(['/pet-profile', id]);
  }

  // 🔹 Métodos de Modal
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

  fecharModal(): void {
    this.modalSelecionado = null;
    this.estaCriandoNovo = false;
  }

  salvarPerfil(): void {
    if (!this.modalSelecionado) return;

    this.modalSelecionado.name = this.modalSelecionado.name.trim();

    if (this.estaCriandoNovo) {
      this.modalSelecionado.id = (this.profiles.length + 1).toString();
      this.profiles.push({ ...this.modalSelecionado });
      this.criar.emit();
    } else {
      const index = this.profiles.findIndex(
        (p) => p.id === this.modalSelecionado!.id,
      );
      if (index !== -1) {
        this.profiles[index] = { ...this.modalSelecionado };
        this.selecionar.emit(this.modalSelecionado.id);
      }
    }

    this.fecharModal();
  }

  // 🔹 Métodos de Atualização
  atualizarStatusCastrado(): void {
    throw new Error('Method not implemented.');
  }

  atualizarStatusMicrochipado(): void {
    if (!this.modalSelecionado) return;

    if (!this.modalSelecionado.isChipped) {
      this.modalSelecionado.chipNumber = '';
    }
  }

  // 🔹 Métodos Utilitários
  private criarPerfilVazio(): Perfil {
    const dataAtual = new Date();
    return {
      acquisition: dataAtual,
      age: 0,
      approximateBirthDate: dataAtual,
      chipNumber: '',
      color: '',
      gender: '',
      id: '',
      imageUrl: '',
      isCastrated: false,
      isChipped: false,
      name: '',
      owner: '',
      race: '',
      sex: '',
      specie: '',
      type: '',
    };
  }
}
