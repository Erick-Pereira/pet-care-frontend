import { Component, OnInit } from '@angular/core';

// @ts-ignore
declare var require: any;
const html2pdf = require('html2pdf.js');



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

@Component({
  selector: 'app-pet-rg',
  templateUrl: './pet-rg.component.html',
  styleUrls: ['./pet-rg.component.scss']
})
export class PetRgComponent implements OnInit {

  pet!: Pet;
  petImageUrl!: string;

  ngOnInit(): void {
    this.pet = {
      nome: 'Sofi',
      dataNascimento: '2021-05-12',
      raca: 'Poodle',
      aquisicao: 'Adoção',
      possuiChip: true,
      codigoChip: '1234567890',
      genero: 'Fêmea',
      especie: 'Canina',
      cor: 'Branca',
      castrado: true
    };

    this.petImageUrl = 'assets/Foto perfil Sofi.JPG';
  }

  imprimir(): void {
    const element = document.getElementById('conteudo-pdf');
    if (element) {
      const options = {
        margin:       0.5,
        filename:     'rg-do-pet.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(options).from(element).save();
    }
  }
}
