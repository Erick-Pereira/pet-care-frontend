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

  racasDisponiveis: string[] = [];

  buscarRacas(): void {
    const especieSelecionada = this.formGroup.get('especie')?.value;

    if (especieSelecionada === 'Gato') {
      this.racasDisponiveis = ['Persa', 'Siamês', 'Maine Coon'];
    } else if (especieSelecionada === 'Cachorro') {
      this.racasDisponiveis = ['Pinscher', 'Pastor Alemão', 'Dobermann'];
    } else {
      this.racasDisponiveis = [];
    }

    // Limpa o campo de raça ao trocar a espécie
    this.formGroup.get('raca')?.setValue('');
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
