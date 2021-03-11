import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserindexpageComponent } from './userindexpage.component';

describe('UserindexpageComponent', () => {
  let component: UserindexpageComponent;
  let fixture: ComponentFixture<UserindexpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserindexpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserindexpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
