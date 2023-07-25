import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

// Login

login(credentials: { email: string, password: string }): Observable<any> {
  return this.http.post(`${this.apiUrls}/api/user/signin`, credentials).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle the error here or rethrow it to be caught by the component.
      return throwError(error.error.message);
    })
  );
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

  verifyOTP(email: string, otp: string, userOTP : string){
    
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrls}/api/user/passwordReset`, {
      email: email,
      password: password,
    });
  }
updateUser(data: any, _id: string): Observable<any> {
  return this.http.patch(`${this.apiUrls}/update_profile/$user_id`, data)
}

getAllUsers() : Observable<Array<Users>> {
  return this.http.get<Array<Users>>(
    `${this.apiUrls}/get_profile/:user_id  
   `
  )

}

updateData(data: any, _id: string): Observable<any> {
  return this.http.patch(`${this.apiUrls}update_profile/:user_id`, data)
}

