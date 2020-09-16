import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { User } from './modal/register';
import {MatStepper} from '@angular/material/stepper'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  accountFormGroup: FormGroup;
  otherFormGroup: FormGroup;
  isEditable = false;

  registrationFormGroup: FormGroup;

  register: User;
  genders = ['Male', 'Female']
  maritialStatus = ['Married', 'Unmarried']
  today = new Date()
  message = ''
  custidProof = ['PAN Card', 'Passport', 'Voter Id']
  accountTypes = ['Savings', 'Current']

  constructor(private _formBuilder: FormBuilder, private registerService: RegistrationService, private router: Router) {
       this.today.setDate(this.today.getDate());
    }

  ngOnInit() {
    this.personalFormGroup = this._formBuilder.group({
      fullname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            gend: new FormControl('Male', Validators.required),
            dob: new FormControl('', Validators.required),
            martStatus: new FormControl('Unmarried', Validators.required),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
            gtype: new FormControl('', Validators.required),
            gname: new FormControl('', Validators.required)
    });
    this.addressFormGroup = this._formBuilder.group({
           address: new FormControl('', Validators.required),
            citizenship: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required)
    });
    this.accountFormGroup = this._formBuilder.group({
            accountType: new FormControl('', Validators.required),
            branchName: new FormControl('', Validators.required),
            citizenStatus: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
            documentNo: new FormControl('', Validators.required),
            regDate: new FormControl('', Validators.required),
            customerId: new FormControl('', Validators.required)
    });
    this.otherFormGroup = this._formBuilder.group({
        acHolderName: new FormControl('', Validators.required),
        acHolderAccNo: new FormControl('', Validators.required),
        acHolderAddr: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    const obj1=this.personalFormGroup.value;
    const obj2=this.addressFormGroup.value;
    const obj3=this.accountFormGroup.value;
    const obj4=this.otherFormGroup.value;

    this.register ={...obj1,...obj2,...obj3,...obj4}

    console.log(this.register)

    this.registerService.registerUser(this.register).subscribe(
      response => { this.message = "User Registration Successful" },
      error => {
        this.message = error.error.message;
      }
    )

    console.log(this.register)
  }

  cancel() {
    this.router.navigate(['login']);
  }

  goBack(stepper:MatStepper)
  {
    this.isEditable=true;
    stepper.previous();

  }
 

}
