import { AppPage } from './app.po';
import { $$, browser, by, element, logging, protractor } from 'protractor';

/** ---------------------- Login Page --------------------------------------- */
const EC = protractor.ExpectedConditions;

describe('Login Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Login');
  });

  it('should have RegiserLink in Login Page', () => {
    //page.navigateTo();
    expect(page.getRegisterLinkText()).toEqual('Register');
  });

  it('should able to click register link', async () => {
    // page.navigateTo();
    await page
      .clickRegisterLink()
      .click()
      .then(function () {
        expect(page.isRegistrationPagePresent()).toBeTruthy(
          'The Registration window is appear now'
        );
      });
  });

  // it('should able to login with valid credentials', async() => {
  //   page.navigateTo();
  //   await element(by.css("input[name='username']")).sendKeys("leo");
  //   await element(by.css("input[name='password']")).sendKeys("leo");
  //   await page.clickLoginButton().click().then(function(){
  //     page.isWelcomePagepresent().getText().then(function(text){
  //       console.log(text)
  //       expect(text).toEqual("Welcome to Banking Manangement System")
  //     })
  //   });

  // });

  /** ---------------------- Register Page --------------------------------------- */

  describe('Registration Page', () => {
    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    it('should display registration page', async () => {
      await page.navigateToRegisterionPage();
      expect(page.getRegisterationpageTitleText()).toEqual('Registration');
    });

    it('Count the stepper header in registration page', async () => {
      // await page.navigateToRegisterionPage();
      const expectedNumberOfSteps = 4;
      let numberOfSteps = 0;
      await $$('mat-step-header')
        .count()
        .then(function (count) {
          numberOfSteps = count;
        });
      await expect(numberOfSteps).toEqual(expectedNumberOfSteps);
    });

    it('Mock the data to first stepper', async () => {
      await page.navigateToRegisterionPage();
      const newReg: any = page.mockDataForfirstStepperInReqPage();
      await element(by.css('[formcontrolname="fullname"]')).sendKeys(
        newReg.fullname
      );
      await element(by.css('[formcontrolname="username"]')).sendKeys(
        newReg.username
      );
      await element(by.css('[formcontrolname="password"]')).sendKeys(
        newReg.password
      );
      await element.all(by.css('[formcontrolname="gender"]')).first().click();
      await element(by.css('[formcontrolname="dob"]')).click();
      browser.executeScript(
        "document.getElementById('dob').value='6/22/1988';document.getElementById('dob').onchange"
      );
      await element
        .all(by.css('[formcontrolname="maritalStatus"]'))
        .first()
        .click();
      await element(by.css('[formcontrolname="emailAddress"]')).sendKeys(
        newReg.emailAddress
      );
      await element(by.css('[formcontrolname="contactNo"]')).sendKeys(
        newReg.contactNo
      );
      await element(by.css('[formcontrolname="guardianType"]')).sendKeys(
        newReg.guardianType
      );
      await element(by.css('[formcontrolname="guardianName"]')).sendKeys(
        newReg.guardianName
      );
      element(by.id('1')).click();
      page.pause();
      const newReg1: any = page.mockDataForsecondStepperInReqPage();
      await element(by.css('[formcontrolname="address"]')).sendKeys(
        newReg1.address
      );
      await element(by.css('[formcontrolname="citizenship"]')).sendKeys(
        newReg1.citizenship
      );
      await element(by.css('[formcontrolname="state"]')).sendKeys(
        newReg1.state
      );
      await element(by.css('[formcontrolname="country"]')).sendKeys(
        newReg1.country
      );
      element(by.id('2')).click();
      page.pause();
      const newReg2: any = page.mockDataForthirdStepperInReqPage();
      browser.executeScript(
        "document.getElementById('regDate').value='9/30/2020';document.getElementById('regDate').onchange"
      );
      await element(by.css('[formcontrolname="accountType"]')).sendKeys(
        newReg2.accountType
      );
      await element(by.css('[formcontrolname="branchName"]')).sendKeys(
        newReg2.branchName
      );
      await element(by.css('[formcontrolname="citizenStatus"]')).sendKeys(
        newReg2.citizenStatus
      );
      await element(by.css('[formcontrolname="amount"]')).sendKeys(
        newReg2.amount
      );
      await element(by.css('[formcontrolname="idProofType"]')).sendKeys(
        newReg2.idProofType
      );
      await element(by.css('[formcontrolname="idDocNo"]')).sendKeys(
        newReg2.idDocNo
      );
      element(by.id('3')).click();
      page.pause();
      await element(by.css('[formcontrolname="acHolderName"]')).sendKeys(
        newReg2.acHolderName
      );
      await element(by.css('[formcontrolname="acHolderAccNo"]')).sendKeys(
        newReg2.acHolderAccNo
      );
      await element(by.css('[formcontrolname="acHolderAddr"]')).sendKeys(
        newReg2.acHolderAddr
      );
      element(by.id('4'))
        .click()
        .then(() => {
          page.pause();
          const msg = element(by.id('dataMsg')).getText();
          expect(msg).toEqual('User Registration Successfull');
        });
    });
  });

  describe('Apply Loan Page', () => {
    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    it('Login with valid credentials and click Apply Loan menu', async () => {
      page.navigateTo();
      await element(by.css("input[name='username']")).sendKeys('leo');
      await element(by.css("input[name='password']")).sendKeys('leo');
      await page.clickLoginButton().click();
      page.pause();
      await page
        .clickApplyloanMenu()
        .click()
        .then(() => {
          page
            .isApplyLoanPagepresent()
            .getText()
            .then(function (text) {
              console.log(text);
              expect(text).toEqual('Loan Details');
            });
        });
      page.pause();
    });

    it('Apply Education Loan', async () => {
      const newApp: any = page.getApplyLoanMockData();

      await element(by.css('[formcontrolname="loanType"]')).sendKeys(
        'Education Loan'
      );
      await browser.executeScript(
        "document.getElementById('date1').value='9/30/2020';document.getElementById('date1').onchange"
      );
      await browser.executeScript(
        "document.getElementById('date2').value='10/10/2020';document.getElementById('date2').onchange"
      );
      await element(by.css('[formcontrolname="loanAmt"]')).sendKeys(
        newApp.loanAmt
      );
      await element(by.css('[formcontrolname="duration"]')).sendKeys(
        newApp.duration
      );
      await element(by.css('[formcontrolname="coursefee"]')).sendKeys(
        newApp.coursefee
      );
      await element(by.css('[formcontrolname="course"]')).sendKeys(
        newApp.course
      );
      await element(by.css('[formcontrolname="fathername"]')).sendKeys(
        newApp.fathername
      );
      await element(by.css('[formcontrolname="fatherOccupation"]')).sendKeys(
        newApp.fatherOccupation
      );
      await element(by.css('[formcontrolname="fatherExp"]')).sendKeys(
        newApp.fatherExp
      );
      await element(
        by.css('[formcontrolname="fatherExpwithCompany"]')
      ).sendKeys(newApp.fatherExpwithCompany);
      await element(by.css('[formcontrolname="eannualIncome"]')).sendKeys(
        newApp.eannualIncome
      );
      await element(by.css('[formcontrolname="rationCard"]')).sendKeys(
        newApp.rationCard
      );
      await element(by.id('apploan'))
        .click()
        .then(() => {
          page.pause();
          const msg = element(by.id('dataMsg')).getText();
          expect(msg).toEqual('Loan Applied Successfully');
          page.pause();
          element(by.id('close')).click();
        });
    });
  });

  describe('Profile Page', () => {
    let page: AppPage;

    beforeEach(() => {
      page = new AppPage();
    });

    it('Login with valid credentials and click Profile menu', async () => {
      // page.navigateTo();
      // await element(by.css("input[name='username']")).sendKeys("leo");
      // await element(by.css("input[name='password']")).sendKeys("leo");
      // await page.clickLoginButton().click();
      //   page.pause();
      await page
        .clickProfileMenu()
        .click()
        .then(() => {
          page
            .isProfilePagepresent()
            .getText()
            .then(function (text) {
              console.log(text);
              expect(text).toEqual('Basic Details');
            });
        });
      page.pause();
    });

    it('Validate Bank Name', async () => {
      await element(by.id('bankName'))
        .getText()
        .then(
          () =>
            function (text) {
              expect(text).toEqual('CTS Bank');
            }
        );
    });

    it('Update Profile', async () => {
      await element(by.css('[formcontrolname="acHolderName"]'))
        .clear()
        .then(() => {
          element(by.css('[formcontrolname="acHolderName"]')).sendKeys('vinay');
        });
      await element(by.buttonText('Update Profile'))
        .click()
        .then(() => {
          const msg = element(by.id('dataMsg')).getText();
          expect(msg).toEqual('Profile Updated Successfully');
          page.pause();
          element(by.id('close')).click();
        });
    });
    it('Click Logout Button', async () => {
      page.pause();
      await element(by.buttonText('Logout'))
        .click()
        .then(() => {
          expect(page.getTitleText()).toEqual('Login');
        });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
