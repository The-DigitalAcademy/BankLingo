import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {
  private apiUrls1 = 'https://banklingoapi.onrender.com';
  private apiUrls = 'http://localhost:3000';
 
  constructor(private http: HttpClient) {}

  // Method to change the user's password
  changePassword(newPassword: string) {
    const requestBody = { newPassword: newPassword };
    // Replace 'post' with the appropriate HTTP method (e.g., 'put', 'patch', etc.) for your API
    return this.http.post(this.apiUrls1, requestBody);
  }

  sendOtp(email: string) {
    return this.http.post(`${this.apiUrls}/send`, { email: email });
  }

  verifyOtp(email: string, otp: number) {
    return this.http.post(`${this.apiUrls}/verify`, { email, otp });
  }

  resendOtp(email: string) {
    return this.http.post(`${this.apiUrls}/resend`, { email });
  }
}

