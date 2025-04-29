import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DadosPetComponent } from './dados-pet.component';

describe('DadosPetComponent', () => {
  let component: DadosPetComponent;
  let fixture: ComponentFixture<DadosPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPetComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  
  });

  it('should have an invalid form when no data is entered', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.form.get('nomePet')?.setValue('Rex');
    component.form.get('tipoPet')?.setValue('Cachorro');
    component.form.get('idadePet')?.setValue(3);
    component.form.get('pesoPet')?.setValue(8);
    component.form.get('corPet')?.setValue('Marrom');
    component.form.get('racaPet')?.setValue('Labrador');

    expect(component.form.valid).toBeTruthy();
  });

  it('should display an error message when the name is missing', () => {
    const nomePetControl = component.form.get('nomePet');
    nomePetControl?.setValue('');
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Nome é obrigatório');
  });
});
