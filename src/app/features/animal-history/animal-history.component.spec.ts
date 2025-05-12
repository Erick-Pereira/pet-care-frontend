import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalHistoryComponent } from './animal-history.component';

describe('AnimalHistoryComponent', () => {
  let component: AnimalHistoryComponent;
  let fixture: ComponentFixture<AnimalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
