import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplyLoanCompComponent } from './apply-loan-comp.component';

describe('ApplyLoanCompComponent', () => {
  let component: ApplyLoanCompComponent;
  let fixture: ComponentFixture<ApplyLoanCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyLoanCompComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when empty', async () => {
    expect(component.basicFormGroup.valid).toBeFalsy();
  });

  it('Loan type field validity', async () => {
    const loanType = component.basicFormGroup.controls['loanType'];
    expect(loanType.valid).toBeFalsy();

    loanType.setValue('');
    expect(loanType.hasError('required')).toBeTruthy();
  });

  it('Loan type option selection validation', async () => {
    fixture.detectChanges();
    const loanType = component.basicFormGroup.controls['loanType'];
    loanType.setValue('Education Loan');

    // let select: HTMLSelectElement = fixture.debugElement.query(By.css('.mat-select')).nativeElement;
    // select.setEl("option","Education Loan");
    // select.value = select.options[0].value;
    // await select.dispatchEvent(new Event('change'));
    // fixture.detectChanges();
    // await fixture.whenStable().then(() => {
    //   let text = select.options[select.selectedIndex].label;
    //   console.log(text)
    expect(loanType.value).toBe('Education Loan');
  });

  it('Apply Loan button action validation', async () => {
    component.loanTypes = ['Education Loan', 'Personal / Home Loan'];

    const debugElement = fixture.debugElement;
    // open options dialog
    const matSelect = debugElement.query(By.css('.mat-select')).nativeElement;
    await matSelect.click();
    await fixture.detectChanges();
    // select the first option (use queryAll if you want to chose an option)
    const matOption = debugElement.query(By.css('.mat-option-text'))
      .nativeElement;
    await matOption.click();
    await fixture.detectChanges();

    component.basicFormGroup.patchValue({
      loanAmt: 5000,
      loanApplyDate: new Date(2020, 10, 10),
      loanIssueDate: new Date(2020, 10, 10),
      duration: '5'
    });
    component.basicFormGroup.controls['eLoanFormGroup'].patchValue({
      coursefee: '6000',
      course: 'test',
      fathername: 'Test',
      fatherOccupation: 'Test',
      fatherExp: '2',
      fatherExpwithCompany: '1',
      rationCard: '8544564sd',
      eannualIncome: 'Test'
    });

    component.basicFormGroup.controls['phLoanFormGroup'].patchValue({
      phannualIncome: '',
      companyName: '',
      designation: '',
      totalExp: '',
      expWithCompany: ''
    });

    await fixture.detectChanges();

    const stepContent = document.getElementsByClassName('loanClass');

    const stepFourContent = stepContent[0].getElementsByTagName('button');
    await stepFourContent[0].dispatchEvent(new MouseEvent('click'));
    await fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(
        component.basicFormGroup.controls['phLoanFormGroup'].valid
      ).toBeFalsy();
    });
  });
});
