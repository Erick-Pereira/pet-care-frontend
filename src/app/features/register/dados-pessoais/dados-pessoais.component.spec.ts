import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DadosPessoaisComponent } from './dados-pessoais.component';

describe('DadosPessoaisComponent', () => {
  let component: DadosPessoaisComponent;
  let fixture: ComponentFixture<DadosPessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaisComponent ],
      imports: [ReactiveFormsModule] // Importando ReactiveFormsModule para utilizar o FormGroup
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 12 controls', () => {
    const formGroup = component.dadosPessoais;
    const expectedControls = [
      'nome', 'cpf', 'email', 'telefone', 'celular', 'cep', 'endereco',
      'numero', 'complemento', 'bairro', 'uf', 'cidade'
    ];

    expectedControls.forEach(control => {
      expect(formGroup.contains(control)).toBeTrue();
    });
  });

  it('should navigate to next step when nextStep is called and form is valid', () => {
 
    component.dadosPessoais.setValue({
      nome: 'John Doe',
      cpf: '123.456.789-00',
      email: 'john.doe@example.com',
      telefone: '(99) 9999-9999',
      celular: '(99) 99999-9999',
      cep: '12345-678',
      endereco: 'Street 123',
      numero: '456',
      complemento: 'Apto 101',
      bairro: 'Bairro X',
      uf: 'SP',
      cidade: 'Cidade Y'
    });

    spyOn(component.proximaEtapa, 'emit'); 

    component.nextStep(); 
    expect(component.currentStep).toBe(2)
    expect(component.proximaEtapa.emit).toHaveBeenCalled();
  });

  it('should not navigate to next step if form is invalid', () => {
    component.dadosPessoais.setValue({
      nome: '',
      cpf: '123.456.789-00',
      email: 'john.doe@example.com',
      telefone: '(99) 9999-9999',
      celular: '(99) 99999-9999',
      cep: '12345-678',
      endereco: 'Street 123',
      numero: '456',
      complemento: 'Apto 101',
      bairro: 'Bairro X',
      uf: 'SP',
      cidade: 'Cidade Y'
    });

    spyOn(component.proximaEtapa, 'emit'); 

    component.nextStep(); 
    expect(component.currentStep).toBe(1); 
    expect(component.proximaEtapa.emit).not.toHaveBeenCalled(); 
  });

  it('should display the correct form values in the DOM', () => {
    
    component.dadosPessoais.setValue({
      nome: 'John Doe',
      cpf: '123.456.789-00',
      email: 'john.doe@example.com',
      telefone: '(99) 9999-9999',
      celular: '(99) 99999-9999',
      cep: '12345-678',
      endereco: 'Street 123',
      numero: '456',
      complemento: 'Apto 101',
      bairro: 'Bairro X',
      uf: 'SP',
      cidade: 'Cidade Y'
    });

    fixture.detectChanges(); 

    const nomeElement = fixture.debugElement.query(By.css('input[name="nome"]')).nativeElement;
    expect(nomeElement.value).toBe('John Doe');

    const emailElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    expect(emailElement.value).toBe('john.doe@example.com');
  });
});
