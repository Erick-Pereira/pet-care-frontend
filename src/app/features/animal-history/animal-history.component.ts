import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-history',
  templateUrl: './animal-history.component.html',
  styleUrls: ['./animal-history.component.scss']
})
export class AnimalHistoryComponent implements OnInit {
  @Input() petId!: string;
  historico: { data: string; descricao: string; tipo: string; veterinario?: string }[] = [];
  sharedLink!: string;
  hasHistorico = false;

  ngOnInit() {
    this.loadPetHistory();
  }

  loadPetHistory() {

    this.historico = [
      { data: '2025-05-01', descricao: 'Consulta de rotina', tipo: 'Consulta', veterinario: 'Dr. João' },
      { data: '2025-04-15', descricao: 'Vacinação', tipo: 'Vacina' },
      { data: '2025-03-20', descricao: 'Exame de sangue', tipo: 'Exame', veterinario: 'Dra. Maria' }

    ];

    this.hasHistorico = this.historico.length > 0;
  }

  copyLink() {
    navigator.clipboard.writeText(this.sharedLink).then(() => {
      alert('Link copiado com sucesso!');
    });
  }

  trackById(index: number, item: { data: string; descricao: string; tipo: string; veterinario?: string }): string {
    return item.data;
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  }
  formatDateTime(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleString('pt-BR', options);
  }
}
