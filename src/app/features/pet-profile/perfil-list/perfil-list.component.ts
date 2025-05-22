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

  adicionar(): void {
    const novoId = (this.perfis.length + 1).toString();
    const novoPerfil: Perfil = {
      id: novoId,
      nome: `Perfil ${novoId}`,
      imagemUrl: './assets/pet profile pic.png'
    };

    this.perfis.push(novoPerfil);
    this.criar.emit();
  }

  onSelecionar(id: string): void {
    const perfil = this.perfis.find(p => p.id === id);
    if (perfil) {
      this.perfilSelecionado = { ...perfil };
      this.selecionar.emit(perfil.id);
    }
  }

  openModal(id: string): void {
    const modal = this.perfis.find(p => p.id === id);
    if (modal) {
      this.modalSelecionado = { ...modal };
    }
  }

  fecharModal(): void {
    this.modalSelecionado = null;
  }

  salvarPerfil(): void {
    if (!this.modalSelecionado) return;

    const index = this.perfis.findIndex(p => p.id === this.modalSelecionado!.id);
    if (index !== -1) {
      this.perfis[index] = { ...this.modalSelecionado };
      this.selecionar.emit(this.modalSelecionado.id); // se quiser emitir ao salvar
    }

    this.fecharModal();
  }
}
