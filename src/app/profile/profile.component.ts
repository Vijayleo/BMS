import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { User } from '../registration/modal/register';
import { MatStepper } from '@angular/material/stepper'
import { CdkColumnDef } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  accountFormGroup: FormGroup;
  otherFormGroup: FormGroup;
  isEditable = true

  registrationFormGroup: FormGroup;

  profile: User;
  dataUser: User;
  genders = ['Male', 'Female']
  maritialStatus = ['Married', 'Unmarried']
  today = new Date()
  msg = ''

  message = ''
  custidProof = ['PAN Card', 'Passport', 'Voter Id']
  accountTypes = ['Savings', 'Salary']

  constructor(private _formBuilder: FormBuilder, private registerService: RegistrationService, private router: Router, public dialog: MatDialog) {
    this.dataUser = new User('', '', '', '', '', '', '', '', '', '', '', '', 0, new Date(), new Date(), '', '', '', 0, '', '', '', '', '', '', '', '');
  }


  ngOnInit() {

    this.personalFormGroup = this._formBuilder.group({
      fullname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('Male', Validators.required),
      dob: new FormControl('', Validators.required),
      maritalStatus: new FormControl('Unmarried', Validators.required),
      emailAddress: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      guardianType: new FormControl('', Validators.required),
      guardianName: new FormControl('', Validators.required),
      customerId: new FormControl({ value: '', disabled: true }),
      accountNumber: new FormControl({ value: '', disabled: true }),
      bankName: new FormControl({ value: '', disabled: true }),
      address: new FormControl('', Validators.required),
      citizenship: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      citizenStatus: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      idDocNo: new FormControl('', Validators.required),
      registrationDate: new FormControl('', Validators.required),
      idProofType: new FormControl('', Validators.required),
      acHolderName: new FormControl('', Validators.required),
      acHolderAccNo: new FormControl('', Validators.required),
      acHolderAddr: new FormControl('', Validators.required)
    });

    this.callme();

  }

  callme() {
    this.today.setDate(this.today.getDate());
    this.registerService.getUser(sessionStorage.getItem('username')).subscribe(
      response => { this.dataUser = response },
      error => { this.message = error.error.message; }
    )
  }

  updateProfile() {
    this.profile = this.personalFormGroup.value
    console.log('Update prfile==>' + JSON.stringify(this.profile))

    
      this.registerService.updateUser(JSON.stringify(this.profile), sessionStorage.getItem("username")).subscribe(
        response => {
          this.msg = "Profile Updated Successfully"
          this.dialog.open(DialogComponent, {
            width: '500px',
            data: { msg: this.msg }
          });
        },
        error => {
          this.msg = "Something Went Wrong. Please Contact Support"
          this.dialog.open(DialogComponent, {
            width: '500px',
            data: { msg: this.msg }
          });
        }

      )
    
   }
}
