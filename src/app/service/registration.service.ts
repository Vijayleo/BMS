import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registerUser(user)
  {
    return this.http.post(`http://localhost:8080/register`,user)
  }

}
