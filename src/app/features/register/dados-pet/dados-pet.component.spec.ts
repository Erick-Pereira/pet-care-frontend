import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DadosPetComponent } from './dados-pet.component';

describe('DadosPetComponent', () => {
  let component: DadosPetComponent;
  let fixture: ComponentFixture<DadosPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosPetComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DadosPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with expected controls', () => {
    const expectedControls = [
      'nomePet', 'idadePet', 'racaPet', 'especiePet', 'sexoPet', 'pesoPet'
    ];

    expectedControls.forEach(control => {
      expect(component.formGroup.contains(control)).toBeTrue();
    });
  });

  it('should mark "nomePet" as invalid when empty', () => {
    const nomePetControl = component.formGroup.get('nomePet');
    nomePetControl?.setValue('');
    expect(nomePetControl?.valid).toBeFalse();
  });

  it('should mark "idadePet" as invalid when empty or negative', () => {
    const idadePetControl = component.formGroup.get('idadePet');
    idadePetControl?.setValue('');
    expect(idadePetControl?.valid).toBeFalse();

    idadePetControl?.setValue(-1);
    expect(idadePetControl?.valid).toBeFalse();
  });

  it('should submit the form with valid pet data', () => {
    component.formGroup.setValue({
      nomePet: 'Rex',
      idadePet: 3,
      racaPet: 'Labrador',
      especiePet: 'Cão',
      sexoPet: 'Macho',
      pesoPet: 20
    });

    const form = fixture.debugElement.query(By.css('form'));
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    form.triggerEventHandler('ngSubmit', null);

    expect(spy).toHaveBeenCalled();
  });

  it('should show error message if "nomePet" is touched and invalid', () => {
    const nomePetControl = component.formGroup.get('nomePet');
    nomePetControl?.setValue('');
    nomePetControl?.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
  });

  it('should disable the submit button if form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();

    component.formGroup.get('nomePet')?.setValue('Rex');
    component.formGroup.get('idadePet')?.setValue(3);
    component.formGroup.get('racaPet')?.setValue('Labrador');
    component.formGroup.get('especiePet')?.setValue('Cão');
    component.formGroup.get('sexoPet')?.setValue('Macho');
    component.formGroup.get('pesoPet')?.setValue(20);
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });

  it('should emit proximaEtapa when valid form is submitted', () => {
    component.formGroup.setValue({
      nomePet: 'Rex',
      idadePet: 3,
      racaPet: 'Labrador',
      especiePet: 'Cão',
      sexoPet: 'Macho',
      pesoPet: 20
    });

    spyOn(component.proximaEtapa, 'emit');
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    button.click();

    expect(component.proximaEtapa.emit).toHaveBeenCalled();
  });

  it('should change to step 3 when form is valid and nextStep is called', () => {
    component.formGroup.setValue({
      nomePet: 'Rex',
      idadePet: 3,
      racaPet: 'Labrador',
      especiePet: 'Cão',
      sexoPet: 'Macho',
      pesoPet: 20
    });

    component.nextStep();
    expect(component.currentStep).toBe(3);
  });

  it('should not change step if form is invalid', () => {
    component.formGroup.setValue({
      nomePet: '',
      idadePet: 3,
      racaPet: 'Labrador',
      especiePet: 'Cão',
      sexoPet: 'Macho',
      pesoPet: 20
    });

    component.nextStep();
    expect(component.currentStep).toBe(2);
  });
});
