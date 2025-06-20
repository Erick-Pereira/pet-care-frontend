import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreedService } from '@app/core/entities/breed/breed.service';
import { SpeciesService } from '@app/core/entities/species/species.service';
import { GeneroPet } from '@app/core/enum/genero-pet.enum';

@Component({
  selector: 'app-dados-pet',
  templateUrl: './dados-pet.component.html',
})
export class DadosPetComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formFields!: any[];
  @Output() proximo = new EventEmitter<void>();
  @Output() anterior = new EventEmitter<void>();

  speciesOptions: any[] = [];
  breedOptions: any[] = [];
  generoOptions = [
    { value: GeneroPet.Macho, label: 'Macho' },
    { value: GeneroPet.Femea, label: 'Fêmea' },
  ];

  constructor(
    private speciesService: SpeciesService,
    private breedService: BreedService,
  ) {}

  ngOnInit(): void {
    this.buscarEspecies();
  }

  campoInvalido(campo: string): boolean {
    const control = this.formGroup.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getOptions(field: any) {
    if (field && field.type === 'select') {
      if (field.name === 'especie') {
        return this.speciesOptions;
      }
      if (field.name === 'raca') {
        return this.breedOptions;
      }
      if (field.name === 'sexo') {
        return this.generoOptions;
      }
      if (field.options) {
        return typeof field.options === 'function'
          ? field.options()
          : field.options;
      }
    }
    return [];
  }

  buscarEspecies(): void {
    this.speciesService.getSpecies().subscribe({
      next: (data: any) => {
        this.speciesOptions = Array.isArray(data.data)
          ? data.data.map((item: any) => ({ value: item.id, label: item.name }))
          : [];
      },
      error: (err) => {
        this.speciesOptions = [];
        console.error('Erro ao buscar espécies:', err);
      },
    });
  }

  buscarRacas(speciesId: string): void {
    this.breedOptions = [];
    if (!speciesId) return;
    this.breedService.getBreeds(speciesId).subscribe({
      next: (data: any) => {
        this.breedOptions = Array.isArray(data.data)
          ? data.data.map((item: any) => ({ value: item.id, label: item.name }))
          : [];
      },
      error: (err) => {
        this.breedOptions = [];
        console.error('Erro ao buscar raças:', err);
      },
    });
  }

  onSelectChange(field: any, event: any): void {
    if (field.name === 'especie') {
      const speciesId =
        typeof event === 'string'
          ? event
          : (event?.target as HTMLSelectElement)?.value;
      this.buscarRacas(speciesId);
      this.formGroup.get('raca')?.setValue('');
    }
    // Se quiser adicionar lógica para outros selects dinâmicos, basta expandir aqui
  }

  onSubmit(): void {
    const camposEtapa2 = [
      'nomePet',
      'especie',
      'sexo',
      'dataNascimento',
      'cor',
      'aquisicao',
      'castrado',
      'chipado',
    ];
    let etapa2Valida = true;

    camposEtapa2.forEach((campo) => {
      const control = this.formGroup.get(campo);
      if (control && control.invalid) {
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
      }
    }

    if (!etapa2Valida) {
      camposEtapa2.forEach((campo) =>
        this.formGroup.get(campo)?.markAsTouched(),
      );
      return;
    }

    this.proximo.emit();
  }

  getSpeciesOptions() {
    return this.speciesOptions;
  }

  getBreedOptions() {
    return this.breedOptions;
  }
}
