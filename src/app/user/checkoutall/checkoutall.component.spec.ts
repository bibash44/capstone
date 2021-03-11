import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutallComponent } from './checkoutall.component';

describe('CheckoutallComponent', () => {
  let component: CheckoutallComponent;
  let fixture: ComponentFixture<CheckoutallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
