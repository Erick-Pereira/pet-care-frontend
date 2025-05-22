import { Component, OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet-perfil',
  templateUrl: './pet-perfil.component.html',
  styleUrls: ['./pet-perfil.component.scss']
})
export class PetPerfilComponent implements OnInit {

  constructor(private http: HttpClient) { }

  // Dados do Pet
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
    castrado: false
  };

  // Dados do Tutor
  tutor = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: ''
  };

  // URL da imagem do pet (será carregada do backend)
  petImageUrl: string = '';

  // Controle do popup de exclusão
  mostrarPopup: boolean = false;

  ngOnInit(): void {
    // Simulação de chamada ao backend para buscar dados
    this.http.get<any>('/api/pet/123').subscribe((dados) => {
      // Supondo que o backend retorne dados neste formato:
      // { pet: {...}, tutor: {...}, fotoPetUrl: '...' }

      this.pet = dados.pet;
      this.tutor = dados.tutor;
      this.petImageUrl = dados.fotoPetUrl;
    });
  }

  // Ações para o popup
  abrirPopup() {
    this.mostrarPopup = true;
  }

  fecharPopup() {
    this.mostrarPopup = false;
  }

  confirmarExclusao() {
    this.mostrarPopup = false;
    // Aqui você pode adicionar uma chamada real de exclusão:
    // this.http.delete(`/api/pet/${this.pet.id}`).subscribe(...)
    console.log('Pet excluído!');
  }
}
