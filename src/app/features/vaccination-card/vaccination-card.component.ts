import { Component, OnInit } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-vaccination-card',
  templateUrl: './vaccination-card.component.html',
})
export class VaccinationCardComponent implements OnInit {
  vaccines: any[] = [];
  filteredVaccines: any[] = [];
  searchTerm: string = '';
  newVaccine: any = {
    nome: '',
    codigo: '',
    data: '',
    lote: '',
    repeticao: '',
  };

  private modalRef: any;

  ngOnInit(): void {
    // 10 campos vazios iniciais
    this.vaccines = Array.from({ length: 10 }, () => ({
      nome: '',
      codigo: '',
      data: '',
      lote: '',
      repeticao: '',
    }));
    this.filteredVaccines = [...this.vaccines];
  }

  openModal() {
    const modalEl = document.getElementById('vaccineModal');
    if (modalEl) {
      this.modalRef = new bootstrap.Modal(modalEl);
      this.modalRef.show();
    }
  }

  saveVaccine() {
    this.vaccines.push({ ...this.newVaccine });
    this.clearForm();
    this.filterVaccines();
    this.modalRef.hide();
  }

  clearForm() {
    this.newVaccine = {
      nome: '',
      codigo: '',
      data: '',
      lote: '',
      repeticao: '',
    };
  }

  filterVaccines() {
    const term = this.searchTerm.toLowerCase();
    this.filteredVaccines = this.vaccines.filter(
      (v) =>
        v.nome?.toLowerCase().includes(term) ||
        v.codigo?.toLowerCase().includes(term),
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredVaccines = [...this.vaccines];
  }

  goBack() {
    window.history.back();
  }
}
