import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleprodductComponent } from './singleprodduct.component';

describe('SingleprodductComponent', () => {
  let component: SingleprodductComponent;
  let fixture: ComponentFixture<SingleprodductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleprodductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleprodductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
