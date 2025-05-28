import { Component, Output, EventEmitter } from '@angular/core';
import { Perfil } from '@app/core/entities/perfil.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
})
export class PerfilListComponent {
  @Output() selecionar = new EventEmitter<string>();
  @Output() criar = new EventEmitter<void>();

  perfis: Perfil[] = [];
  perfilSelecionado: Perfil | null = null;
  modalSelecionado: Perfil | null = null;
  estaCriandoNovo = false;

  constructor(private router: Router) {}

  private criarPerfilVazio(): Perfil {
    const dataAtual = new Date();
    return {
      id: '',
      name: '',
      nome: '',
      imagemUrl: './assets/pet profile pic.png',
      acquisition: dataAtual,
      approximateBirthDate: dataAtual,
      gender: '',
      especie: '',
      observacoes: '',
      idade: 0,
      raca: '',
      owner: '',
      chipNumber: '',
      isChipped: false,
      isCastrated: false,
      color: '',
      tipo: '',
      breed: '',
      specie: '',
      sexo: '',
    };
  }

  abrirModalNovoPerfil(): void {
    this.modalSelecionado = this.criarPerfilVazio();
    this.estaCriandoNovo = true;
  }

  adicionar(): void {
    this.abrirModalNovoPerfil();
  }

  atualizarStatusMicrochipado(): void {
    if (!this.modalSelecionado) return;

    if (!this.modalSelecionado.isChipped) {
      this.modalSelecionado.chipNumber = '';
    }
  }

  private garantirNomePerfil(perfil: Perfil): string {
    return (perfil.name?.trim() || perfil.nome?.trim() || 'Perfil').trim();
  }

  salvarPerfil(): void {
    if (!this.modalSelecionado) return;

    this.modalSelecionado.name = this.garantirNomePerfil(this.modalSelecionado);

    if (this.estaCriandoNovo) {
      this.modalSelecionado.id = (this.perfis.length + 1).toString();
      this.perfis.push({ ...this.modalSelecionado });
      this.criar.emit();
    } else {
      const index = this.perfis.findIndex(p => p.id === this.modalSelecionado!.id);
      if (index !== -1) {
        this.perfis[index] = { ...this.modalSelecionado };
        this.selecionar.emit(this.modalSelecionado.id);
      }
    }

    this.fecharModal();
  }

  openModal(id: string): void {
    this.router.navigate(['/pet-perfil', id]);
  }

  fecharModal(): void {
    this.modalSelecionado = null;
    this.estaCriandoNovo = false;
  }

  onSelecionar(id: string): void {
    const perfil = this.perfis.find(p => p.id === id);
    if (!perfil) return;

    this.perfilSelecionado = { ...perfil };
    this.selecionar.emit(perfil.id);
    this.router.navigate(['/pet-perfil', id]);
  }
}
