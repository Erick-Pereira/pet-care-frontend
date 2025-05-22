import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPerfilComponent } from './pet-perfil.component';

describe('PetPerfilComponent', () => {
  let component: PetPerfilComponent;
  let fixture: ComponentFixture<PetPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
