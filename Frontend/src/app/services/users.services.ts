import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../types/users';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:9000/driver';
  private apiUrls = 'http://localhost:9000/users';


  constructor(private http: HttpClient) { }

 


//create user

createUser(users:Users):Observable<any>{

  return this.http.post(this.apiUrls,users);
}



  


  
  

 
}
