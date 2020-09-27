import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent, UserDetails } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        FormsModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,BrowserAnimationsModule,MatButtonModule
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Login title validation', () => {
    
    const matcard = Array.from(
      document.getElementsByTagName('mat-card')
    );
    
    matcard.forEach(card => {
      const cardTitle = card.getElementsByTagName('mat-card-title')[0].textContent;
      console.log(cardTitle)
      expect(cardTitle).toEqual("Login")
      });

  });

  it('Username validation', () => {   
   
      let username = component.loginFormGroup.controls['username']
      expect(username.valid).toBeFalsy();
  
      username.setValue("");
      expect(username.hasError('required')).toBeTruthy();      

  });


  it('Password validation', () => {   
   
    let password = component.loginFormGroup.controls['password']
    expect(password.valid).toBeFalsy();

    password.setValue("");
    expect(password.hasError('required')).toBeTruthy();      

});

it('form invalid when empty', () => {
  expect(component.loginFormGroup.valid).toBeFalsy();
});

it('Login button validation', () => {   
 
    const testForm = <NgForm>{
    value: {
      username: "leo",
      password: "leo"
    }
};

  component.loginfn(testForm)
 expect(component.data.username).toContain('leo');
 expect(component.data.password).toContain('leo'); 
});



});
