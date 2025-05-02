import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module"; // Importação correta

@Component({
  standalone: true,
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  imports: [SharedModule], // Importação do módulo compartilhado aqui
})
export class ServicesComponent implements OnInit {
  title = 'Nossos Serviços';
  description =
    'Oferecemos uma ampla gama de serviços para facilitar a vida dos donos de pets:';
  services: string[] = [];

  ngOnInit(): void {
    this.services = [
      'Organização de documentos veterinários.',
      'Agendamento de consultas e lembretes.',
      'Armazenamento seguro de informações sobre vacinas.',
      'Compartilhamento de dados com profissionais de saúde animal.',
    ];
  }
}
