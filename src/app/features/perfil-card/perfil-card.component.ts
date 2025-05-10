import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.scss']
})
export class PerfilCardComponent implements OnInit {

  @Input()
  perfil!: { nome: string; imagem: string | null; };

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}