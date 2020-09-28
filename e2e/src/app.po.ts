import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {


  /** Login Page */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.mat-card-title')).getText() as Promise<string>;
  }

  getRegisterLinkText(): Promise<string> {
    return element(by.css("a")).getText() as Promise<string>;
  }
  

  pause(): promise.Promise<any> {
    return browser.sleep(5000);
  }

  clickLoginButton():ElementFinder
  {
    return element(by.buttonText('Login'));
  }

  isWelcomePagepresent():ElementFinder {
    return element(by.tagName('h3'));
  }

  isRegistrationPagePresent() : promise.Promise<boolean> {
    return element(by.css('.reg')).isPresent();
}

  /** Register Page */

  clickRegisterLink():ElementFinder{
    return element(by.tagName('a'))
  } 
  navigateToRegisterionPage(): Promise<unknown> {
    return browser.get(browser.baseUrl+"register") as Promise<unknown>;
  }
  getRegisterationpageTitleText(): Promise<string> {
    return element(by.css('.reg')).getText() as Promise<string>;
  }
  mockDataForfirstStepperInReqPage(): any {
    let mockData: any = { 
      fullname: "dhanu",
      username: "dhanu",
      password: "dhanu",
      emailAddress: "dhanu@sc.com",
      gender: "Male",
      maritalStatus: "Unmarried",
      contactNo: 9564985645,
      dob: new Date(1988, 5, 22),
      guardianType: "Test",
      guardianName: "Test"
    }
    return mockData;
}

mockDataForsecondStepperInReqPage(): any {
  let mockData1: any = { 
    address: "Test",
      citizenship: "Test",
      state: "Test",
      country: "Test"
  }
  return mockData1;
}

mockDataForthirdStepperInReqPage(): any {
  let mockData2: any = { 
    accountType: "Savings",
    branchName: "Test",
    citizenStatus: "Minor",
    amount: 5000,
    idProofType: "PAN Card",
    idDocNo: "asdf5641654ad",
    acHolderName: "Test",
      acHolderAccNo: "Test",
      acHolderAddr: "Test"
  }
  return mockData2;
}
/** --------------------Apply Loan Mock Data------------------------------- */
isApplyLoanPagepresent():ElementFinder {
  return element(by.css("div[class='header']"));
}

clickApplyloanMenu():ElementFinder{
  return element(by.buttonText('Apply Loan'))
} 

getApplyLoanMockData():any{
  let mockDataApp: any = { 
  loanAmt: 5000,
  duration: "5",
  coursefee: 6000,
  course: "test",
  fathername: "Test",
  fatherOccupation: "Test",
  fatherExp: 2,
  fatherExpwithCompany: 1,
  rationCard: 8544564,
  eannualIncome: 2515,
  phannualIncome: "",
  companyName: "",
  designation: "",
  totalExp: "",
  expWithCompany: ""
  }
  return mockDataApp;
}

/** --------------------Profile Menu------------------------------- */
isProfilePagepresent():ElementFinder {
  return element(by.css("div[class='header']"));
}

clickProfileMenu():ElementFinder{
  return element(by.buttonText('Profile'))
} 
}
