import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import * as html2pdf from 'html2pdf.js';


interface Tutor {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
}

@Component({
  selector: 'app-pet-rg',
  templateUrl: './pet-rg.component.html',
  styleUrls: ['./pet-rg.component.scss'],
})
export class PetRgComponent implements OnInit {
  pet: any;
  petImageUrl!: string;

  tutor: Tutor = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: ''
  };

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      this.petService.getPetById(petId).subscribe(response => {
        this.pet = response.item;

        // Define imagem de perfil ou uma padrão
        this.petImageUrl = this.pet.profilePhoto || 'assets/default-pet.png';

        // ⚠️ Aqui você pode futuramente carregar o tutor com base no this.pet.ownerId
        // Por enquanto, mantemos o tutor com dados em branco
      });
    }
  }

  imprimir(): void {
    const element = document.getElementById('conteudo-pdf');
    if (element) {
      const options = {
        margin: 0.5,
        filename: 'rg-do-pet.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().set(options).from(element).save();
    }
  }
}
