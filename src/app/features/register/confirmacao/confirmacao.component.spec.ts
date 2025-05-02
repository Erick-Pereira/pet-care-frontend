import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ConfirmacaoComponent } from './confirmacao.component';

describe('ConfirmacaoComponent', () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacaoComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    component.dadosPessoaisForm = fb.group({
      nome: ['Teste'],
      email: ['teste@teste.com'],
      telefone: ['11999999999'],
      endereco: ['Rua Teste'],
    });

    component.dadosPetForm = fb.group({
      nomePet: ['Rex'],
      especie: ['Cachorro']
    });

    component.senhaForm = fb.group({
      senha: ['123456'],
      confirmarSenha: ['123456']
    });

    fixture.detectChanges(); 
  });

  it('deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir os dados preenchidos', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Teste');
    expect(compiled.textContent).toContain('teste@teste.com');
    expect(compiled.textContent).toContain('11999999999');
    expect(compiled.textContent).toContain('Rua Teste');

    expect(compiled.textContent).toContain('Rex');
    expect(compiled.textContent).toContain('Cachorro');
  });
});
