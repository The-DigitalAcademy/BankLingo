import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../types/users';




@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrls = 'https://banklingoapi.onrender.com';

  constructor(private http: HttpClient) { }

  private isAuthenticated = false;

  

  // Simulate a login operation
  logins() {
    this.isAuthenticated = true;
    // You might store the authentication token or user information in the session/local storage
  }

  // Simulate a logout operation
  logout() {
    this.isAuthenticated = false;
    // Clear the authentication token or user information from the session/local storage
  }

  // Check if the user is authenticated (you might have a more sophisticated check in real-world scenarios)
 


//create user

createUser(users:Users):Observable<any>{

  return this.http.post(`${this.apiUrls}/api/user/signup`,users);
}

// Login

login(credentials: { email: string, password: string }): Observable<any> {
  return this.http.post(`${this.apiUrls}/api/user/signin`, credentials).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle the error here or rethrow it to be caught by the component.
      return throwError(error.error.message);
    })
  );
}
isLoggedIn(): boolean {
  return this.isAuthenticated;
}
// Getting user by id

getUser(id: any): Observable<any> {
  return this.http.get(`${this.apiUrls}/api/user/${id}`);
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

