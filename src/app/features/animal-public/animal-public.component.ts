import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-public',
  templateUrl: './animal-public.component.html',
  styleUrls: ['./animal-public.component.scss']
})
export class AnimalPublicComponent implements OnInit {
  pet = {
    nome: 'Rex',
    especie: 'Cachorro',
    raca: 'Labrador',
    idade: 3,
    
    tutor: {
      nome: 'João Silva',
      telefone: '(11) 98765-4321'
    },
    historicoMedico: [
      { data: '2023-01-01', descricao: 'Vacinação contra raiva' },
      { data: '2023-03-15', descricao: 'Consulta de rotina' }
    ],

    mostrarNome: true,
    mostrarTutor: false,
    mostrarTelefone: false,
    mostrarHistorico: false
  };

  qrCodeUrl = 'https://petdocs.com/pet/rex';
  mostrarCampoCodigo = false;
  acessoPermitido = false;
  codigoForm: FormGroup;
  erroCodigo = false;
  encodeURIComponent: (uriComponent: string) => string = encodeURIComponent;

  constructor(private fb: FormBuilder) {
    this.codigoForm = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('AnimalPublicComponent initialized');
  }

  validarCodigo(): void {
    const codigo = this.codigoForm.get('codigo')?.value;
    if (codigo === '12345') {
      this.acessoPermitido = true;
      this.erroCodigo = false;
    } else {
      this.erroCodigo = true;
      this.acessoPermitido = false;
    }
  }
}
