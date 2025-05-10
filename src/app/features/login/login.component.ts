import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
onSubmit() { throw new Error('Method not implemented.');
}

  loginForm!: FormGroup;
  public registrar = 'Registrar';

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  irParaDadosPessoais(): void {
    this.router.navigate(['/DadosPessoais']);
  }
}
