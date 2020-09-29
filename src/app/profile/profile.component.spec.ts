import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
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
        MatButtonModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should be initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it('Form invalid when empty', async () => {
    expect(component.personalFormGroup.valid).toBeFalsy();
  });

  it('Button Text validation', async () => {
    const fixr = fixture.debugElement
      .queryAll(By.css('button'))
      .find(
        (buttonEl) => buttonEl.nativeElement.textContent === 'Update Profile'
      );
    console.log(fixr.nativeElement.innerText);
    expect(fixr.nativeElement.innerText).toContain('Update Profile');
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
});
