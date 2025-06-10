import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ApiResponse<T> {
  data: T;
}

interface Especie {
  id: string;
  name: string;
}

interface Raca {
  id: string;
  nome: string;
  SpeciesId: string;
}

@Component({
  selector: 'app-etapa2-pet',
  templateUrl: './etapa2Pet.component.html'
})
export class Etapa2PetComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() proximo = new EventEmitter<void>();
  @Output() anterior = new EventEmitter<void>();

  especies: Especie[] = [];
  racasDisponiveis: Raca[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarEspecies();
  }

  buscarEspecies(): void {
    this.http
      .get<ApiResponse<Especie[]>>('https://localhost:7295/api/Specie')
      .subscribe({
        next: (response) => {
          console.log('Resposta da API espécies:', response);
          this.especies = response.data || [];
        },
        error: (err) => console.error('Erro ao buscar espécies:', err),
      });
  }

  buscarRacas(): void {
    const especieSelecionada = this.formGroup.get('especie')?.value;

    console.log('Espécie selecionada:', especieSelecionada);

    const especieId = this.especies.find(especie => especie.name === especieSelecionada)?.id;

    console.log('ID da espécie selecionada:', especieId);

    if (!especieId) {
      this.racasDisponiveis = [];
      console.warn('Nenhuma espécie foi selecionada ou o ID não foi encontrado. Campo de raça permanecerá vazio.');
      return;
    }

    this.http
      .get<ApiResponse<Raca[]>>('https://localhost:7295/api/Breed')
      .subscribe({
        next: (response) => {
          console.log('Dados brutos retornados pela API de raças:', response);
          this.racasDisponiveis = response.data.filter(raca => raca.SpeciesId === especieId) || [];
          
          console.log('Raças disponíveis após o filtro:', this.racasDisponiveis);

          if (this.racasDisponiveis.length === 0) {
            console.warn(`Nenhuma raça encontrada para a espécie com ID: ${especieId}`);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar raças:', err);
          alert('Erro ao carregar as raças. Tente novamente mais tarde.');
        },
      });

    this.formGroup.get('raca')?.setValue('');
  }

  campoInvalido(campo: string): boolean {
    const control = this.formGroup.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit(): void {
    const camposEtapa2 = ['nomePet', 'especie', 'sexo', 'dataNascimento', 'peso', 'cor', 'aquisicao', 'castrado', 'chipado'];
    let etapa2Valida = true;

    camposEtapa2.forEach(campo => {
      const control = this.formGroup.get(campo);
      if (control && control.invalid) {
        console.log(`Campo inválido etapa 2: ${campo}`, control.value);
        etapa2Valida = false;
      }
    });

    const chipado = this.formGroup.get('chipado')?.value;
    const numeroChipControl = this.formGroup.get('numeroChip');

    if (chipado === true) {
      if (!numeroChipControl?.value || numeroChipControl.value.trim() === '') {
        numeroChipControl?.setErrors({ required: true });
        numeroChipControl?.markAsTouched();
        etapa2Valida = false;
        console.log('Campo número do chip é obrigatório quando o animal é chipado');
      }
    }

    if (!etapa2Valida) {
      camposEtapa2.forEach(campo => this.formGroup.get(campo)?.markAsTouched());
      return;
    }

    this.proximo.emit();
  }
}
