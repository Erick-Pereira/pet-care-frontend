import { Component, OnInit } from '@angular/core';

interface Pet {
  nome: string;
  dataNascimento: string;
  raca: string;
  aquisicao: string;
  possuiChip: boolean;
  codigoChip: string;
  genero: string;
  especie: string;
  cor: string;
  castrado: boolean;
}

interface Tutor {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
}

@Component({
  selector: 'app-pet-perfil',
  templateUrl: './pet-perfil.component.html',
  styleUrls: ['./pet-perfil.component.scss']
})
export class PetPerfilComponent implements OnInit {

  pet!: Pet;
  tutor!: Tutor;
  petImageUrl!: string;
  mostrarPopup!: boolean;

  ngOnInit(): void {

    this.pet = {
      nome: '',
      dataNascimento: '',
      raca: '',
      aquisicao: '',
      possuiChip: false,
      codigoChip: '',
      genero: '',
      especie: '',
      cor: '',
      castrado: false
    };

    this.tutor = {
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      endereco: ''
    };

    // Aqui você define a imagem do pet a partir da pasta assets
    this.petImageUrl = 'assets/Foto perfil Sofi.JPG';

    this.mostrarPopup = false;
  }
}
