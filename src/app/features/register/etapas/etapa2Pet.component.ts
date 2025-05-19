import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Especie {
  id: string;
  name: string;
}

interface Raca {
  id: string;
  nome: string;
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
  racas: Raca[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarEspecies();
  }

  buscarEspecies(): void {
    this.http.get<any>('https://localhost:7295/api/Specie')
      .subscribe({
        next: (response) => {
          console.log('Resposta da API espécies:', response);
          if (Array.isArray(response.data)) {
            this.especies = response.data;
          } else {
            console.error('Data não é um array:', response.data);
            this.especies = [];
          }
        },
        error: (err) => console.error('Erro ao buscar espécies:', err)
      });
  }

  buscarRacas(): void {
    const especieSelecionadaId = this.formGroup.get('especie')?.value;
    if (!especieSelecionadaId) {
      this.racas = [];
      return;
    }

    this.http.get<any>(`https://localhost:7295/api/Breed?specieId=${especieSelecionadaId}`)
      .subscribe({
        next: (response) => {
          console.log('Resposta da API raças:', response);
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.racas = response.data;
          } else {
            console.warn('Nenhuma raça encontrada, preenchendo com dados temporários');
            this.racas = [
              { id: '1', nome: 'Raça Exemplo 1' },
              { id: '2', nome: 'Raça Exemplo 2' }
            ];
          }
        },
        error: (err) => {
          console.error('Erro ao buscar raças:', err);
          this.racas = [
            { id: '1', nome: 'Raça Exemplo 1' },
            { id: '2', nome: 'Raça Exemplo 2' }
          ];
        }
      });
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

    // 🔍 Validação condicional do campo numeroChip
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
