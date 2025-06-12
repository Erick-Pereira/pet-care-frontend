import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
})
export class ConfirmacaoComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  @Input() dadosPessoaisForm!: FormGroup;
  @Input() dadosPetForm!: FormGroup;
  @Input() senhaForm!: FormGroup;
  @Input() label = 'concluir';

  @Output() concluir = new EventEmitter<void>();
  @Output() voltarEtapa = new EventEmitter<void>();

  progress = 0;
  currentStep = 4;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.updateProgress();

    this.subscriptions.push(
      this.dadosPessoaisForm.valueChanges.subscribe(() =>
        this.updateProgress(),
      ),
      this.dadosPetForm.valueChanges.subscribe(() => this.updateProgress()),
      this.senhaForm.valueChanges.subscribe(() => this.updateProgress()),
    );
  }

  updateProgress(): void {
    const forms = [this.dadosPessoaisForm, this.dadosPetForm, this.senhaForm];
    const totalCampos = forms.reduce(
      (sum, form) => sum + Object.keys(form.controls).length,
      0,
    );
    const camposPreenchidos = forms.reduce((sum, form) => {
      return (
        sum +
        Object.values(form.controls).filter(
          (control) => control.value && control.valid,
        ).length
      );
    }, 0);
    this.progress = Math.floor((camposPreenchidos / totalCampos) * 100);
  }

  onSubmit(): void {
    if (
      this.dadosPessoaisForm.valid &&
      this.dadosPetForm.valid &&
      this.senhaForm.valid
    ) {
      console.log('Todos os dados:', {
        dadosPessoais: this.dadosPessoaisForm.value,
        dadosPet: this.dadosPetForm.value,
        senha: this.senhaForm.value,
      });
      this.concluir.emit();
    } else {
      this.dadosPessoaisForm.markAllAsTouched();
      this.dadosPetForm.markAllAsTouched();
      this.senhaForm.markAllAsTouched();
    }
  }

  voltar(): void {
    this.voltarEtapa.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  IrParaPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}
