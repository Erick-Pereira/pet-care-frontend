import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ViaCEPResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
})
export class DadosPessoaisComponent {
  @Input() formGroup!: FormGroup;
  @Input() formFields!: any[];
  @Output() proximo = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  errorMessages: Record<string, string> = {
    required: 'é obrigatório.',
    cpfInvalido: 'CPF inválido. Use o formato 000.000.000-00.',
    telefoneInvalido: 'Telefone inválido. Use o formato (11) 91234-5678.',
    cepInvalido: 'CEP inválido. Use o formato 00000-000.',
    pattern: 'Formato inválido.',
  };

  aplicarMascara(campo: string): void {
    const valor = this.formGroup.get(campo)?.value || '';
    let formatado = valor;

    const valorSemMascara = valor.replace(/\D/g, '');

    if (campo === 'cpf' && valorSemMascara.length === 11) {
      formatado = valorSemMascara.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      );
    } else if (campo === 'telefone') {
      if (valorSemMascara.length === 11) {
        formatado = valorSemMascara.replace(
          /(\d{2})(\d{5})(\d{4})/,
          '($1) $2-$3',
        );
      } else if (valorSemMascara.length === 10) {
        formatado = valorSemMascara.replace(
          /(\d{2})(\d{4})(\d{4})/,
          '($1) $2-$3',
        );
      }
    } else if (campo === 'cep' && valorSemMascara.length === 8) {
      formatado = valorSemMascara.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    this.formGroup.get(campo)?.setValue(formatado);
  }

  limparCaracteresEspeciais(campo: string): void {
    const valor = this.formGroup.get(campo)?.value;
    if (valor) {
      const novoValor = valor.replace(/\D/g, '');
      this.formGroup.get(campo)?.setValue(novoValor);
    }
  }

  buscarEnderecoViaCEP(): void {
    const cep = this.formGroup.get('cep')?.value;
    if (cep && cep.replace(/\D/g, '').length === 8) {
      this.http
        .get<ViaCEPResponse>(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(
          (dados: ViaCEPResponse) => {
            if (dados && !dados.erro) {
              this.formGroup.patchValue({
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf,
              });

              this.formGroup.get('logradouro')?.enable();
              this.formGroup.get('bairro')?.enable();
              this.formGroup.get('uf')?.enable();
              this.formGroup.get('cidade')?.enable();
            } else {
              alert('CEP não encontrado.');
            }
          },
          (error) => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP.');
          },
        );
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.proximo.emit();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.formGroup.get(campo);
    if (control) {
      let valor = control.value || '';
      valor = valor.replace(/\D/g, '');

      if (campo === 'cpf') {
        return (
          control.invalid &&
          (control.touched || control.dirty) &&
          valor.length !== 11
        );
      }

      if (campo === 'telefone') {
        return (
          control.invalid &&
          (control.touched || control.dirty) &&
          (valor.length < 10 || valor.length > 11)
        );
      }

      return control.invalid && (control.touched || control.dirty);
    }
    return false;
  }

  getOptions(field: any) {
    if (field && field.type === 'select' && field.options) {
      return typeof field.options === 'function'
        ? field.options()
        : field.options;
    }
    return [];
  }

  onCepInput(): void {
    const cep = this.formGroup.get('cep')?.value;
    if (cep && cep.replace(/\D/g, '').length === 8) {
      this.buscarEnderecoViaCEP();
    }
  }

  getErrorMessage(field: any): string | null {
    const control = this.formGroup.get(field.name);
    if (!control || !control.errors) return null;
    if (control.hasError('required')) {
      return `${field.label} ${this.errorMessages['required']}`;
    }
    if (control.hasError('pattern') && field.maskErrorKey) {
      return (
        this.errorMessages[field.maskErrorKey] || this.errorMessages['pattern']
      );
    }
    return null;
  }

  onInputMaskAndCep(fieldName: string): void {
    this.aplicarMascara(fieldName);
    if (fieldName === 'cep') {
      const cep = this.formGroup.get('cep')?.value;
      if (cep && cep.replace(/\D/g, '').length === 8) {
        this.buscarEnderecoViaCEP();
      }
    }
  }
}
