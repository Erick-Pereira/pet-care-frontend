import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacaoComponent } from './confirmacao.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

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
      nome: ['João'],
      email: ['joao@email.com'],
      cpf: ['123.456.789-00'],
      telefone: ['1133334444'],
      celular: ['11999998888'],
      cep: ['01234-567'],
      endereco: ['Rua Teste'],
      numero: ['123'],
      complemento: ['Apto 4'],
      bairro: ['Centro'],
      uf: ['SP'],
      cidade: ['São Paulo']
    });

    component.dadosPetForm = fb.group({
      nomePet: ['Rex'],
      especie: ['Cachorro'],
      raca: ['Labrador'],
      dataNascimento: ['2020-01-01'],
      peso: [25]
    });

    component.senhaForm = fb.group({
      senha: ['senha123'],
      confirmarSenha: ['senha123']
    });

    fixture.detectChanges();
  });

  it('deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir todos os dados pessoais e do pet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('João');
    expect(compiled.textContent).toContain('joao@email.com');
    expect(compiled.textContent).toContain('123.456.789-00');
    expect(compiled.textContent).toContain('1133334444');
    expect(compiled.textContent).toContain('11999998888');
    expect(compiled.textContent).toContain('01234-567');
    expect(compiled.textContent).toContain('Rua Teste');
    expect(compiled.textContent).toContain('123');
    expect(compiled.textContent).toContain('Apto 4');
    expect(compiled.textContent).toContain('Centro');
    expect(compiled.textContent).toContain('SP');
    expect(compiled.textContent).toContain('São Paulo');
    expect(compiled.textContent).toContain('Rex');
    expect(compiled.textContent).toContain('Cachorro');
    expect(compiled.textContent).toContain('Labrador');
    expect(compiled.textContent).toContain('2020'); 
    expect(compiled.textContent).toContain('25');
  });

  it('deve emitir voltarEtapa ao clicar em Voltar', () => {
    spyOn(component.voltarEtapa, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.voltarEtapa.emit).toHaveBeenCalled();
  });

  it('deve emitir concluir ao clicar em Concluir com forms válidos', () => {
    spyOn(component.concluir, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click(); 
    expect(component.concluir.emit).toHaveBeenCalled();
  });
});
