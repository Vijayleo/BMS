import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../registration/modal/register';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registerUser(user)
  {
    return this.http.post(`http://localhost:8080/register`,user)
  }

  getUser(username)
  {
    return this.http.get<User>(`http://localhost:8080/user/${username}`)
  }

  updateUser(user,username)
  {
    return this.http.put(`http://localhost:8080/user/${username}`,user)
  }

}
