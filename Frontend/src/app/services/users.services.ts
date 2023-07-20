import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../types/users';



@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrls = 'http://localhost:4500';

  constructor(private http: HttpClient) { }


//create user

createUser(users:Users):Observable<any>{

  return this.http.post(`${this.apiUrls}/api/user/signup`,users);
}

login(credentials: { email: string, password: string }): Observable<any> {
  return this.http.post(`${this.apiUrls}/api/user/signin`, credentials);
}



  
}
