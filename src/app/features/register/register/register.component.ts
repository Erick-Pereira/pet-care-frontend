import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  etapaAtual = 1;  

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      petNome: ['', [Validators.required]],
      petTipo: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmarSenha: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  irParaProximaEtapa(): void {
    if (this.etapaAtual < 4) {
      this.etapaAtual++;
    }
  }

  voltarEtapa(): void {
    if (this.etapaAtual > 1) {
      this.etapaAtual--;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Formulário submetido', this.registerForm.value);
    }
  }
}