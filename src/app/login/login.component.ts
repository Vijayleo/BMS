import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/jwt-authentication.service';

export class UserDetails {
  constructor(public username: string, public password: string) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  loginFormGroup: FormGroup;
  data: UserDetails;

  constructor(
    private _formBuilder: FormBuilder,
    private aAuthenticationService: AuthenticationService,
    private router: Router
  ) {
    this.data = new UserDetails('', '');
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  loginfn(form: NgForm) {
    this.data.username = form.value.username;
    this.data.password = form.value.password;

    console.log(form.value.username + ' ' + form.value.password);
    this.aAuthenticationService
      .authenticate(form.value.username, form.value.password)
      .subscribe(
        (data) => {
          this.router.navigate(['welcome']);
        },
        (error) => {
          this.errorMsg = 'Invalid Credentials';
        }
      );
  }
}
