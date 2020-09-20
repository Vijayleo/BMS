import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLoanCompComponent } from './apply-loan-comp.component';

describe('ApplyLoanCompComponent', () => {
  let component: ApplyLoanCompComponent;
  let fixture: ComponentFixture<ApplyLoanCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLoanCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
