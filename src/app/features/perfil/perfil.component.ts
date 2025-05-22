import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
   itens = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  dadosPessoais!: FormGroup;
  imagemPerfilUrl: string | null = null;
  nomeUsuario: string | null = null;
  email: string | null = null;
  telefone: string | null = null;
  celular: string | null = null;
  cpf: string | null = null;
  cep: string | null = null;
  endereco: string | null = null;
  numero: string | null = null;
  complemento: string | null = null;
  bairro: string | null = null;
  cidade: string | null = null;
  uf: string | null = null;
nome: any;


  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dadosPessoais = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, this.cpfValidator]],
      telefone: [''],
      celular: ['', Validators.required],
      cep: [''],
      endereco: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],

    });
  }

  cpfValidator(): Record<string, unknown> | null {

    return null;
  }
}
