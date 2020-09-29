import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { JUN, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { RegistrationComponent } from './registration.component';
import { browser, element } from 'protractor';
import { DialogComponent } from '../dialog/dialog.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent, DialogComponent],
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
        MatToolbarModule,
        MatDatepickerModule,
        MatCardModule,
        BrowserDynamicTestingModule,
        MatNativeDateModule,
        MatRadioModule,
        MatStepperModule,
        MatButtonModule,
        MatDialogModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when empty', async () => {
    expect(component.personalFormGroup.valid).toBeFalsy();
  });

  it('Name field validity', async () => {
    const name = component.personalFormGroup.controls['fullname'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('58');
    let errors = {};
    errors = name.errors || {};
    expect(name.hasError('pattern')).toBeTruthy();
  });

  it('Radio option field validity', async () => {
    const Gender = component.personalFormGroup.controls['gender'];
    Gender.setValue('Female');
    expect(Gender.value).toBe('Female');
  });

  it('should show the proper number of stepper containers as there are steps', () => {
    const expectedNumberOfSteps = 4;
    const numberOfSteps = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );
    expect(numberOfSteps.length).toEqual(expectedNumberOfSteps);
  });

  it('Check first header form group', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepFirstContent = stepContent[0].children;
    expect(stepFirstContent[0].nodeName).toEqual('FORM');
    expect(stepFirstContent[0].id).toEqual('personalFormGroup');
  });

  it('Check Next button click validation for form group 1', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepOneButton = stepContent[0].getElementsByTagName('button');
    stepOneButton[0].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    const Password = component.personalFormGroup.controls['password'];
    const name = component.personalFormGroup.controls['fullname'];

    expect(Password.hasError('required')).toBeTruthy();
    expect(name.hasError('required')).toBeTruthy();
    expect(component.personalFormGroup.valid).toBeFalsy();
  });

  it('Check second header form group', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepTwoContent = stepContent[1].children;
    expect(stepTwoContent[0].nodeName).toEqual('FORM');
    expect(stepTwoContent[0].id).toEqual('addressFormGroup');
  });

  it('Check third header form group', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepThirdContent = stepContent[2].children;
    expect(stepThirdContent[0].nodeName).toEqual('FORM');
    expect(stepThirdContent[0].id).toEqual('accountFormGroup');
  });

  it('Check fourth header form group', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepFourthContent = stepContent[3].children;
    expect(stepFourthContent[0].nodeName).toEqual('FORM');
    expect(stepFourthContent[0].id).toEqual('otherFormGroup');
  });

  it('Check Next button click validation for form group 2', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepSecondContent = stepContent[1].getElementsByTagName('button');
    Array.from(stepSecondContent).forEach((button) => {
      if (button.type === 'submit') {
        button.dispatchEvent(new MouseEvent('click'));
      }
    });
    fixture.detectChanges();
    const address = component.addressFormGroup.controls['address'];
    const citizenship = component.addressFormGroup.controls['citizenship'];

    expect(address.hasError('required')).toBeTruthy();
    expect(citizenship.hasError('required')).toBeTruthy();
    expect(component.addressFormGroup.valid).toBeFalsy();
  });

  it('Check Next button click validation for form group 3', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepThirdContent = stepContent[2].getElementsByTagName('button');
    Array.from(stepThirdContent).forEach((button) => {
      if (button.type === 'submit') {
        button.dispatchEvent(new MouseEvent('click'));
      }
    });
    fixture.detectChanges();
    const accountType = component.accountFormGroup.controls['accountType'];
    const docid = component.accountFormGroup.controls['idDocNo'];

    expect(accountType.hasError('required')).toBeTruthy();
    expect(docid.hasError('required')).toBeTruthy();
    expect(component.accountFormGroup.valid).toBeFalsy();
  });

  it('Check Submit button click validation for form group 4', () => {
    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepFourContent = stepContent[2].getElementsByTagName('button');
    Array.from(stepFourContent).forEach((button) => {
      if (button.type === 'submit') {
        button.dispatchEvent(new MouseEvent('click'));
      }
    });

    fixture.detectChanges();
    const acHolderName = component.otherFormGroup.controls['acHolderName'];
    const acHolderAccNo = component.otherFormGroup.controls['acHolderAccNo'];

    expect(acHolderName.hasError('required')).toBeTruthy();
    expect(acHolderAccNo.hasError('required')).toBeTruthy();
    expect(component.otherFormGroup.valid).toBeFalsy();
  });

  it('Submit button click', () => {
    component.personalFormGroup.patchValue({
      fullname: 'dhanu',
      username: 'dhanu',
      password: 'dhanu',
      emailAddress: 'dhanu@sc.com',
      gender: 'Male',
      maritalStatus: 'Unmarried',
      contactNo: 9564985645,
      dob: new Date(1988, 5, 22),
      guardianType: 'Test',
      guardianName: 'Test'
    });

    component.addressFormGroup.patchValue({
      address: 'Test',
      citizenship: 'Test',
      state: 'Test',
      country: 'Test'
    });

    component.addressFormGroup.patchValue({
      registrationDate: new Date(2020, 10, 22),
      accountType: 'Savings',
      branchName: 'Test',
      citizenStatus: 'Minor',
      amount: 5000,
      idProofType: 'PAN Card',
      idDocNo: 'asdf5641654ad'
    });
    component.otherFormGroup.patchValue({
      acHolderName: 'Test',
      acHolderAccNo: 'Test',
      acHolderAddr: 'Test'
    });

    const stepContent = document.getElementsByClassName(
      'mat-horizontal-stepper-content'
    );

    const stepFourContent = stepContent[2].getElementsByTagName('button');
    Array.from(stepFourContent).forEach((button) => {
      if (button.type === 'submit') {
        button.dispatchEvent(new MouseEvent('click'));
      }
    });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.otherFormGroup.valid).toBeTruthy();
    });
  });
});
