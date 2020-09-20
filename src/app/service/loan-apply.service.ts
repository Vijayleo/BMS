import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanApplyService {

  constructor( private httpClient:HttpClient) { }


  
  applyLoan(loan)
  {
    //return this.http.post(`http://localhost:8080/applyLoan`,loan)
    return this.httpClient.post<any>('http://localhost:8080/applyLoan',loan)
  }


  
}
