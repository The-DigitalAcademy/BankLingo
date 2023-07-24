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

// Login

login(credentials: { email: string, password: string }): Observable<any> {
  return this.http.post(`${this.apiUrls}/api/user/signin`, credentials);
}


// Getting user by id

getUser(id: any): Observable<any> {
  return this.http.get(`${this.apiUrls}/api/user/${id}`);
}


// Update a user by the id in the request

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

  
}
