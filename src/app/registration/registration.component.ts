import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { User } from './modal/register';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  register:User;
  genders=['Male','Female']
  maritialStatus = ['Married','Unmarried']
  today = new Date()
  message=''
  custidProof = ['PAN Card','Passport','Voter Id']

  constructor(private _formBuilder: FormBuilder, private registerService: RegistrationService) {
    this.today.setDate(this.today.getDate());
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], username: ['', Validators.required], password: ['', Validators.required],
       email:['',Validators.compose([Validators.required, Validators.email])],
      contactNo:['',Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])], gtype: ['', Validators.required], gname:['', Validators.required],gend:['Male', Validators.required],martStatus:['Unmarried', Validators.required],
      address: ['', Validators.required],citizenship: ['', Validators.required],state: ['', Validators.required],country: ['', Validators.required],
      accountType: ['', Validators.required],branchName: ['', Validators.required],citizenStatus: ['', Validators.required],amount: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      documentNo: ['', Validators.required],acHolderName: ['', Validators.required],acHolderAccNo: ['', Validators.required],acHolderAddr: ['', Validators.required],
      dob: ['', Validators.required],regDate: ['', Validators.required],customerId:['', Validators.required]
    })
    
  }

  onSubmit()
  {
    this.register = this.firstFormGroup.value;
    this.registerService.registerUser(this.register).subscribe(
      response =>{ this.message="User Registration Successful"},
      error =>{this.message =error.error.message;
      }
    )

    console.log(this.firstFormGroup.value)
  }

}
