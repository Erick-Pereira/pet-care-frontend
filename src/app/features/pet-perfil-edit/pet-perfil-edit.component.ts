import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pet-perfil-edit',
  templateUrl: './pet-perfil-edit.component.html',
  styleUrls: ['./pet-perfil-edit.component.scss'],
})
export class PetPerfilEditComponent implements OnInit {
  id!: string;
  pet = {
    nome: '',
    dataNascimento: '',
    raca: '',
    aquisicao: '',
    possuiChip: false,
    codigoChip: '',
    genero: '',
    especie: '',
    cor: '',
    castrado: false,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('ID do Pet:', this.id);
    // Aqui você pode carregar os dados do pet pelo ID via API/service.
  }

  onSubmit() {
    console.log('Dados do pet salvos:', this.pet);
    // Aqui você pode fazer o update via API e navegar de volta ou exibir uma mensagem de sucesso.
    this.router.navigate(['/PerfilList']); // Por exemplo
  }

  onCancel() {
    this.router.navigate(['/pet-perfil', this.id]); // Voltar para o perfil do pet
  }
}
