import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.scss']
})
export class PerfilCardComponent implements OnInit {
  @Input() perfil!: {
    
    imagem: string; 
    nome: string;   
    nomeUsuario: string;
    email: string;
    telefone: string;
    celular: string;
    cpf: string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    imagemPerfilUrl: string;
    pets: { nome: string; especie: string; raca: string }[];
  };

  ngOnInit(): void {
    console.log('PerfilCardComponent initialized with perfil:', this.perfil);
  }

  editarPerfil(): void {
    alert('Funcionalidade de edição em breve!');
  }
}
