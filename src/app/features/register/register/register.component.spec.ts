import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    if (!component.registerForm) {
      const fb = TestBed.inject(FormBuilder);
      component.registerForm = fb.group({
        nome: [''],
        email: [''],
        senha: [''],
        confirmarSenha: ['']
      });
    }

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter um formulário inválido inicialmente', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('deve tornar o formulário válido quando os dados forem preenchidos corretamente', () => {
    component.registerForm.setValue({
      nome: 'João',
      email: 'joao@example.com',
      senha: '123456',
      confirmarSenha: '123456'
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('deve mostrar mensagem de erro quando os campos obrigatórios não forem preenchidos', () => {
    component.registerForm.setValue({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    });
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('deve chamar onSubmit quando o formulário for válido', () => {
    spyOn(component, 'onSubmit');
    component.registerForm.setValue({
      nome: 'João',
      email: 'joao@example.com',
      senha: '123456',
      confirmarSenha: '123456'
    });

    fixture.nativeElement.querySelector('form')?.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
