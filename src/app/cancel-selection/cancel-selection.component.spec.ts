import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSelectionComponent } from './cancel-selection.component';

describe('CancelSelectionComponent', () => {
  let component: CancelSelectionComponent;
  let fixture: ComponentFixture<CancelSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelSelectionComponent]
    });
    fixture = TestBed.createComponent(CancelSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
