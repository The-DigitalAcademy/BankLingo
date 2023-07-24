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


  // sendOTP(email: string): Observable<any> {
  //   const url = `${this.apiUrls}/api/sendOTP`;
  //   return this.http.post(url, { email });
  // }

  updatePassword(email: string, otp: number, password: string): Observable<any> {
    const url = `${this.apiUrls}/api/user/update-password`;
    return this.http.post(url, { email, otp, password });
  }
  

  sendPasswordResetOTP(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrls}/api/user/sendOTP`, {
      email: email,
    });
  }

  verifyOTP(email: string, otp: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrls}/api/user/verify-otp`, {
      email: email,
      otp: otp,
    });
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrls}/api/user/passwordReset`, {
      email: email,
      password: password,
    });
  }
}

