import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Perfil } from '@app/core/entities/perfil.model';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent {
  @Input() dadosPetId: string | null = null;
  @Output() selecionar = new EventEmitter<string | null>();
  @Output() criar = new EventEmitter<void>();

  perfilSelecionado: Perfil | null = null;
  modalSelecionado: Perfil | null = null;

  perfis: Perfil[] = [];
  estaCriandoNovo = false;

  abrirModalNovoPerfil(): void {
    this.modalSelecionado = {
      id: '',
      name: '',
      imagemUrl: './assets/pet profile pic.png',
      acquisition: '',
      approximateBirthDate: '',
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
      sexo: undefined,
      especie: undefined,
      tipo: undefined,
      nome: ''
    };

    this.estaCriandoNovo = true;
  }

  adicionar(): void {
    this.abrirModalNovoPerfil(); // <- apenas abre o modal, não cria ainda
  }

  salvarPerfil(): void {
    if (!this.modalSelecionado) return;

    if (this.estaCriandoNovo) {
      // Gerar novo ID e salvar como novo
      const novoId = (this.perfis.length + 1).toString();
      this.modalSelecionado.id = novoId;
      this.modalSelecionado.name = this.modalSelecionado.name || `Perfil ${novoId}`;
      this.perfis.push({ ...this.modalSelecionado });
      this.criar.emit();
    } else {
      // Edição de perfil existente
      const index = this.perfis.findIndex(p => p.id === this.modalSelecionado!.id);
      if (index !== -1) {
        this.perfis[index] = { ...this.modalSelecionado };
        this.selecionar.emit(this.modalSelecionado.id);
      }
    }

    this.fecharModal();
  }

  openModal(id: string): void {
    const modal = this.perfis.find(p => p.id === id);
    if (modal) {
      this.modalSelecionado = { ...modal };
      this.estaCriandoNovo = false;
    }
  }

  fecharModal(): void {
    this.modalSelecionado = null;
    this.estaCriandoNovo = false;
  }

  onSelecionar(id: string): void {
    const perfil = this.perfis.find(p => p.id === id);
    if (perfil) {
      this.perfilSelecionado = { ...perfil };
      this.selecionar.emit(perfil.id);
    }
  }
}
