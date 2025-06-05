import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetRgComponent } from './pet-rg.component';

describe('PetRgComponent', () => {
  let component: PetRgComponent;
  let fixture: ComponentFixture<PetRgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetRgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetRgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
