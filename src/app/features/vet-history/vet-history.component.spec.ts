import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetHistoryComponent } from './vet-history.component';

describe('VetHistoryComponent', () => {
  let component: VetHistoryComponent;
  let fixture: ComponentFixture<VetHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
