import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-etapa1-pessoais',
  templateUrl: './etapa1Pessoais.component.html',
})
export class Etapa1PessoaisComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() proximo = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

  }

  aplicarMascara(campo: string): void {
    const valor = this.formGroup.get(campo)?.value || '';
    let formatado = valor;

    // Remove a máscara antes de aplicar uma nova, para garantir que a validação seja feita apenas com números
    const valorSemMascara = valor.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (campo === 'cpf' && valorSemMascara.length === 11) {
      formatado = valorSemMascara.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (campo === 'telefone') {
      if (valorSemMascara.length === 11) {
        formatado = valorSemMascara.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (valorSemMascara.length === 10) {
        formatado = valorSemMascara.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }
    } else if (campo === 'cep' && valorSemMascara.length === 8) {
      formatado = valorSemMascara.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    this.formGroup.get(campo)?.setValue(formatado);
  }

  // Função para limpar caracteres especiais (quando o campo perde o foco)
  limparCaracteresEspeciais(event: any, campo: string): void {
    const valor = this.formGroup.get(campo)?.value;
    if (valor) {
      const novoValor = valor.replace(/\D/g, '');
      this.formGroup.get(campo)?.setValue(novoValor);
    }
  }

  // Função para buscar o endereço via CEP
  buscarEnderecoViaCEP(): void {
    const cep = this.formGroup.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((dados: any) => {
          if (dados && !dados.erro) {
            this.formGroup.patchValue({
              logradouro: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              uf: dados.uf
            });

            // Habilita os campos de endereço após o preenchimento
            this.formGroup.get('logradouro')?.enable();
            this.formGroup.get('bairro')?.enable();
            this.formGroup.get('uf')?.enable();
            this.formGroup.get('cidade')?.enable();
          } else {
            alert('CEP não encontrado.');
          }
        }, error => {
          alert('Erro ao buscar o CEP.');
        });
    }
  }

  removerMascaraAntesDeEnviar(): void {
    ['cpf', 'telefone', 'cep'].forEach(campo => {
      const valor = this.formGroup.get(campo)?.value || '';
      const valorSemMascara = valor.replace(/\D/g, '');
      this.formGroup.get(campo)?.setValue(valorSemMascara);
    });
  }

  // Função chamada ao enviar o formulário
  onSubmit(): void {
    this.removerMascaraAntesDeEnviar();

    if (this.formGroup.valid) {
      this.proximo.emit();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.formGroup.get(campo);
    if (control) {
      // Se o campo foi tocado ou alterado, faz a validação
      let valor = control.value || '';
      valor = valor.replace(/\D/g, ''); // Remove a máscara para validar apenas os números

      // Verifica se o campo está inválido com base no número de caracteres
      if (campo === 'cpf') {
        return (control.invalid && (control.touched || control.dirty)) && valor.length !== 11;
      }

      if (campo === 'telefone') {
        return (control.invalid && (control.touched || control.dirty)) && (valor.length < 10 || valor.length > 11);
      }

      // Para os outros campos, verifica se está inválido e foi tocado ou modificado
      return control.invalid && (control.touched || control.dirty);
    }
    return false;
  }

}
