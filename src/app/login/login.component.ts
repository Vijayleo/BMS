import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg=''
  constructor(private aAuthenticationService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  loginfn(form:NgForm)  {

    console.log(form.value.username+" "+ form.value.password)
    this.aAuthenticationService.authenticate(form.value.username, form.value.password).subscribe(
      data => {this.router.navigate(["welcome"])},
      error => {this.errorMsg="Invalid Credentials"; }
    )
  }

}
