import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMediaComponent } from './book-media.component';

describe('BookMediaComponent', () => {
  let component: BookMediaComponent;
  let fixture: ComponentFixture<BookMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookMediaComponent]
    });
    fixture = TestBed.createComponent(BookMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
