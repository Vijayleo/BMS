export class Loan {
  constructor(
    private loanType: string,
    private loanAmt: string,
    private loanApplyDate: Date,
    private loanIssueDate: Date,
    private rateOfInterest: string,
    private duration: string,
    private coursefee: string,
    private course: string,
    private fathername: string,
    private fatherOccupation: string,
    private fatherExp: string,
    private fatherExpwithCompany: string,
    private rationCard: string,
    private eannualIncome: string,
    private phannualIncome: string,
    private companyName: string,
    private designation: string,
    private totalExp: string,
    private expWithCompany: string
  ) {}
}
