import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {
  private apiUrls = 'https://banklingoapi.onrender.com';
 
 
  constructor(private http: HttpClient) {}


 
  
  // Method to change the user's password
  changePassword(newPassword: string) {
    const requestBody = { newPassword: newPassword };
    // Replace 'post' with the appropriate HTTP method (e.g., 'put', 'patch', etc.) for your API
    return this.http.post(this.apiUrls, requestBody);
  }
}

