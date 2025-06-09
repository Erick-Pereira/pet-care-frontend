import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from '@app/core/entities/perfil/perfil.model';

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
  perfis: Perfil[] = [];
  hoverMap: Record<string, boolean> = {};
  PerfilForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder

  ) {}

  ngOnInit(): void {
    this.PerfilForm = this.getFormGroup();
    }

    getFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.email]],
      race: ['', [Validators.required, Validators.minLength(6)]],
      specie: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  // 🔹 Métodos de Evento
  onSelecionar(id: string): void {
    const perfil = this.perfis.find((p) => p.id === id);
    if (!perfil) return;

    this.perfilSelecionado = { ...perfil };
    this.selecionar.emit(perfil.id);
    this.router.navigate(['/pet-perfil', id]);
  }

  navegarParaPerfil(id: string): void {
    this.router.navigate(['/pet-perfil', id]);
  }

  // 🔹 Métodos de Modal
  adicionar(): void {
    if (this.perfis.length >= 5) {
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

    this.modalSelecionado.nome = this.modalSelecionado.nome.trim();

    if (this.estaCriandoNovo) {
      this.modalSelecionado.id = (this.perfis.length + 1).toString();
      this.perfis.push({ ...this.modalSelecionado });
      this.criar.emit();
    } else {
      const index = this.perfis.findIndex(
        (p) => p.id === this.modalSelecionado!.id,
      );
      if (index !== -1) {
        this.perfis[index] = { ...this.modalSelecionado };
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

    if (!this.modalSelecionado.estaChipado) {
      this.modalSelecionado.numeroChip = '';
    }
  }

  // 🔹 Métodos Utilitários
  private criarPerfilVazio(): Perfil {
    const dataAtual = new Date();
    return {
      cor: '',
      dataAquisicao: dataAtual,
      dataNascimentoAproximada: dataAtual,
      dono: '',
      especie: '',
      especieOriginal: '',
      estaCastrado: false,
      estaChipado: false,
      genero: '',
      id: '',
      idade: 0,
      nome: '',
      numeroChip: '',
      observacoes: '',
      raca: '',
      sexo: '',
      tipo: '',
      urlImagem: '',
    };
  }
}
