import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';  // Para gerar UUIDs únicos.

interface DailyActivity {
  id: string;
  date: string;
  type: 'Alimentação' | 'Passeio' | 'Sintoma';
  description: string;
}

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  activityForm: FormGroup;
  activities: DailyActivity[] = [];
  editingIndex: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      date: [this.formatDate(new Date()), Validators.required],
      type: ['Alimentação', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.loadActivities();
  }

  addActivity(): void {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;

      const activity: DailyActivity = {
        id: this.editingIndex !== null ? this.activities[this.editingIndex].id : uuidv4(),
        date: formValue.date,
        type: formValue.type,
        description: formValue.description
      };

      if (this.editingIndex !== null) {
        this.activities[this.editingIndex] = activity;
        this.editingIndex = null;
      } else {
        this.activities.push(activity);
      }

      this.saveActivities();
      this.showSuccessMessage('Atividade salva com sucesso!');
      this.resetForm();
    } else {
      this.showErrorMessage('Preencha todos os campos corretamente!');
    }
  }

  editActivity(index: number): void {
    const activity = this.activities[index];
    this.activityForm.setValue({
      date: activity.date,
      type: activity.type,
      description: activity.description
    });
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.resetForm();
  }

  removeActivity(id: string): void {
    this.activities = this.activities.filter(activity => activity.id !== id);
    this.saveActivities();
    this.showSuccessMessage('Atividade removida com sucesso!');
  }

  private resetForm(): void {
    this.activityForm.reset({
      date: this.formatDate(new Date()),
      type: 'Alimentação',
      description: ''
    });
  }

  private saveActivities(): void {
    try {
      localStorage.setItem('dailyActivities', JSON.stringify(this.activities));
    } catch {
      this.showErrorMessage('Erro ao salvar as atividades. Tente novamente.');
    }
  }

  private loadActivities(): void {
    const stored = localStorage.getItem('dailyActivities');
    if (stored) {
      this.activities = JSON.parse(stored);
      this.activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());  // Ordena as atividades pela data
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 3000);  // Mensagem desaparece após 3 segundos
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 3000);  // Mensagem desaparece após 3 segundos
  }
}
