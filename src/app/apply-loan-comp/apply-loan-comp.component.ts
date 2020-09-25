import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LoanApplyService } from '../service/loan-apply.service';
import { RegistrationService } from '../service/registration.service';
import { Loan } from './model/loan';

export interface DialogData {
  msg: string;
}


@Component({
  selector: 'app-apply-loan-comp',
  templateUrl: './apply-loan-comp.component.html',
  styleUrls: ['./apply-loan-comp.component.css']
})
export class ApplyLoanCompComponent implements OnInit {

  basicFormGroup: FormGroup
  eLoanFormGroup: FormGroup
  phLoanFormGroup: FormGroup
  loanTypes = ['Education Loan', 'Personal / Home Loan']
  today = new Date()
  showHide1: boolean
  showHide2: boolean
  msg = "Loan Applied Successfully"
  years = ['5', '10', '15', '20']
  loan: Loan

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private applyLoanService: LoanApplyService) {
    this.today.setDate(this.today.getDate());
  }

  ngOnInit(): void {


    this.basicFormGroup = this._formBuilder.group({
      loanType: new FormControl('', [Validators.required]),
      loanAmt: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[1-9])[0-9]*[.,]?[0-9]{1,2}$')]),
      loanApplyDate: new FormControl('', [Validators.required]),
      loanIssueDate: new FormControl('', [Validators.required]),
      rateOfInterest: new FormControl({ value: '', disabled: true }, [Validators.required]),
      duration: new FormControl('', [Validators.required]),

      eLoanFormGroup: new FormGroup({
        coursefee: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        course: new FormControl('', [Validators.required]),
        fathername: new FormControl('', [Validators.required]),
        fatherOccupation: new FormControl('', [Validators.required]),
        fatherExp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        fatherExpwithCompany: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        rationCard: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        eannualIncome: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
      }),
      phLoanFormGroup: this._formBuilder.group({
        phannualIncome: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        companyName: new FormControl('', [Validators.required]),
        designation: new FormControl('', [Validators.required]),
        totalExp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        expWithCompany: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
      })
    })



  }



  onChange(event) {

    if (event.value === 'Education Loan') {
      this.showHide1 = true;
      this.showHide2 = false;

      this.basicFormGroup.get('rateOfInterest').setValue("13.09%")
      this.basicFormGroup.get('phLoanFormGroup.phannualIncome').setValue("")
      this.basicFormGroup.get('phLoanFormGroup.companyName').setValue("")
      this.basicFormGroup.get('phLoanFormGroup.designation').setValue("")
      this.basicFormGroup.get('phLoanFormGroup.totalExp').setValue("")
      this.basicFormGroup.get('phLoanFormGroup.expWithCompany').setValue("")
    }
    else {
      this.showHide1 = false;
      this.showHide2 = true;
      this.basicFormGroup.get('rateOfInterest').setValue("10.55%")
      this.basicFormGroup.get('eLoanFormGroup.coursefee').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.course').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.fathername').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.fatherOccupation').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.fatherExp').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.fatherExpwithCompany').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.rationCard').setValue("")
      this.basicFormGroup.get('eLoanFormGroup.eannualIncome').setValue("")
    }
  }


  applyLoan() {
    this.clearValidation()

    const loanType = this.basicFormGroup.get('loanType').value
    const loanAmt = this.basicFormGroup.get('loanAmt').value
    const loanApplyDate = this.basicFormGroup.get('loanApplyDate').value
    const loanIssueDate = this.basicFormGroup.get('loanIssueDate').value
    const rateOfInterest = this.basicFormGroup.get('rateOfInterest').value
    const duration = this.basicFormGroup.get('duration').value


    const obj2 = this.basicFormGroup.get('eLoanFormGroup').value;
    const obj3 = this.basicFormGroup.get('phLoanFormGroup').value;

    this.loan = { loanType, loanAmt, loanApplyDate, loanIssueDate, rateOfInterest, duration, ...obj2, ...obj3 }

    console.log(this.loan)

    this.applyLoanService.applyLoan(JSON.stringify(this.loan));

   
      this.applyLoanService.applyLoan(JSON.stringify(this.loan)).subscribe(
        response => {
          this.msg = "Loan Applied Successfully"
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
  clearValidation() {
    if (this.basicFormGroup.get('loanType').value === 'Education Loan') {
      this.basicFormGroup.get('phLoanFormGroup.phannualIncome').clearValidators()
      this.basicFormGroup.get('phLoanFormGroup.companyName').clearValidators()
      this.basicFormGroup.get('phLoanFormGroup.designation').clearValidators()
      this.basicFormGroup.get('phLoanFormGroup.totalExp').clearValidators()
      this.basicFormGroup.get('phLoanFormGroup.expWithCompany').clearValidators()
    }
    else {
      this.basicFormGroup.get('eLoanFormGroup.coursefee').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.course').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.fathername').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.fatherOccupation').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.fatherExp').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.fatherExpwithCompany').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.rationCard').clearValidators()
      this.basicFormGroup.get('eLoanFormGroup.eannualIncome').clearValidators()

    }

  }

}
