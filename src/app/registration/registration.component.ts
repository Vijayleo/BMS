import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { User } from './modal/register';
import { MatStepper } from '@angular/material/stepper'
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
  isEditable = true

  registrationFormGroup: FormGroup;

  register: User;
  userData: User;
  genders = ['Male', 'Female']
  maritialStatus = ['Married', 'Unmarried']
  today = new Date()
  message = ''
  custidProof = ['PAN Card', 'Passport', 'Voter Id']
  accountTypes = ['Savings', 'Salary']

  constructor(private _formBuilder: FormBuilder, private registerService: RegistrationService, private router: Router,public dialog: MatDialog) {
    this.today.setDate(this.today.getDate());
    this.userData = new User('', '', '', '', '', '', '', '', '', '', '', '', 0, new Date(), new Date(), '', '', '', 0, '', '', '', '', '', '', '', '');
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
      guardianName: new FormControl('', Validators.required)
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
      idDocNo: new FormControl('', Validators.required),
      registrationDate: new FormControl('', Validators.required),
      idProofType: new FormControl('', Validators.required)
    });
    this.otherFormGroup = this._formBuilder.group({
      acHolderName: new FormControl('', Validators.required),
      acHolderAccNo: new FormControl('', Validators.required),
      acHolderAddr: new FormControl('', Validators.required)
    });
  }


  onSubmit() {

    const obj1 = this.personalFormGroup.value;
    const obj2 = this.addressFormGroup.value;
    const obj3 = this.accountFormGroup.value;
    const obj4 = this.otherFormGroup.value;

    this.register = { ...obj1, ...obj2, ...obj3, ...obj4 }

    console.log(this.register)

    if (this.otherFormGroup.valid) {

      this.registerService.registerUser(this.register).subscribe(
        response => {
          this.userData = response
          this.message = "User Registration Successfull"
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            data: { msg: this.message, refNo: this.userData.customerId }
          });
          dialogRef.afterClosed().subscribe((result) => {
           this.router.navigate(['login']);
           });
		  
        },
        error => {
          this.message = "Something Went Wrong. Please Contact Support"
        const dialogRef =  this.dialog.open(DialogComponent, {
            width: '500px',
            data: { msg: this.message }
          });
          dialogRef.afterClosed().subscribe((result) => {
           this.router.navigate(['login']);
          });
          
        }

      )
    }
    console.log(this.register)
  }

  cancel() {
    this.router.navigate(['login']);
  }

  goBack(stepper: MatStepper) {
    this.isEditable = true;
    stepper.previous();

  }

  goNext(stepper: MatStepper) {
    if (this.personalFormGroup.valid) {
      this.isEditable = true;
      stepper.next();
    }
  }


}
