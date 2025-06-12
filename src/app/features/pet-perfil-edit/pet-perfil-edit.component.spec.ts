import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPerfilEditComponent } from './pet-perfil-edit.component';

describe('PetPerfilEditComponent', () => {
  let component: PetPerfilEditComponent;
  let fixture: ComponentFixture<PetPerfilEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetPerfilEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PetPerfilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
