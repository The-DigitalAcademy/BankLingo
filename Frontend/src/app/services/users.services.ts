import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../types/users';
import { SearchObject } from '../types/searchObject';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrls = 'https://banklingoapi.onrender.com';
  accessToken!: any;
  user!: any;
  //private apiUrls = 'http://localhost:4500';

  constructor(private http: HttpClient) { }

  private isAuthenticated = false;

  private getHeaders(): HttpHeaders {
    this.accessToken = sessionStorage.getItem('loggedUser');
    this.user = JSON.parse(this.accessToken) as 'loggedUser';
    if (!this.user) {
      console.log('There is no user');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }


  

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

  update2Password(email: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrls}/api/user/update-password`;

    // Create a request body with the email and new password
    const body = {
      email: email,
      password: newPassword
    };

    return this.http.put<any>(url, body);
  }


  getUser(users:Users):Observable<any>{

    return this.http.get(`${this.apiUrls}/api/user/get_profile`);
  }

// updateProfile(id: number, data:Users): Observable<any> {
//   return this.http.put<any>(`${this.apiUrls}/api/user/update_profile/{id}${id}`, data);
// }

updateProfile(id: number, data: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.put<any>(`${this.apiUrls}/api/user/update_profile/${id}`, data, {headers});

}

}