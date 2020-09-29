import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenucomponentComponent } from './menucomponent.component';

describe('MenucomponentComponent', () => {
  let component: MenucomponentComponent;
  let fixture: ComponentFixture<MenucomponentComponent>;
  let fix;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenucomponentComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        BrowserDynamicTestingModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenucomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button Apply Loan', () => {
    const fixr = fixture.debugElement
      .queryAll(By.css('button'))
      .find((buttonEl) => buttonEl.nativeElement.textContent === 'Apply Loan');
    console.log(fixr.nativeElement.innerText);
    expect(fixr.nativeElement.innerText).toContain('Apply Loan');
  });

  it('should have button Profile', () => {
    const fixr = fixture.debugElement
      .queryAll(By.css('button'))
      .find((buttonEl) => buttonEl.nativeElement.textContent === 'Profile');
    console.log(fixr.nativeElement.innerText);
    expect(fixr.nativeElement.innerText).toContain('Profile');
  });

  it('should have button Logout', () => {
    const fixr = fixture.debugElement
      .queryAll(By.css('button'))
      .find((buttonEl) => buttonEl.nativeElement.textContent === 'Logout');
    console.log(fixr.nativeElement.innerText);
    expect(fixr.nativeElement.innerText).toContain('Logout');
  });
});
