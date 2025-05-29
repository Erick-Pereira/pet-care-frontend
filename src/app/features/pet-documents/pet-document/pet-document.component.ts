import { Component } from '@angular/core';

interface BootstrapModal {
  hide(): void;
}

interface BootstrapStatic {
  Modal: {
    getInstance(element: Element): BootstrapModal | null;
    new (element: Element): BootstrapModal;
  };
}

declare const bootstrap: BootstrapStatic;

interface Documento {
  titulo: string;
  descricao?: string | null;
  nomeArquivo: string;
  dataInicio?: Date | null;
  dataFim?: Date | null;
  semExpiracao: boolean;
  previewURL?: string | null;
  tipoArquivo?: string | null;
}

@Component({
  selector: 'app-documentos-pet',
  templateUrl: './pet-document.component.html',
  styleUrls: ['./pet-document.component.scss'],
})
export class PetDocumentComponent {
  documentos: Documento[] = [];
  novoDoc: Documento = {
    titulo: '',
    descricao: null,
    nomeArquivo: '',
    dataInicio: null,
    dataFim: null,
    semExpiracao: false,
  };
  arquivoSelecionado: File | null = null;
  previewURL: string | null = null;
  tipoArquivo: string | null = null;
  semExpiracao = false;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.arquivoSelecionado = input.files[0];
      this.tipoArquivo = this.arquivoSelecionado.type;

      this.novoDoc.nomeArquivo = this.arquivoSelecionado.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewURL = reader.result as string;
      };

      if (
        this.tipoArquivo.startsWith('image/') ||
        this.tipoArquivo === 'application/pdf'
      ) {
        reader.readAsDataURL(this.arquivoSelecionado);
      }
    }
  }

  adicionarDocumento() {
    if (!this.arquivoSelecionado) return;

    const novoDocumento: Documento = {
      titulo: this.novoDoc.titulo,
      descricao: this.novoDoc.descricao || null,
      nomeArquivo: this.novoDoc.nomeArquivo,
      dataInicio: this.novoDoc.dataInicio || null,
      dataFim: this.semExpiracao ? null : this.novoDoc.dataFim,
      semExpiracao: this.semExpiracao,
      previewURL: this.previewURL,
      tipoArquivo: this.tipoArquivo,
    };

    this.documentos.push(novoDocumento);
    this.limparFormulario();

    const modalEl = document.getElementById('novoDocumentoModal');
    if (modalEl) {
      const modal =
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();
    }
  }

  limparFormulario() {
    this.novoDoc = {
      titulo: '',
      descricao: null,
      nomeArquivo: '',
      dataInicio: null,
      dataFim: null,
      semExpiracao: false,
    };
    this.arquivoSelecionado = null;
    this.previewURL = null;
    this.tipoArquivo = null;
    this.semExpiracao = false;
  }
}
