/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-vaccination-card',
  templateUrl: './vaccination-card.component.html',
})
export class VaccinationCardComponent implements OnInit {
  vaccines: any[] = [];
  filteredVaccines: any[] = [];
  searchTerm = '';
  newVaccine: any = {
    nome: '',
    codigo: '',
    data: '',
    lote: '',
    repeticao: '',
  };

  constructor(private router: Router) {}

  semRepeticao = false;

  private modalRef: any;

  ngOnInit(): void {
    // Começa vazio, só adiciona vacina quando o usuário incluir
    this.vaccines = [];
    this.filteredVaccines = [];
  }

  openModal() {
    const modalEl = document.getElementById('vaccineModal');
    if (modalEl) {
      this.modalRef = new bootstrap.Modal(modalEl);
      this.modalRef.show();
    }
  }

  saveVaccine() {
    if (this.semRepeticao) {
      this.newVaccine.repeticao = '';
    }

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
    this.semRepeticao = false;
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
    this.router.navigate(['/pet-documents']);
  }

  onSemRepeticaoChange() {
    if (this.semRepeticao) {
      this.newVaccine.repeticao = '';
    }
  }
}
