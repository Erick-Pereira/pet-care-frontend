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
      imports: [ReactiveFormsModule]
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
    expect(component.form.contains('nome')).toBeTrue();
    expect(component.form.contains('cpf')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('telefone')).toBeTrue();
    expect(component.form.contains('celular')).toBeTrue();
    expect(component.form.contains('cep')).toBeTrue();
    expect(component.form.contains('endereco')).toBeTrue();
    expect(component.form.contains('numero')).toBeTrue();
    expect(component.form.contains('complemento')).toBeTrue();
    expect(component.form.contains('bairro')).toBeTrue();
    expect(component.form.contains('uf')).toBeTrue();
    expect(component.form.contains('cidade')).toBeTrue();
  });

  it('should mark the "nome" field as invalid if it is empty', () => {
    const nomeControl = component.form.get('nome');
    nomeControl?.setValue('');
    expect(nomeControl?.valid).toBeFalse();
  });

  it('should submit the form with valid values entered by the user', () => {
    const nomeInput = fixture.debugElement.query(By.css('#nome')).nativeElement;
    nomeInput.value = 'John Doe';
    nomeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cpfInput = fixture.debugElement.query(By.css('#cpf')).nativeElement;
    cpfInput.value = '123.456.789-00';
    cpfInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = 'john.doe@example.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const celularInput = fixture.debugElement.query(By.css('#celular')).nativeElement;
    celularInput.value = '(99) 99999-9999';
    celularInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cepInput = fixture.debugElement.query(By.css('#cep')).nativeElement;
    cepInput.value = '12345-678';
    cepInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const enderecoInput = fixture.debugElement.query(By.css('#endereco')).nativeElement;
    enderecoInput.value = 'Street 123';
    enderecoInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const numeroInput = fixture.debugElement.query(By.css('#numero')).nativeElement;
    numeroInput.value = '456';
    numeroInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const bairroInput = fixture.debugElement.query(By.css('#bairro')).nativeElement;
    bairroInput.value = 'Bairro X';
    bairroInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const ufInput = fixture.debugElement.query(By.css('#uf')).nativeElement;
    ufInput.value = 'SP';
    ufInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cidadeInput = fixture.debugElement.query(By.css('#cidade')).nativeElement;
    cidadeInput.value = 'Cidade Y';
    cidadeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Agora, o formulário está preenchido com valores simulados pelo usuário
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    const spy = spyOn(component, 'onSubmit').and.callThrough();
    expect(spy).toHaveBeenCalled();
  });

  it('should display error message for required fields when form is touched and invalid', () => {
    const nomeInput = fixture.debugElement.query(By.css('#nome')).nativeElement;
    nomeInput.value = '';
    nomeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTrue();

    component.form.get('nome')?.setValue('John Doe');
    component.form.get('cpf')?.setValue('123.456.789-00');
    component.form.get('email')?.setValue('john.doe@example.com');
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

  it('should emit next event when form is valid and "Próximo" button is clicked', () => {
    const nomeInput = fixture.debugElement.query(By.css('#nome')).nativeElement;
    nomeInput.value = 'John Doe';
    nomeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cpfInput = fixture.debugElement.query(By.css('#cpf')).nativeElement;
    cpfInput.value = '123.456.789-00';
    cpfInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    spyOn(component.next, 'emit');  
    submitButton.click();

    expect(component.next.emit).toHaveBeenCalled();
  });
});
