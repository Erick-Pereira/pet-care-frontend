import { Component, Output, EventEmitter } from '@angular/core';
import { Perfil } from '@app/core/entities/perfil.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss'],
})
export class PerfilListComponent {
  constructor(private router: Router) {}

  @Output() selecionar = new EventEmitter<string>();
  @Output() criar = new EventEmitter<void>();

  perfilSelecionado: Perfil | null = null;
  modalSelecionado: Perfil | null = null;

  perfis: Perfil[] = [];

  estaCriandoNovo = false;

  abrirModalNovoPerfil(): void {
    this.modalSelecionado = {
      id: '',
      name: '',
      nome: '',
      imagemUrl: './assets/pet profile pic.png',
      acquisition: new Date(),
      approximateBirthDate: new Date(),
      gender: '',
      specie: '',
      observacoes: '',
      idade: 0,
      raca: '',
      owner: '',
      chipNumber: '',
      isChipped: false,
      isCastrated: false,
      color: '',
      breed: '',
      sexo: '',
      especie: '',
      tipo: '',
    };
    this.estaCriandoNovo = true;
  }

  adicionar(): void {
    this.abrirModalNovoPerfil();
  }

  salvarPerfil(): void {
    if (!this.modalSelecionado) return;

    this.modalSelecionado.name =
      this.modalSelecionado.name || this.modalSelecionado.nome || 'Perfil';

    if (this.estaCriandoNovo) {
      const novoId = (this.perfis.length + 1).toString();
      this.modalSelecionado.id = novoId;
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
    const perfil = this.perfis.find((p) => p.id === id);
    if (perfil) {
      this.perfilSelecionado = { ...perfil };
      this.selecionar.emit(perfil.id);
      this.router.navigate(['/pet-perfil', id]);
    }
  }

  atualizarStatusMicrochipado(): void {
    if (!this.modalSelecionado?.isChipped) {
      if (this.modalSelecionado) {
        this.modalSelecionado.chipNumber = '';
      }
    }
  }
}
