import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter um formulário inválido inicialmente', () => {
    expect(component.FormGroup.valid).toBeFalse();
  });

  it('deve tornar o formulário válido quando os dados forem preenchidos corretamente', () => {
    component.FormGroup.setValue({
      dadosPessoais: {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        celular: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        uf: '',
        cidade: ''
      },
      dadosPet: {
        petNome: '',
        petTipo: ''
      },
      senha: {
        senha: '',
        confirmarSenha: ''
      }
    });

    expect(component.FormGroup.valid).toBeTrue();
  });

  it('deve marcar todos os campos como tocados quando o formulário for inválido', () => {
    spyOn(component.FormGroup, 'markAllAsTouched');
    component.onSubmit();
    expect(component.FormGroup.markAllAsTouched).toHaveBeenCalled();
  });

  it('deve redirecionar para /login após o envio do formulário válido', () => {
    const router = TestBed.inject(Router);

    component.FormGroup.setValue({
      dadosPessoais: {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        celular: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        uf: '',
        cidade: ''
      },
      dadosPet: {
        petNome: '',
        petTipo: ''
      },
      senha: {
        senha: '',
        confirmarSenha: ''
      }
    });

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
